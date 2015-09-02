var Events = require('./eventsModel');

var getEvents = function(req, res) {
  var city = req.params.city.toLowerCase();
  Events.find({city: city}).exec(function(err,data){
    if (err) {
      res.send(500, err);
    } else {
      res.send(data);
    }
  });
};

var getEvent = function(req, res){
  // return the event with the id
  console.log("GETTING EVENT", req.body.id);

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
