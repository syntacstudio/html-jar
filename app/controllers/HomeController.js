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
}

module.exports = HomeController;