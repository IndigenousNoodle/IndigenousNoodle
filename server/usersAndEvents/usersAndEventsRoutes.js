var usersAndEventsController = require('./usersAndEventsController');

module.exports = function(app){
  app.post('/postEvents', usersAndEventsController.postEvents);
  app.post('/joinEvent', usersAndEventsController.joinEvent);
};