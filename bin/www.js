"use strict"
const express  =  require("express");
const fs = require('fs')
const serverless = require('serverless-http');
const moment = require('moment');
const session = require('cookie-session')
const Keygrip = require('keygrip'); 
const https = require('https')
import { App , Route } from "./skeleton";
const chokidar = require('chokidar');
const watchTarget = [base("/resources") , base("/public")];

//Use the writer to html
if (process.env.COMPILE == "true") use("/bin/writter");
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

App.use(session({
	name:'session',
	keys: new Keygrip(JSON.parse(process.env.SESSION_KEY), 'SHA384', 'base64'),
	cookie: {
		secure:true ,
		httpOnly:true ,
		domain:process.env.DOMAIN ,
		path:process.env.SESSION_PATH ,
		expires:parseInt(process.env.SESSION_MAX_AGE) * 60 * 60 * 1000
	}
}))
	
// create logging 
if (process.env.LOGGING == "true") {
	App.use((req,res,next)=> {
		console.log(`[${process.pid}] [${moment().format("ddd MMM HH:mm:ss YYY")}] ${(process.env.SSL=="true"?"Https://":"Http://")+process.env.HOST+":"+process.env.PORT} [${res.statusCode}] : ${req.url}` )
		return next();
	})
}
//enable cors mode
App.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.header('Access-Control-Allow-Credentials', true);
   res.removeHeader("X-Powered-By");
   next();
});

// view if error hr
App.use((err,req,res,next)=>{
	if (req.xhr) {
		return res.send({"status":"error","error":{"status":err.status,"name":err.name,"stack":err.stack}})
	}
	return res.send(view("components/errors.edge",{err:err}));
})

// use router 
if (process.env.WEBSOCKET == "true") use("routes.socket.js");
use("routes.api.js");
if(process.env.ROUTER != "static") use("routes.web.js");
// use router
if (process.env.WEB_SERVER == "false") {
	App.use(Route);
}
//Use public dir
App.use(express.static(base("public")));
// use route configuration stat
use("routes.stat.js");

// websocket for autoload 
if (process.env.WEBSOCKET == "true" && process.env.AUTOLOAD == "true") {
	Route.ws("/skeleton/autoload",(ws,req)=>{
		let is_dc = 0;
		ws.on('close',function(msg) {
			console.log(`[Status : disconnect] [Message : Client diconnected from autoload socket] `); 
		})
		ws.on("message",(msg)=>{
			let readyStat = 0;
			const tryReloadStat = (file)=> {
				if (readyStat == 1) {
					console.log(`[Status : waiting to reload] [Message : Trying send reload request to client]`)
				}
				try {
					if (file.includes("sass") || file.includes("SASS") || file.includes("css") || file.includes("CSS")) {
		            	if (readyStat == 1 ) return  ws.send("reloadCss");
		        	} else {
		             	if (readyStat == 1) return ws.send("reloadFull");
		            }
				} catch(e){}
			}
			const watcher =  chokidar.watch(watchTarget)
				.on("ready",()=>{	 
					setTimeout(() => {
						readyStat = 1
						try {
			     		ws.send("Watcher allready")
			     	} catch(e){}
					}, 100);
				 })
				.on("add",tryReloadStat)
				.on("change",tryReloadStat)
				.on("unlink",tryReloadStat)
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
			const credential  = {
				key:fs.readFileSync(base("/ssl/certificate.key"),"utf8"),
				cert:fs.readFileSync(base("/ssl/certificate.cert"),"utf8"),
				requestCert: false,
    			rejectUnauthorized: false
			}
			https.createServer(credential,App).listen(process.env.PORT, process.env.HOST,function() {
				console.log(`Application listen on Https://${process.env.HOST}:${process.env.PORT}`)
			})
		} else {
			App.listen(process.env.PORT, process.env.HOST , function() {
				console.log(`Application listen on Http://${process.env.HOST}:${process.env.PORT}`)
			})
	}
}
