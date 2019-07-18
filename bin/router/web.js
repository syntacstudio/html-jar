'use strict'
/**
** Creating expert router
**/
import { App ,  Route  } from '../skeleton';
import { cookieSet } from '../../config/cookie';
import { loadMiddleware , globalMiddleware } from  '../../bootstrap/autoloader/middleware';

const Render  = use('/bin/render').Render;

use('app/kernel');
global['Routes'] =  {};
let _route = {};

function Router() {
	// variabel
	this.route = '';
	this.names;
	this.method;
	this.middlewares = [];
	this.prefixs = '';
	this.groupNames = '';
	this.controller = '';
	this.groupMiddlewares = [];

	//describing method
	// get
	this.get = (route,controller)=>{
		this.controller =  controller;
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
	// grouping
	this.group = (router)=>{
		return router(this);
	}
	// prefix
	this.prefix = (prefix)=>{
		this.prefixs =  prefix;
		return this;
	}
	// group name
	this.groupName = (name) =>{
		this.groupNames =  name;
		return this;
	}
	// group middleware
	this.groupMiddleware = (middleware)=>{
		this.groupMiddlewares =  [];
		if (typeof middleware == 'object') {
			middleware.forEach((item)=> {
				this.groupMiddlewares.push(item)
			});
		} else {
			this.groupMiddlewares.push(middleware);
		}
		return this;
	}
	// execution to route
	this.exec = ()=>{
		let controller = this.controller
		let middleware  =  this.middlewares.concat(this.groupMiddlewares)
		let loadedMiddleware = [];
			middleware.map((item)=>{
				loadedMiddleware.push(loadMiddleware(item))
			})
		Route[this.method](this.prefixs+this.route,loadedMiddleware,globalMiddleware,async(req,res,next)=>{
			let _res = {};
			let _next  = function() {
				///console.log("demo")
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
				// end
			}
			async function _send() {
				return new Promise(async function(resolve,reject) {
					let render =   await Render(req,_res,_next,controller);
					Promise.resolve(res.send(render))
				})
			}
			return await _send();
		})
		//console.log(this);
	}
	return this;
}

const routerMethod  =  new Router();

module.exports =  { routerMethod };



