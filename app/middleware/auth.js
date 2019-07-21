'use strict'

/**
 * default constructor of middleware
 */

class auth {


	run({req,res,next}) {

		return next();
	}


}

module.exports = auth;
