var signupLoginController = require('./signupLoginController');

module.exports = function(app) {
	app.post('/signup', signupLoginController.signup);
  app.post('/signin', signupLoginController.signin);
  // app.post('/logCookie', signupLoginController.checkAuth);

};