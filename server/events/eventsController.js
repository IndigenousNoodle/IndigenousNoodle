var Events = require('../db/db').Events;
var db = require('../db/db.js');
var jwt = require('jwt-simple');

//Retrieves all events from database based on city (input from client)
//Includes reviews and times

var getEvents = function(req, res) {
  console.log("Inside getEvents============");
  var city = req.params.city.toLowerCase();
  var averageRating = 0;
  var allEventsData = [];
  
  Events.findAll({ where: { city: city }, raw:true})
    .then(function(events) {
      console.log("events: ", events);
      if (events.length === 0) {
        res.status(200);
        res.json(events);
      }
      events.forEach(function(event, index) {
      console.log("event: ", event);
        // count numbers of review
        db.Reviews.count({ where: {eventId: event.id} })
          .then(function(c) {
            // get sum of the reviews
            db.Reviews.sum('rating', { where: {eventId: event.id} })
            .then(function(s) {
              // calculate average rating
              if (c !== 0) {
                averageRating = Math.round(s / c);
              } else {
                averageRating = 0;
              }
              // save rating to eventData
              event.rating = averageRating;
            })
          })
          .then(function() {
            console.log("inside 2nd .then====");

            db.EventTimes.findAll({where:{"eventId":event.id}, raw:true}).then(function(eventTimes){
              event.time = eventTimes;
              allEventsData.push(event);
              if (events.length === allEventsData.length) {
                console.log("allEventsData: ", allEventsData);
                res.status(200).send(allEventsData);
              }
            })
          })
          .catch(function(err) {
            console.log("ERROR coutning EVENT === ", err);
            res.send(500,err);
          });

      })
    })
    .catch(function(err) {
      console.log("getEvents err === ", err);
      res.send(500,err);
    });
};


//Retrieves individual event information from database.
//Includes reviews for event, host information and times for event.
var getEvent = function(req, res){
  var token = req.headers['x-access-token'];
  var userInfo = jwt.decode(token, 'localHostsSecretHostlocal');
  var userId = userInfo.id;
  var eventData = {};
  var averageRating = 0;

  db.Events.findOne({ where: {id: req.body.id}, raw: true })
  .then(function(ev){
    // eventData = ev;
    console.log('eventInfo===================== ', ev)

    // count numbers of review
    db.Reviews.count({ where: {eventId: req.body.id} })
      .then(function(c) {
        // get sum of the reviews
        db.Reviews.sum('rating', { where: {eventId: req.body.id} })
        .then(function(s) {
          // calculate average rating
          if (c === 0) {
            averageRating = 0;
          } else {
            averageRating = Math.round(s / c);
          }
          ev.rating = averageRating;
        })
      })
      .then(function() {
        console.log('getEvent ev: ', ev);
        //includes host information to data
        db.Users.findOne({
          where: {
            id: ev.hostId
          },
          raw: true
        }).then(function(user) {
          ev.host = user.username;
          //includes event times
          db.EventTimes.findAll({
            where: {
              "eventId": ev.id
            }, raw: true
          }).then(function(eventTimes) {
            console.log('eventTimes===== ', eventTimes);
            ev.time = eventTimes;
            ev.userId = userId;
            ev.hostProfilePhoto = user.photoUrl;
            res.status(200).send(ev);
          })
        })
      })
      .catch(function(err) {
        console.log("ERROR coutning EVENT === ", err);
        res.send(500,err);
      });
  }).catch(function(err){
    console.log("ERROR GETTING EVENT ====== ", err);
    res.send(500,err);
  });
};


//Not implemented yet
var setEventImage = function(req, res) {
  var token = req.headers['x-access-token'];
  var user = jwt.decode(token, 'localHostsSecretHostlocal');
  var imageUrl = req.body.imageUrl;
  db.Events.update({photoUrl: imageUrl}, {where:{username:user.username}}).then(function(result){
    res.status(200).send(result);
  }).catch(function(err){
    res.status(500).send("error:", err);
  })
}

var cancelEvent = function(req,res) {
  var token = req.headers['x-access-token'];
  var user = jwt.decode(token, 'localHostsSecretHostlocal');
  console.log(req.body)
  db.JoinersEvents.destroy({where:{userId: user.id ,eventId: req.body.id, eventtimeId:req.body.eventTimeId, confirmed: false}})
}

module.exports = {
  getEvents: getEvents,
  getEvent: getEvent,
  setEventImage: setEventImage,
  cancelEvent: cancelEvent
};
