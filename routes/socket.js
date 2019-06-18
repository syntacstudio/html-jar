"use strict"
const Route =  use("bin/router")
/**
** Creating base socket route 
**/ 

/* Example
Route.Socket("/example/dumy", ({res,ws})=> {
	ws.on("message",(msg)=> {
		console.log("Socket says : "+msg)
		ws.send("hello")
	})
})
*/
