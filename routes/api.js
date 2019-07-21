"use strict"
const Api =   use("bin/router/api").apiMethod
/**
** Creating base api
**/


Api.get('assw','HomeController@api').name('apis').exec()
