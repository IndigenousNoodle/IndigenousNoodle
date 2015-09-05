var Users = require('./usersModel');
var jwt = require('jwt-simple');
var db = require('../db/mongodb.js');
var newdb = require('../db/newdb.js');

var getUser = function(req, res) {
  Users.find().exec(function(err,data){
    if (err) {
      res.send(500, err);
    } else {
      res.send(data);
    }
  })
};

//hardcoded userId  change line 22 and 39 to user ID
var getEvents = function(req, res) {
  var token = req.headers['x-access-token'];
  var user = jwt.decode(token, 'localHostsSecretHostlocal');
  var data = {hostedEvents:[], joinedEvents:[]};
  var getJoinedEvents = function () {
    newdb.JoinersEvents.findAll({where: {userId: 1}, raw:true}).then(function(joinedEvents){
      joinedEvents.forEach(function(joinedEvent, joinedEventidx){
        newdb.Events.findOne({where: {id: joinedEvent.eventId}, raw:true}).then(function(event){
          event.confirmed = joinedEvent.confirmed
          newdb.Users.findOne({where:{id:event.hostId}, raw: true }).then(function(user){
            event.host = user.username;
            data.joinedEvents.push(event);
            if (joinedEventidx === joinedEvents.length - 1) {
              res.status(200);
              res.json(data);
            }
          })
        })
      })
    })
  };
  
  newdb.Events.findAll({where:{hostId:1}, raw:true}).then(function(events){
    events.forEach(function(event, eventidx){
      data.hostedEvents.push(event);
    })
  }).then(function(){
    data.hostedEvents.forEach(function(event, idx){
      event.usersJoined = []
      newdb.JoinersEvents.findAll({where: {eventId:event.id}, raw:true}).then(function(joinedUser){
        joinedUser.forEach(function(user, useridx){
          newdb.Users.findOne({where: {id: user.userId}, raw:true}). then(function(joinedUsername){
            user.username = joinedUsername.username;
            event.usersJoined.push(user);
            if (idx === data.hostedEvents.length - 1) {
              getJoinedEvents();
           }
          })
        })
      })
    })
  }).catch(function(err){
    res.status(500).send(err);
  })
};

var getProfile = function (req, res) {
  var username = req.body.username;
  newdb.Users.findOne({where: {username: username}, raw:true}).then(function(user){
    res.status(200);
    res.json(user)
  }).catch(function(err){
    res.status(500).send(err)
  })
};

var confirmEvent = function (req, res) {
  var token = req.headers['x-access-token'];
  var user = jwt.decode(token, 'localHostsSecretHostlocal');
  var acceptedUser = req.body.acceptedUser;
  var eventId = req.body.eventId;
  newdb.JoinersEvents.update({confirmed:true}, {where: {userId:acceptedUser, eventId: eventId}}).then(function(result){
    console.log(result);
  }).catch(function(err){
    res.status(500).send("error:", err);
  });
};

module.exports = {
  getUser: getUser,
  getEvents: getEvents,
  getProfile: getProfile,
  confirmEvent: confirmEvent
};
