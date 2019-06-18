"use strict"
const fs = require("fs");
const chokidar = require('chokidar');
const path =  require("path");
const recursiveReadSync = require('recursive-readdir-sync');
const watchTarget = [base("/resources/views/")];
const fse = require("fs-extra");
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
const compileAll = async ()=>{
	let indexed =  await recursiveReadSync(watchTarget[0]);
	for(var i in indexed) {
		let protect  =  protector(indexed[i].toString());
		if (protect) {
			await doCompile(protect);
		}
	}
}
//  to write file 
const doCompile = async(file)=>{
	file  =  file.replace(".edge","");
	return await write(await view(file),file);
}
// write to file
const write  =  async(content,name)=>{
	name  = base("/public"+name+".html");
	return await fse.outputFile(name , content, (err) => {
 		if (err)  console.log(`[Status : failed to write] [Message : ${err}]`);
 		console.log(`[Write : succcess] [Directory : ${name}]`)
 	})
}
// remove file
const doRemove =  (name)=>{
	name  = base("/public"+name.replace(".edge","")+".html");
	fse.remove(name,(err)=>{
		if (err)  console.log(`[Status : failed to delete] [Message : ${err}]`);
 		console.log(`[Delete : succcess] [Directory : ${name}]`)
	})	
	return;
}
// watcher 
let readyStat = 0
const watcher  = chokidar.watch(watchTarget)
	  .on("ready",()=>{
	  	 console.log(`[Watcher status : ready]`);
	  	 readyStat =  1;
	  })
	  .on("add", async(file)=> {
	  	 if (!file.includes(".edge")) return false;
	  	 let protect  =  protector(file);
	  	 if (readyStat == 0) {
	  	 	return protect ? await doCompile(protect) : false;
	  	 } else {
	  	  	return protect ? await doCompile(protect) : await compileAll();
	  	 }
	  })
	  .on("change", async (file)=>{
	  	 if (!file.includes(".edge")) return false;
	  	 let protect  =  protector(file);
	  	 return protect ? await doCompile(protect) : await compileAll();
	  })
	  .on("unlink", async (file)=>{
	  	 if (!file.includes(".edge")) return false;
	  	 let protect  =  protector(file);
	  	 if (protect) {
	  	 	 return await doRemove(protect);
	  	 }
	  	 return compileAll()
	  })