'use strict';

import { loadController } from  '../bootstrap/autoloader/controller';

/**
** This for action to render
**/
/*
( async  ()=>{
	console.log(await 	loadController("Demo/demoController@api",{req:"demo",res:"demo",next:"demo"}))
})()
*/

const Render = async (req,res,next,controller)=> {
	process.env.csrfToken = req.csrfToken();
	try {
		if (typeof controller == 'string') {
			return await loadController(controller,{req:req,res:res,next:next})
		} else {
			return await controller({req:req,res:res,next:next})
		}
		return true;
	} catch(e) {
		let err = new Error(e);
			err.stack = e.stack;
			err.name  =  e.message
			err.status = err.status ? err.status : 'Not defined'
		return view('components/errors',{err:err})
	}
}

module.exports = { Render };
