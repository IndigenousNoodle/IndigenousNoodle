var signupLoginController = require('./signupLoginController');

module.exports = function(app) {
	app.post('/signup', signupLoginController.signup);
};