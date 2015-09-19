var messagesController = require('./messagesController');

module.exports = function(app){
  app.post('/postMessage', messagesController.postMessage);
  app.get('/getMessages/:receiver', messagesController.getMessages);
  app.get('/getAllMessages', messagesController.getAllMessages);
  app.get('/getProfilePictures/:receiver', messagesController.getProfilePictures);
};