"use strict"

/**
** Setup configuration and Autoloader
** 
**/ 
const express  =  require("express");
require('events').EventEmitter.defaultMaxListeners = 0;
const env =  require("dotenv").config();
const csrf = require('csurf');
const compression = require('compression')
const path  =  require("path");
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false })
const App  =  express();
const expressWs = require('express-ws')(App);
global.App  =  App;
App.use(cookieParser());
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }))
App.use(compression())
App.use(methodOverride('X-HTTP-Method-Override'))
require('express-router-group');
const Route = express.Router();

// use method overide for accept method put and anymore
App.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}))
 
global.Route =  Route;
global.parseForm = parseForm;
global.csrfProtection =  csrfProtection;
// requiring 
require("../config/skeleton");
// Use engine 
use("config/engine")
//

module.exports  = {
	App , Route
}