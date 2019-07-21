'use strict'
/**
** Creating expert router
**/
import { App ,  Route  } from '../skeleton';
import { cookieSet } from '../../config/cookie';
import { loadMiddleware , globalMiddleware } from  '../../bootstrap/autoloader/middleware';

const Render = use('/bin/render').Render;

use('app/kernel');
global['Routes'] =  {};

//conf
let groupNames = '';
let groupControllers = '';
let groupMiddlewares = [];
let prefixs = ''

let controllers;

/**
** Execute router parameter
**/

const execute = (route,method,name,middleware,controller)=> {
	controller =  controllers;
	global['Routes'][name] = route;
	let loadedMiddleware = [];
		middleware.map((item)=>{
			loadedMiddleware.push(loadMiddleware(item))
		})
	let gbm = new globalMiddleware(false);

	//,parseForm
	Route[method](route,loadedMiddleware,csrfProtection,gbm.exec,async(req,res,next)=>{
		let _res = {};
		let _next  = function() {
			return next();
		}
		for(var item in res) {
			let iname  = item;
			// additional middleware
			if (item == 'cookie') {
				_res[item] =  function(param1=false,param2=false,param3=false,param4=false,param5=false) {
				return res.cookie(param1,param2,cookieSet(param3),param4,param5);
				}
			} else {
				_res[item] =  function(param1=false,param2=false,param3=false,param4=false,param5=false) {
					return res[iname](param1,param2,param3,param4,param5);
				}
			}
		}
		async function _send() {
			return new Promise(async function(resolve,reject) {
				let newControl = typeof controller == 'function' ? controller : groupControllers + controller;
				let render =   await Render(req,_res,_next,newControl);
				Promise.resolve(res.send(render))
			})
		}
		return await _send();
	})

}

/**
** This handle base route
**/

function Router(prefix='', groupName='', groupMiddleware=[], groupController='') {
	// variabel
	this.route = '';
	this.names;
	this.method;
	this.middlewares = [];
	this.controller;

	//describing method
	// get
	this.get = (route,controller)=>{
		this.controller =  controller;
		controllers = controller;
		this.middlewares = [];
		this.names = '';
		this.method =  'get';
		this.route = route;
		//this.execute();
		return this;
	}
	// all
	this.all = (route,controller)=>{
		this.controller =  controller;
		controllers = controller;
		this.middlewares = [];
		this.names = '';
		this.method =  'all';
		this.route = route;
		//this.execute();
		return this;
	}
	/// post
	this.post = (route,controller)=>{
		this.controller =  controller;
		controllers = controller;
		this.middlewares = [];
		this.names = '';
		this.method =  'post';
		this.route = route;
		///this.execute();
		return this;
	}
	// put
	this.put = (route,controller)=>{
		this.controller =  controller;
		controllers = controller;
		this.middlewares = [];
		this.names = '';
		this.method =  'put';
		this.route = route;
		//this.execute();
		return this;
	}
	// delete
	this.delete = (route,controller)=>{
		this.controller =  controller;
		controllers = controller;
		this.middlewares = [];
		this.names = '';
		this.method =  'delete';
		this.route = route;
		//this.execute();
		return this;
	}
	// end
	//naming
	this.name = (name)=>{
		this.names = name;
		//this.execute();
		return this;
	}
	//middleware
	this.middleware = (middleware) =>{
		if (typeof middleware == 'object') {
			middleware.forEach((item)=> {
				this.middlewares.push(item)
			});
		} else {
			this.middlewares.push(middleware);
		}
		//this.execute();
		return this;
	}

	// execution to route
	this.exec = ()=>{

		try {
			execute(prefix+this.route,
					this.method,
					groupName+this.names,
					this.middlewares.concat(groupMiddleware),
					groupController+this.controller);
		} catch(e) {
			throw e;
		}
	}
	// reset all param
	this.route = '';
	this.names;
	this.method;
	this.middlewares = [];
	this.controller = '';

	return this;
}

/**
** This grouping
**/
// group prefix
const prefix = Router.prototype.prefix = (prefix)=>{

	this.group =  group;
	this.groupName =  groupName;
	this.groupMiddleware =  groupMiddleware;
	this.groupController =  groupController;

	prefixs = prefix;

	return this;
}
// group name
const groupName = Router.prototype.groupName = (name)=>{

	this.group =  group;
	this.prefix =  prefix;
	this.groupMiddleware =  groupMiddleware;
	this.groupController =  groupController;

	groupNames = name;

	return this;
}

const groupMiddleware = Router.prototype.groupMiddleware = (middleware)=> {

	this.group =  group;
	this.prefix =  prefix;
	this.groupName =  groupName;
	this.groupController =  groupController;

	if (typeof middleware == 'object') {
		middleware.forEach((item)=> {
			groupMiddlewares.push(item)
		});
	} else {
		groupMiddlewares.push(middleware);
	}

	return this;
}

const groupController = Router.prototype.groupController = (controller)=> {

	this.group =  group;
	this.prefix =  prefix;
	this.groupMiddleware =  groupMiddleware;
	this.groupName =  groupName;

	groupControllers = controller;

	return this;
}


const group =  Router.prototype.group = (router)=>{

    const routerBase  =  new Router(prefixs, groupNames, groupMiddlewares, groupControllers);

    groupNames = '';
	groupControllers = '';
	groupMiddlewares = [];
	prefixs = ''

    return router(routerBase);
}



const routerMethod  =  new Router();


module.exports =  { routerMethod };
