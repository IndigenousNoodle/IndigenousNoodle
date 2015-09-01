var usersController = require('./usersController.js');

module.exports = function(app) {
  app.get('/user', usersController.getUser);
  app.get('/user/eventsManager', usersController.getEvents);
  app.get('/user/userProfile/', usersController.getProfile);
  app.post('/user/confirmEvent/', usersController.confirmEvent);
};
