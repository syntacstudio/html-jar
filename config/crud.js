'use strict'

const fs  = require('fs');

/**
** Creating crud master engine
** @param json , value , loader
**/

class JsonCrud  {
	// constructor
	constructor(fileName) {
		this.fileName  =  fileName;
	}
	// configuration
	config() {
		let nameFile  =  this.fileName;
		fs.stat(base('/data/'+nameFile+'.json'),function(err,stat) {
			if (err &&  err.code === 'ENOENT') {
				console.log('Data file not found \nCreating new data');
				fs.writeFile(base('/data/'+nameFile+'.json'),'[]',function(err){
					if (err) throw err;
					console.log('Base new data created successfull');
				});
			} else {
				console.log(`File ${nameFile}.json already exists`);
			}
		})
	}
	// read All
	async read() {
		let nameFile  =  this.fileName;
		try {
			return await fs.readFileSync(base(`/data/${nameFile}.json`)).toString('utf8')
		} catch (e) {
			throw e;
		}
	}
	// get all
	async all() {
		return JSON.parse(await this.read());
	}
	// write 
	async write(data) {
		await fs.writeFile(base('/data/'+this.fileName+'.json'),data,function(err){
				  if (err) throw err;
				  console.log('Base new data created successfull');
		});
		return true;
	}
	// store
	async store(newData) {
		let NewObj =  await this.read();
		let tmpObj  = JSON.parse(NewObj);

		let handleId = function(data) {
			let hellObj  =  {};
			hellObj['id'] = tmpObj.length == 0 ? 0 : tmpObj[tmpObj.length - 1].id + 1;
			for(var item in data) {
				hellObj[item] =  data[item];
			}
			tmpObj.push(hellObj);
		}
		if (Array.isArray(newData)) {
			for (var i = 0; i < newData.length; i++) {
			 	handleId(newData[i])
			}
		} else {
			handleId(newData)
		}
		await this.write(JSON.stringify(tmpObj)) 

	}
	async update(where,search,param) {
		let base =  await JSON.parse(await this.read());
		let next = [];
		base.forEach(function(item) {
			if (item[where] == search ) {
				let tmpl = item;
				for(var litem in param) {
					item[litem] = param[litem];
				}
				next.push(tmpl);
			} else {
				next.push(item)
			}
		})
	 await this.write(JSON.stringify(next));
	 return true;
	}
	/// delete
	async delete(param,where) {
		let base =  await JSON.parse(await this.read());
		let next = [];
		base.forEach(function(item) {
			if (item[param] != where ) {
				next.push(item)
			}
		})
		await this.write(JSON.stringify(next));
		return true;
	} 

}
// protityping array

// where 
Array.prototype.where =  function(param,where) {
		let _obj  =  [];
		this.forEach((item)=>{
			if (item[param].toString().toLowerCase() == where.toString().toLowerCase()) {
				_obj.push(item)
			}
		})
		return _obj;
}
// whereLike
Array.prototype.whereLike =  function(param,where) {
	console.log(where)
		let _obj  =  [];
		this.forEach((item)=>{
			if (item[param].toString().toLowerCase().includes(where.toString().toLowerCase())) {
				_obj.push(item)
			}
		})
		return _obj;
}
// where min
Array.prototype.whereMin = function(param,where) {
	let _obj  =  [];
	this.forEach((item)=>{
		if (parseInt(item[param]) >= parseInt(where)) {
			_obj.push(item)
		}
	})
	return _obj;
}
// where min
Array.prototype.whereMax = function(param,where) {
	let _obj  =  [];
	this.forEach((item)=>{
		if (parseInt(item[param]) <= parseInt(where)) {
			_obj.push(item)
		}
	})
	return _obj;
}



module.exports =  JsonCrud;