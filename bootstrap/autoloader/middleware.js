'use strict'

const middlewares = use('app.kernel');

/**
** Autoloader for middleware
** @param function middlewares
**/


const loadMiddleware = (name)=>{
	let middleware = middlewares.middlewares[name];
	let call = use(middleware);
		call = new call();
	let run = (req,res,next)=>{
		return call.run({req:req,res:res,next:next});
	}
	return run;
}

const globalMiddleware = (req,res,next) => {
	let middleware = middlewares.globalMiddlewares;
	let result =  [];
	for (var i in middleware) {
		if (middleware[i].enable == true) {
			let onLoaded = use(middleware[i].path);
			let call =  new onLoaded();
				call =  call.run({req:req,res:res,next:next});
			result.push({'overide':call,'method':middleware[i].method})
		}
	}
	return result;
}


module.exports =  { loadMiddleware, globalMiddleware };
