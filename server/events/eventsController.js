var Events = require('./eventsModel');
var Eventst = require('../db/newdb').Events;
var db = require('../db/newdb.js');

var getEvents = function(req, res) {
  var city = req.params.city.toLowerCase();
  
  Eventst.findAll({
    where: { city: city },
  }).then(function(events) {
      res.json(events);
    });
};

var getEvent = function(req, res){
  // return the event with the id


  db.Events.findOne({
    where: {
      id: req.body.id
    }
  }).then(function(ev){
    res.send(ev);
  }).catch(function(err){
    console.log("ERROR GETTING EVENT === ", err);
    res.send(500,err);
  });

  // Events.findOne({_id: req.body.id}).exec(function(err, data){
  //   if (err){
  //     console.log("ERR", err);
  //     res.send(500, err);
  //   }else{
  //     console.log("SUCCESS", data);
  //     res.send(data);
  //   }
  // });
};

module.exports = {
  getEvents: getEvents,
  getEvent: getEvent
};
