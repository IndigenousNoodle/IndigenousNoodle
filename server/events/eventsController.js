var Events = require('../db/db').Events;
var db = require('../db/db.js');

var getEvents = function(req, res) {
  var city = req.params.city.toLowerCase();
  
  Events.findAll({
    where: { city: city },
  }).then(function(events) {
      res.json(events);
    });
};

var getEvent = function(req, res){

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

};

module.exports = {
  getEvents: getEvents,
  getEvent: getEvent
};
