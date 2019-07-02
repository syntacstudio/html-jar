"use strict"
/**
** Making middleware
** @param middleware  contructor
**/
const middlewares  =  {
	auth:'app.middleware.auth' ,

}






















//Migrate to global
global["middleware"] = {}
for(var i in middlewares ) {
	global["middleware"][i] = use(middlewares[i]);
	global.middleware[i] =  eval(`new ${middleware[i]}()`);
}