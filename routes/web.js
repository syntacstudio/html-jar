const Route =  use("bin/router")


Route.Get("/",HomeController.index,{name:"home"});	
