"use strict"
/**
** Creating expert router
**/
import { App ,  Route  } from "../skeleton";
import { Render  } from "../render";

use("app/kernel");

/**
** Using websocket
**/
module.exports.socket = async(route,func)=> {
	return Route.ws(route,function(ws,req){
		return func({ws,req});
	});
}