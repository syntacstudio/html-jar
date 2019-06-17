"use strict"
const Route =  use("bin/router")
/**
** Creating base route 
**/ 
Route.Get("/",HomeController.index,{name:"home"});	
