"use strict"
const fs = require("fs");
const chokidar = require('chokidar');
const path =  require("path");
const recursiveReadSync = require('recursive-readdir-sync');
const watchTarget = [base("/resources/views")];
const protect  =  require(base("/helpers/protector.json"));
/**
** Application write to storage
**/
// protector
const protector = (file)=>{
	file  = path.normalize(file);
	file  = file.replace(base("/resources/views"),"");
	let stat  =  0;
	for(var i in protect) {
		if (file.includes(protect[i])) {
			stat = 1;
		}
	}
	return stat == 0 ? file  : false; 
}
// compiling all data
const compileAll = ()=>{

}
// watcher
const watcher  = chokidar.watch(watchTarget)
	  .on("ready",()=>{
	  	 console.log("Watcher file allready to action");
	  })
	  .on("add",(file)=> {
	  	 console.log(protector(file))
	  })
	  .on("change",(file)=>{
	  	 console.log(file);
	  })
	  .on("unlink",(file)=>{
	  	console.log(file)
	  })