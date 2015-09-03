var express = require('express');
var bodyParser = require('body-parser');
var usersRoutes = require('./users/usersRoutes');
var eventsRoutes = require('./events/eventsRoutes');
var usersAndEventsRoutes = require('./usersAndEvents/usersAndEventsRoutes');
var signupLoginRoutes = require('./signupLogin/signupLoginRoutes');
require('./db/db.js');
require('./db/mongodb.js');
require('./db/newdb.js');

module.exports = function(app){
  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({extended: true})); 
  app.use(express.static(__dirname + '/../public'));
  usersRoutes(app);
  eventsRoutes(app);
  usersAndEventsRoutes(app);
  signupLoginRoutes(app);
};