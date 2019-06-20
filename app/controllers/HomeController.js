"use strict"
/**
** Example controller
**/
const Controller  =  use("app/Controller")
const Paginate = use("/config/pagination").Paginate;
const CrudMaster = use("/config/crud");
const Db =  use("/app/Database");

class HomeController extends Controller {
	constructor() {
		super();
	}
	// index
	async index({req,res,next}) {
		return view("index");
	}	
	//api example
	async api({req,res}) {
		return {"status":"connected"};
	}
}

module.exports = HomeController;