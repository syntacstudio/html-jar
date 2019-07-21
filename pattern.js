
function Router(){
	this.route;
	this.middlewares = [];
	this.names;

	// method get
	this.get  = (route)=> {
		this.route =  route;
		
		return this;
	}
	// set name
	this.name  = (name)=> {
		console.log(name)
		return this;
	}
	// get middleware
	this.middleware = ()=>{
		console.log("got")
		return this;
	}
	// override concept
	this.overide  = ()=>{
		console.log(this);
	}

	return this;
}

let route =  new Router();

route.get("demo").middleware("demo").middleware("demo").name("index")
