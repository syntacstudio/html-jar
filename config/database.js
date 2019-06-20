"use strict"

const mysql =  require("mysql");

/**
** This default connection socket to mysql database
**/

if (process.env.DB_USE != "true") {
	module.exports.query = async(query)=>{
		return `Cant execute  "${query}" \nPlease enable database in enviroment`;
	}
	return false;	
}
// configuration
const connection = mysql.createConnection({
	host : process.env.DB_HOST ,
	port : process.env.DB_PORT ,
	database : process.env.DB_NAME ,
	user : process.env.DB_USERNAME ,
	password : process.env.DB_PASSWORD ,
});

// try to connect

if(connection.state == "disconnected") {
	connection.connect((e)=>{
		if (e) throw e;
		console.log(`[Database : MYSQL] [Status : Connected] [Database Name: ${process.env.DB_NAME}]`)
	})
}	

// query function
const query  = (query)=> {
	return new Promise((resolve,reject)=>{
		connection.query(query,(err,res,field)=>{
			let stat;
			if (err) stat = "err";
			return resolve(stat != "err" ? JSON.parse(JSON.stringify(res)) : {"status":"error","message":err});
		})
	})

}

// exports 
module.exports = {
	query
}