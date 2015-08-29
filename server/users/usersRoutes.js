var usersController = require('./usersController.js');

module.exports = function(app) {
  app.get('/user', usersController.getUser);
  app.post('/user/eventsManager', usersController.getEvents);
  app.post('/user/userProfile/', usersController.getProfile);
  app.post('/user/confirmEvent/:username', usersController.confirmEvent);
};
