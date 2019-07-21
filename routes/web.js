"use strict"
const Route =  use("bin/router/web").routerMethod
/**
** Creating base route
**/

Route.prefix('/home').groupController('HomeController@').groupName("home.").group((Route)=>{

	Route.get('/hello','index').name("holla").middleware(['auth']).exec();
})

Route.get('/','HomeController@index').name("test").exec()
