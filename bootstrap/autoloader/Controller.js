'use strict';

/**
** This file for load all controllers file and send to global data
** @param String ,  object
** @func eval , recursive
** @target root/app/controller
**
**/

const loadController =  async (controller,{req,res,next})=>{
	let index = controller.split("@")
	let col   = controller[0] == "/" ? 1 : 0;
	let file  = use(`/app/controllers/${index[col+0]}`);
		file  = new file();
	let result  = await file[index[col+1]]({req:req,res:res,next:next});
	return result;
}


module.exports =  { loadController };
