var usersController = require('./usersController.js');

module.exports = function(app) {
  app.get('/user', usersController.getUser);
  app.get('/user/eventsManager', usersController.getEvents);
  app.get('/user/joinedEventsManager', usersController.getJoinedEvents);
  app.get('/user/hostedEventsManager', usersController.getHostedEvents);
  app.post('/user/userProfile/', usersController.getProfile);
  app.post('/user/confirmEvent/', usersController.confirmEvent);
  app.post('/user/profileImage/', usersController.setProfileImage);
};
