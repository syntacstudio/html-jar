'use strict'
/**
** Creating expert router
**/
import { App ,  Route  } from '../skeleton';

// import rendering
const Render  = use('/bin/render').Render;

use('app/kernel');

/**
** Using websocket
**/
module.exports.socket = async(route,func)=> {
	return Route.ws(route,function(ws,req){
		return func({ws,req});
	});
}
