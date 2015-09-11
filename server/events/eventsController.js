var Events = require('../db/db').Events;
var db = require('../db/db.js');
var jwt = require('jwt-simple');

var getEvents = function(req, res) {
  var city = req.params.city.toLowerCase();
  var data = [];
  
  Events.findAll({
    where: { city: city },raw:true
  }).then(function(events) {
    events.forEach(function(event, idx){
      db.EventTimes.findAll({where:{"eventId":event.id}, raw:true}).then(function(eventTimes){
        event.time = eventTimes;
        data.push(event);
        if (data.length === events.length) {
          res.status(200).send(data);
        }
      })
    })
  }).catch(function(err){
    res.status(500).send(200);
  })
};

var getEvent = function(req, res) {
  var token = req.headers['x-access-token'];
  var userInfo = jwt.decode(token, 'localHostsSecretHostlocal');
  var userId = userInfo.id;

  db.Events.findOne({
    where: {
      id: req.body.id
    }, raw: true
  }).then(function(ev) {
    db.Users.findOne({
      where: {
        id: ev.hostId
      }
    }).then(function(user) {
      ev.username = user.username;
      db.EventTimes.findAll({
        where: {
          "eventId": ev.id
        }, raw: true
      }).then(function(eventTimes) {
        ev.time = eventTimes;
        ev.userId = userId;
        res.status(200).send(ev);
      })
    })
  }).catch(function(err) {
    console.log("ERROR GETTING EVENT === ", err);
    res.send(500, err);
  });
};

module.exports = {
  getEvents: getEvents,
  getEvent: getEvent
};
