var usersController = require('./usersController.js');

module.exports = function(app) {
  app.get('/user', usersController.getUser);
};
