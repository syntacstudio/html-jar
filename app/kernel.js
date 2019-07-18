'use strict'
/**
** Sprecifict middleware
** @param middleware  contructor
**/
const middlewares  =  {
	auth:'app.middleware.auth' ,

}


/**
** Global middleware
** @param middleware , contructor
**/

const globalMiddlewares = {
	csrf : {
		enable: true,
		path: 'app.middleware.csrf',
		method: ['POST', 'PUT', 'DELETE']
	}
}










module.exports = { middlewares , globalMiddlewares }
