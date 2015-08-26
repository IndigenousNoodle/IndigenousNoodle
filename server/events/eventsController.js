var Events = require('./eventsModel');

var getEvents = function(req, res) {
  Events.find().exec(function(err,data){
    if (err) {
      res.send(500, err);
    } else {
      res.send(data);
    }
  })
}

module.exports = {
  getEvents: getEvents
};
