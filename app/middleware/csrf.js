'use strict'

/**
** Csrf protection middleware
** @param middleware
**/

class csrf {

	//{req,res,next}
	run({req,res,next}) {

	  return parseForm(req,res,next);
	}


}

module.exports = csrf;
