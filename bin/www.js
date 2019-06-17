"use strict"
const express  =  require("express");
const fs = require('fs')
const serverless = require('serverless-http');
const moment = require('moment');
const https = require('https')
import { App , Route } from "./skeleton";
/**
** This basic data 
** @note please dont modify :)
**/
//Load  Controllers
use("bootstrap/autoloader/Controller");

// requiring  autoload file
Route.get("/socket/autoload.js",async (req,res)=> {
	let file  =  await fs.readFileSync(base("/components/socket.js"));
	return res.send(file);
})



// create logging 
if (process.env.LOGGING == "true") {
	App.use("/",function(req,res,next) {
		console.log(`[${moment().format("dddd MMMM HH:mm:ss  YYYY")}] ${(process.env.ssl=="true"?"Https://":"Http://")+process.env.HOST+":"+process.env.PORT} [${res.statusCode}] : ${req.url}` )
		return next();
	})
}

App.use((err,req,res,next)=>{
	if (req.xhr) {
		return res.send({"status":"error","error":{"status":err.status,"name":err.name,"stack":err.stack}})
	}
	return res.send(view("components/errors.edge",{err:err}));
})

// use router 
if (process.env.WEBSOCKET == "true") use("routes.socket.js");
use("routes.api.js");
use("routes.web.js");
//Use public dir
App.use(express.static(base("public")));
// use router
if (process.env.WEB_SERVER == "false") {
	App.use(Route);
}
// 404
App.use(async function(req, res, next) {
  res.status(404).send(await view("404"));
})
// bad csurf
App.use(async (err, req, res, next)=> {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    let error  = {};
		error["status"] = "403";
		error["name"] =  "Session expired";
		error["stack"] =  `Session has expired or tampered with`;
    res.status(403).send(await view("components/errors",{err:error}) );
});

App.use((err,req,res)=>{
	return res.send(err);
})

// websocket for autoload 
if (process.env.WEBSOCKET == "true") {
	Route.ws("/skeleton/autoload",(ws,req)=>{
		let is_dc = 0;
		ws.on('close',function(msg) {
			is_dc = 1;
			console.log("Client diconnected from websocket autoload"); 
		})
		ws.on("connect",function(msg) {
			console.log("connected")
		})
		 ws.on("message",(msg)=>{
		 	console.log(msg)
		    setInterval(()=>{
		    	if (is_dc == 0 ) {
		 			try {
		 				ws.send("hello world")
		 			} catch(e) {

		 			}
		 		}
		 	},100)
		 })
	})
}


// start server
if (process.env.WEB_SERVER == "netlify") {
	App.use('/.netlify/functions/server',Route);
	module.exports = App;
	module.exports.handler = serverless(App);
} else {
	if (process.env.SSL == "true") {
			https.createServer({
				key :fs.readFileSync(base("/ssl/server.key"),"utf8"),
				cert : fs.readFileSync(base("/ssl/server.cert","utf8"))
			},App).listen(process.env.PORT, process.env.HOST,function() {
				console.log(`Application listen on Https://${process.env.HOST}:${process.env.PORT}`)
			})
		} else {
			App.listen(process.env.PORT, process.env.HOST , function() {
				console.log(`Application listen on Http://${process.env.HOST}:${process.env.PORT}`)
			})
	}
}
