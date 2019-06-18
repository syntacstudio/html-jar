"use strict"
const Route =   use("bin/router/socket")
/**
** Creating base socket route 
**/ 

/* Example
Route.socket("/example/dumy", ({res,ws})=> {
	ws.on("message",(msg)=> {
		console.log("Socket says : "+msg)
		ws.send("hello")
	})
})
*/
