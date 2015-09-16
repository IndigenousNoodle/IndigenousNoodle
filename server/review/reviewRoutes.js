var reviewController = require('./reviewController');

module.exports = function(app){
  app.post('/saveReview', reviewController.saveReview);
  app.get('/getUserReviews', reviewController.getUserReviews);
  app.post('/getPublicReviews', reviewController.getPublicReviews);  
};