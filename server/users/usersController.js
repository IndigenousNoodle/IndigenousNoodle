var jwt = require('jwt-simple');
var db = require('../db/db.js');

var getUser = function(req, res) {
  var token = req.headers['x-access-token'];
  var userInfo = jwt.decode(token, 'localHostsSecretHostlocal');
  db.Users.findOne({where:{username:userInfo.username}}).then(function(user){
    res.status(200);
    res.json(user);
  }).catch(function(err){
    res.status(500).send(err)
  })
};


var getEvents = function(req, res) {

};

var getUsername = function(req, res) {
  var token = req.headers['x-access-token'];
  var userInfo = jwt.decode(token, 'localHostsSecretHostlocal');
  res.send(userInfo);
}

var getJoinedEvents = function (req, res) {
  var token = req.headers['x-access-token'];
  var userInfo = jwt.decode(token, 'localHostsSecretHostlocal');
  var data = {hostedEvents:[], joinedEvents:[]};
  db.JoinersEvents.findAll({where: {userId: userInfo.id }, raw:true}).then(function(joinedEvents){
    if (joinedEvents.length === 0) {
      res.status(200).send()
    }
    joinedEvents.forEach(function(joinedEvent, joinedEventidx){
      db.Events.findOne({where: {id: joinedEvent.eventId}, raw:true}).then(function(event){
        event.confirmed = joinedEvent.confirmed;
        db.EventTimes.findOne({where:{id:joinedEvent.eventtimeId}, raw:true}).then(function(eventTime){
          event.eventTime = eventTime.time;  
        }).then(function(){
          db.Users.findOne({where:{id:event.hostId}, raw: true }).then(function(user){
            event.host = user.username;
            data.joinedEvents.push(event);
            if (data.joinedEvents.length === joinedEvents.length) {
              res.status(200);
              res.json(data);
            }
          })
        })
      })
    })
  }).catch(function(err){
    res.status(500).send(err)
  })


};

var getHostedEvents = function (req, res) {
  var token = req.headers['x-access-token'];
  var userInfo = jwt.decode(token, 'localHostsSecretHostlocal');
  var data = {hostedEvents:[], joinedEvents:[]};
  db.Events.findAll({where:{hostId:userInfo.id}, raw:true}).then(function(events){
    if (events.length === 0) {
      res.send()
    }
    events.forEach(function(event, eventidx){
      event.usersJoined = [];
      db.JoinersEvents.findAll({where: {eventId:event.id},raw:true}).then(function(joinedUser){
        if (joinedUser.length === 0) {
          data.hostedEvents.push(event);
        }
        joinedUser.forEach(function(user, useridx){
          db.Users.findOne({where: {id: user.userId}, raw:true}).then(function(joinedUsername){
            user.username = joinedUsername.username;
          }).then(function(){
            db.EventTimes.findOne({where:{id:user.eventtimeId}, raw:true}).then(function(eventTime){
              user.eventTime = eventTime.time;
              event.usersJoined.push(user);
              if (event.usersJoined.length === joinedUser.length) {
                data.hostedEvents.push(event);
              }
              if ((data.hostedEvents.length) === events.length) {
                res.status(200);
                res.json(data)
              }
            })
          })
        })
      })
    })
  }).catch(function(err){
    res.status(500).send(err);
  });
};


var getProfile = function (req, res) {
  var username = req.body.username;
  db.Users.findOne({where: {username: username}, raw:true}).then(function(user){
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
  db.JoinersEvents.update({confirmed:true}, {where: {userId:acceptedUser, eventId: eventId, eventtimeId: req.body.eventTimeId}}).then(function(result){
    res.status(200).send(result);
  }).catch(function(err){
    res.status(500).send("error:", err);
  });
};

var setProfileImage = function(req, res) {
  var token = req.headers['x-access-token'];
  var user = jwt.decode(token, 'localHostsSecretHostlocal');
  var imageUrl = req.body.imageUrl;
  db.Users.update({photoUrl: imageUrl}, {where:{username:user.username}}).then(function(result){
    res.status(200).send(result);
  }).catch(function(err){
    res.status(500).send("error:", err);
  })
}

module.exports = {
  getUser: getUser,
  getEvents: getEvents,
  getProfile: getProfile,
  confirmEvent: confirmEvent,
  getHostedEvents: getHostedEvents,
  getJoinedEvents: getJoinedEvents,
  setProfileImage: setProfileImage,
  getUsername: getUsername
};

