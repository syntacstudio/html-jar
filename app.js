"use strict"

require("dotenv").config();

// start 
require = require("esm")(module)
module.exports = require('./bin/www.js') 

