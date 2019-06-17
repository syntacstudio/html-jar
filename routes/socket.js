"use strict"
const Route =  use("bin/router")
/**
** Creating base socket route 
**/ 

/* Example
Route.Socket("/example/dumy",function({res,ws}) {
	ws.on("message",(msg)=> {
		console.log("Socket say : "+msg)
		ws.send("hello")
	})
})
*/
