'use strict'

const middlewares = use('app.kernel');

/**
** Autoloader for middleware
** @param function middlewares
**/

/**
** Static middleware
**/

function loadMiddleware(name){
	let middleware = middlewares.middlewares[name];
	let call = use(middleware);
		call = new call();
	let run = (req,res,next)=>{
		return call.run({req:req,res:res,next:next});
	}
	return run;
}

/**
** GLobal middleware
**/

function globalMiddleware(isApi){
	let middleware = middlewares.globalMiddlewares;
	this.exec = (req,res,next)=>{
		let result =  [];
		for (var i in middleware) {
			if (middleware[i].enable == true && middleware[i].method.indexOf(req.method) >= 0 && (isApi == middleware[i].api)) {
				let onLoaded = use(middleware[i].path);
				let call =  new onLoaded();
					call =  call.run({req:req,res:res,next:next});
				result.push({'overide':call,'method':middleware[i].method})
			} else {
				return next();
			}
		}
		return JSON.stringify(middleware) == '{}' ? next() : result;
	}
	return this;
}


module.exports =  { loadMiddleware, globalMiddleware };
