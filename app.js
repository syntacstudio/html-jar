"use strict"

const env = require('dotenv').config();

/**
** This application is based on express
** @based express
** @author Tofikhidayat
** @type web engine
** @lisence MIT
**/

require = require('esm')(module)
module.exports = require('./bin/www.js')
