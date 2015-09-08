var reviewController = require('./reviewController');

module.exports = function(app){
  app.post('/saveReview', reviewController.saveReview);
  // app.post('/getReviews', reviewController.getReviews);
};