"use strict"
const Route =  use("bin/router/web").routerMethod
/**
** Creating base route
**/

Route.get('/','HomeController@index').name("test").middleware(['auth']).exec()

/*
Route.prefix('/home').groupMiddleware(['auth']).groupName("home.").group((Route)=>{

	Route.get('/','HomeController@api')
	Route.get('/hello','HomeController@index').name("test").middleware(['examination'])
})




*/
