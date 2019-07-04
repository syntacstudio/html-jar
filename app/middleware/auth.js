'use strict'

/**
 * default constructor middleware
 */
class auth {


	run({req,res,next}) {
		console.log(req.cookies);
		return true;
	}

	
}

module.exports = auth;