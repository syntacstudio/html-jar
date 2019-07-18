'use strict';
/**
** This for call status on http module
** @param string, status, module
**/

import { App } from '../skeleton';
// import rendering
const Render  = use('/bin/render').Render;

// route stat
module.exports.stat = async(stat,func)=>{
	App.use(async(req,res,next)=>{
		res.status(stat)
		let elres = await  func({req,res,next});
		if(typeof elres == 'string') {
			return res.send(elres);
		}

	})
}

//route err
module.exports.err  = async(func) =>{
	App.use(async (err, req, res, next)=> {
		return await func({err,req,res,next});
	});
}
