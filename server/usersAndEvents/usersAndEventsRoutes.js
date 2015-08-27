var usersAndEventsController = require('./usersAndEventsController');

module.exports = function(app){
  app.post('/postEvents', usersAndEventsController.postEvents);
};