"use strict"
/**
** Example controller
**/
const Controller  =  use("app/Controller")
const Paginate = use("/config/pagination").Paginate;
const CrudMaster = use("/config/crud");

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
	/* dont use this */
	async register({req,res}) {
		return "demo";
	}
}

module.exports = HomeController;