'use strict'

const cookieSet = ({secure, httpOnly, domain, path, maxAge , signed})=>{
	return {
		signed:signed ? signed : process.env.COOKIE_SIGNED == 'true' ? true : false,
		secure:secure ? secure :process.env.COOKIE_SECURE == 'true' ? true : false,
		httpOnly:httpOnly ? httpOnly : process.env.COOKIE_HTTPONLY == 'true' ? true : false,
		domain:domain ? domain : process.env.DOMAIN != 'false'  ? process.env.DOMAIN  : false,
		path:path ? path : process.env.SESSION_PATH != 'false' ? process.env.SESSION_PATH : false,
		maxAge:maxAge ? maxAge : parseInt(process.env.SESSION_MAX_AGE) * 60 * 60 * 1000,
	}
}


module.exports =  { cookieSet };
