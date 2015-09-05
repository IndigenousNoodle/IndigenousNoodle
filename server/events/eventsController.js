var Events = require('./eventsModel');
var Eventst = require('../db/newdb').Events;

var getEvents = function(req, res) {
  var city = req.params.city.toLowerCase();
  
  Eventst.findAll({
    where: { city: city },
  })
    .then(function(events) {
      res.json(events);
    })
};

var getEvent = function(req, res){
  // return the event with the id

  Events.findOne({_id: req.body.id}).exec(function(err, data){
    if (err){
      console.log("ERR", err);
      res.send(500, err);
    }else{
      console.log("SUCCESS", data);
      res.send(data);
    }
  });
};

module.exports = {
  getEvents: getEvents,
  getEvent: getEvent
};
