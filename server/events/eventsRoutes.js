var eventsController = require('./eventsController.js');

module.exports = function(app) {
  app.get('/events', eventsController.getEvents);
};
