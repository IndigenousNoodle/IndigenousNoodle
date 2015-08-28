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

module.exports = {
  getEvents: getEvents
};
