var AWSController = require('./AWSController.js');

module.exports = function(app) {
  app.get('/AWS/sign', AWSController.getUrl);
};
