var Users = require('./usersModel');
var jwt = require('jwt-simple');
var db = require('../db/mongodb.js');


var getUser = function(req, res) {
  Users.find().exec(function(err,data){
    if (err) {
      res.send(500, err);
    } else {
      res.send(data);
    }
  })
};

var getEvents = function(req, res) {
  var token = req.headers['x-access-token'];
  var user = jwt.decode(token, 'localHostsSecretHostlocal');
  Users.findOne({username: user.username}, function (err, data) {
    if (err) {
      res.send(500, err)
    } else {
      res.status(200).send(data);
    }
  });
};

var getProfile = function (req, res) {
  var username = req.body.username;
  Users.findOne({username: username}, function (err,data) {
    if (err) {
      res.send(500, err)
    } else {
      res.status(200).send(data);
    }
  });
};

var confirmEvent = function (req, res) {
  var token = req.headers['x-access-token'];
  var user = jwt.decode(token, 'localHostsSecretHostlocal');
  var acceptedUser = req.body.acceptedUser;
  var eventId = req.body.eventId;
  var hostedEventUpdateQuery = "hostedEvents." + eventId + ".usersApplied." + acceptedUser+ ".confirmed";
  var joinedEventUpdateQuery = "joinedEvents." + eventId + ".confirmed";
  var hostedQuery = {};
  var joinedQuery = {};
  hostedQuery[hostedEventUpdateQuery] = true;
  joinedQuery[joinedEventUpdateQuery] = true
  db.instance.collection('users').update({username: user.username}, {$set: hostedQuery}, function(err, data){
    if (err) {
      console.log(err);
    } else {
      db.instance.collection('users').update({username: acceptedUser}, {$set: joinedQuery}, function(err, data){
        res.status(200).send(data);
      });
    }
  })
};

module.exports = {
  getUser: getUser,
  getEvents: getEvents,
  getProfile: getProfile,
  confirmEvent: confirmEvent
};
