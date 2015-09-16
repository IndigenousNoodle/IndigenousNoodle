var eventsController = require('./eventsController.js');

module.exports = function(app) {
  app.get('/events/:city', eventsController.getEvents);
  app.post('/getEvent', eventsController.getEvent);
  app.post('/event/eventImage/', eventsController.setEventImage);
};
