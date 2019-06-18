const path = require('path')
const edge = require('edge.js')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const parseForm = bodyParser.urlencoded({ extended: false })
const fs  = require("fs");
const view_dir = base('resources/views/');
const rules =  require(base("/helpers/rules.json"));
const formatter = require("html-formatter")
App.use(bodyParser.urlencoded({
  extended: true
}))
App.use(bodyParser.json());
App.use(cookieParser());
	

// register directory
edge.registerViews(view_dir);
global.edge =  edge;

// Requiring engine helpers
use("/helpers/rules");

// Configuration socket
const makeSocket =  (string)=>{
	if (!process.env.AUTOLOAD == "true") return string;
	let scoket_e  =  `<script type="text/javascript" src="/socket/autoload.js" defer ></script>\n</html>`;
	return string.replace("</html>",scoket_e);
}


// before compile
const beforeCompile  =  async function(string,path) {
	for(i in rules) {
		if (rules[i]["compile"] == "before" || rules[i]["compile"] == "all") {
			if (rules[i]["mode"] ==  process.env.APP_MODE || rules[i]["mode"] == "all") {
				if ( rules[i]["subdir"] == "all" || !path.includes(rules[i]["subdir"])) {
					string =  string.split(rules[i]["find"]).join(rules[i]["replace"])
				}
			}
		} 
	}
	return string;
} 
// after compile
const afterCompile = async  function(string,path) {
	for(i in rules) {
		if (rules[i]["compile"] == "after" || rules[i]["compile"] == "all") {
			if (rules[i]["mode"] ==  process.env.APP_MODE || rules[i]["mode"] == "all") {
				if ( rules[i]["subdir"] == "all" || !path.includes(rules[i]["subdir"])) {
					string =  string.split(rules[i]["find"]).join(rules[i]["replace"])
				}
			}
		} 
	}
	return string;
}


// get file data
const getFile = async (file) => {
	let dataFile  = "";
	try {
		 dataFile =  await fs.readFileSync(base("resources/views/"+file+".edge")).toString("utf8");
		} catch(e) {
			let err  = {};
				err["status"] = "file not found";
				err["name"] =  e.code;
				err["stack"] =  `Cant render this file : ${e.path}`;
		 dataFile  = edge.render("components/errors",{err:err});
		}
	return await beforeCompile(dataFile,file)
}
global.view  =  async (path,param = "",is_write=false)=> {
	let file;
	try {
		file  =  await edge.renderString(await getFile(path),param);
	} catch (e) {
		let err  = {};
			err["status"] = "Can't compile";
			err["name"] =  "Err compile";
			err["stack"] =  `${e} On ${base("resources/views/"+path)}.edge`;
			file =  edge.render("components/errors",{err:err});
	}
	file =  makeSocket(await file);
	if (process.env.PRETIFY_HTML == "true") file = formatter.render(file);
	return file;
}


