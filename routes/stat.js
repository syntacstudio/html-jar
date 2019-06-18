"use strict"
const Route =  use("bin/router/stat")
/**
** Handling error router 
** @exanple 404 , 403 
**/ 

//notfound exception
Route.stat(404, async({req,res,next})=>{
	return await view("404")
})

// errbadtoken exception
Route.err(async({err,req,res,next})=>{
	if (err.code !== 'EBADCSRFTOKEN') return next(err);
    let error  = {};
		error["status"] = "403";
		error["name"] =  "Session expired";
		error["stack"] =  `Session has expired or tampered with`;
    return res.status(403).send(await view("components/errors",{err:error}) );
})
