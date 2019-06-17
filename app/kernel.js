/**
** Making middleware
** @param middleware  contructor
**/
const middlewares  =  {
	//example : Auth:'app.middleware.auth' 
}

























//Migrate to global
global["middleware"] = {}
for(var i in middlewares ) {
	eval(` var ${i} =  ${use(middlewares[i])}`);
	global.middleware[i] =  eval(`new ${i}()`);
}