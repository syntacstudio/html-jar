"use strict"
const Route =  use("bin/router/web")
/**
** Creating base route 
**/ 
Route.get("/",HomeController.index,{name:"home"});

Route.get("/demo/:id/:key",HomeController.index,{name:"test"});
