import { App } from "../skeleton";
import { Render  } from "../render";


// route stat
module.exports.stat = async(stat,func)=>{
	App.use(async(req,res,next)=>{
		res.status(stat)
		let elres = await  func({req,res,next});
		if(typeof elres == "string") {
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
