'use strict'

/**
** Csrf protection middleware
** @param middleware
**/

class csrf {

	//{req,res,next}
	run({req,res,next}) {

	  return csrfProtection(req,res,next);
	}


}

module.exports = csrf;
