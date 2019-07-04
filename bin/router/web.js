'use strict'
/**
** Creating expert router
**/
import { App ,  Route  } from '../skeleton';
import { Render  } from '../render';

use('app/kernel');
global['Routes'] =  {};
let _route = {};
/**
** registering components
**/

/**
** Global creator
**/

// Method get 
module.exports.get = async(route,controller,param=null)=> {
	// creatign global name
	try {
		global['Routes'][param['name']] =  route;
	} catch(e) {}
	Route.get(route,csrfProtection, async function(req,res,next){
		let _res = {};
		let _next  = function() {
			return next();
		}
		for(var item in res) {
			let iname  = item;
			_res[item] =  function(prop) {
				return res[iname](prop);
			} 
		}
		_res.cookie('sauth','helloworld',{});
		async function _send() {
			return new Promise(async function(resolve,reject) {
				let render =   await Render(req,_res,_next,controller);
				Promise.resolve(res.send(render))
			})
		}
		if (param) {
			if (param['middleware']) {
				try {
					if (typeof param.middleware == 'object' ) {
						for (var i = 0; i <  param.middleware.length; i++) {
							return middleware[param.middleware[i]].run({req:req,res:_res,next:_next}) === true ? _send() : false;		
						}
					}
					else {
						return middleware[param.middleware].run({req:req,res:_res,next:_next}) === true ? _send() : false;
					}
				} catch (e) {
					throw e;
				}
			}
		}
		return await _send();
	})
}


// all
module.exports.all = async(route,controller,param=null)=> {
	// creatign global name
	try {
		global['Routes'][param['name']] =  route;
	} catch(e) {}
	Route.all(route,csrfProtection, async function(req,res,next){
		let _res = {};
		let _next  = function() {
			return next();
		}
		for(var item in res) {
			let iname  = item;
			_res[item] =  function(prop) {
				return res[iname](prop);
			} 
		}
		async function _send() {
			return new Promise(async function(resolve,reject) {
				let render =   await Render(req,_res,_next,controller);
				Promise.resolve(res.send(render))
			})
		}
		if (param) {
			if (param['middleware']) {
				try {
					if (typeof param.middleware == 'object' ) {
						for (var i = 0; i <  param.middleware.length; i++) {
							return middleware[param.middleware[i]].run({req:req,res:_res,next:_next}) === true ? _send() : false;		
						}
					}
					else {
						return middleware[param.middleware].run({req:req,res:_res,next:_next}) === true ? _send() : false;
					}
				} catch (e) {
					throw e;
				}
			}
		}
		return await _send();
	})
}
// Method post
module.exports.post =  async(route,controller,param=null)=> {
	// creatign global name
	try {
		global['Routes'][param['name']] =  route;
	} catch(e) {}
	Route.post(route, parseForm, csrfProtection,async function(req,res,next){
		let _res = {};
		let _next  = function() {
			return next();
		}
		for(var item in res) {
			let iname  = item;
			_res[item] =  function(prop) {
				return res[iname](prop);
			} 
		}
		async function _send() {
			return new Promise(async function(resolve,reject) {
				let render =   await Render(req,_res,_next,controller);
				Promise.resolve(res.send(render))
			})
		}
		if (param) {
			if (param['middleware']) {
				try {
					if (typeof param.middleware == 'object' ) {
						for (var i = 0; i <  param.middleware.length; i++) {
							return middleware[param.middleware[i]].run({req:req,res:_res,next:_next}) === true ? _send() : false;		
						}
					}
					else {
						return middleware[param.middleware].run({req:req,res:_res,next:_next}) === true ? _send() : false;
					}
				} catch (e) {
					throw e;
				}
			}
		}
		return await _send();
	})
}
// Method put
module.exports.put = async(route,controller,param=null)=> {
	// creatign global name
	try {
		global['Routes'][param['name']] =  route;
	} catch(e) {}
	Route.put(route, parseForm, csrfProtection,async function(req,res,next){
		let _res = {};
		let _next  = function() {
			return next();
		}
		for(var item in res) {
			let iname  = item;
			_res[item] =  function(prop) {
				return res[iname](prop);
			} 
		}
		async function _send() {
			return new Promise(async function(resolve,reject) {
				let render =   await Render(req,_res,_next,controller);
				Promise.resolve(res.send(render))
			})
		}
		if (param) {
			if (param['middleware']) {
				try {
					if (typeof param.middleware == 'object' ) {
						for (var i = 0; i <  param.middleware.length; i++) {
							return middleware[param.middleware[i]].run({req:req,res:_res,next:_next}) === true ? _send() : false;		
						}
					}
					else {
						return middleware[param.middleware].run({req:req,res:_res,next:_next}) === true ? _send() : false;
					}
				} catch (e) {
					throw e;
				}
			}
		}
		return await _send();
	})
}


// Method delete
module.exports.delete =  async(route,controller,param=null)=> {
	// creatign global name
	try {
		global['Routes'][param['name']] =  route;
	} catch(e) {}
	Route.delete(route, parseForm, csrfProtection,async function(req,res,next){
		let _res = {};
		let _next  = function() {
			return next();
		}
		for(var item in res) {
			let iname  = item;
			_res[item] =  function(prop) {
				return res[iname](prop);
			} 
		}
		async function _send() {
			return new Promise(async function(resolve,reject) {
				let render =   await Render(req,_res,_next,controller);
				Promise.resolve(res.send(render))
			})
		}
		if (param) {
			if (param['middleware']) {
				try {
					if (typeof param.middleware == 'object' ) {
						for (var i = 0; i <  param.middleware.length; i++) {
							return middleware[param.middleware[i]].run({req:req,res:_res,next:_next}) === true ? _send() : false;		
						}
					}
					else {
						return middleware[param.middleware].run({req:req,res:_res,next:_next}) === true ? _send() : false;
					}
				} catch (e) {
					throw e;
				}
			}
		}
		return await _send();
	})
}
