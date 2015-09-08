var jwt = require('jwt-simple');
var db = require('../db/db.js');

var saveReview = function(req, res){
  console.log('reciewctrl req: ', req);
  var token = req.headers['x-access-token'];
  var user = jwt.decode(token, 'localHostsSecretHostlocal');
  console.log('reciewctrl user : ', user);

  db.Reviews.create({
    rating: req.body.rating,
    review: req.body.review,
    usersHostId: req.body.usersHostId,
    usersJoinId: user.id,
    eventId: req.body.eventsId
  }).then(function(data){
    res.status(200).send(data);
  }).catch(function(err){
    console.log("Reviews err: ", err);
  });
  
};

var getUserReviews = function(req, res){
  console.log("in getUserReviews---------------");
  var reviewsData = [];
  var token = req.headers['x-access-token'];
  var host = jwt.decode(token, 'localHostsSecretHostlocal');

  db.Reviews.findAll({ where : { usersHostId: host.id }, raw:true})
    .then(function(reviews) {
      if (reviews.length === 0) {
        res.status(200);
        res.json({reviewsData: reviewsData});
      }

      reviews.forEach(function(review, index) {
        var singleReviewData = {
          createdAt: review.createdAt,
          rating: review.rating,
          review: review.review
        };

        db.Users.findOne({ where: {id: review.usersJoinId}})
          .then(function(user) {
              console.log('inside user findOne: ', review);
              singleReviewData.author = user.username;
              singleReviewData.authorPhotoUrl = user.photoUrl;

              db.Events.findOne({ where: {id: review.eventId} })
                .then(function(event) {
                  singleReviewData.eventTitle = event.title;
                  reviewsData.push(singleReviewData);
                  if (reviewsData.length === reviews.length) {
                    res.status(200);
                    res.json({reviewsData: reviewsData});
                  }
                }) 
          })
          .catch(function(err) {
            console.log(err);
          });

        //old code
        // db.Users.findOne({ where: {id: review.usersJoinId}})
        //   .then(function(user) {
        //       console.log('inside user findOne: ', review);
        //       singleReviewData.author = user.username;
        //       singleReviewData.authorPhotoUrl = user.photoUrl; 
        //   })
        //   .catch(function(err) {
        //     console.log('Users findOne err', err);
        //   });

        // db.Events.findOne({ where: {id: review.eventId} })
        //   .then(function(event) {
        //     singleReviewData.eventTitle = event.title;
        //     reviewsData.push(singleReviewData);
        //     if (index === reviews.length - 1) {
        //       res.status(200);
        //       res.json({reviewsData: reviewsData});
        //     }
        //   })
        //   .catch(function(err) {
        //     console.log('Events findOne err', err);
        //   });
      }); 
    })
    .catch(function(err) {
      console.log('getUserReviews findAll err', err);
      res.status(500).send(err);
    });
};

var getPublicReviews = function(req, res) {
  console.log("in getPublicReviews---------------------");
  console.log('req.body--------', req.body);

  var reviewsData = [];

  db.Users.findOne({ where: {username: req.body.username }, raw:true})
    .then(function(user) {

      console.log("req.body.username findone: ", user)

      db.Reviews.findAll({ where : { usersHostId: user.id }, raw:true})
        .then(function(reviews) {
          if (reviews.length === 0) {
            res.status(200);
            res.json({reviewsData: reviewsData});
          }

          reviews.forEach(function(review, index) {
            var singleReviewData = {
              createdAt: review.createdAt,
              rating: review.rating,
              review: review.review
            };

            db.Users.findOne({ where: {id: review.usersJoinId}})
              .then(function(user) {
                  singleReviewData.author = user.username;
                  singleReviewData.authorPhotoUrl = user.photoUrl; 

                  db.Events.findOne({ where: {id: review.eventId} })
                    .then(function(event) {
                      singleReviewData.eventTitle = event.title;
                      reviewsData.push(singleReviewData);
                      if (reviewsData.length === reviews.length) {
                        console.log("public reviewsData: -------", reviewsData);
                        res.status(200);
                        res.json({reviewsData: reviewsData});
                      }
                    })
                    .catch(function(err) {
                      console.log('Events findOne err', err);
                    });
              })
              .catch(function(err) {
                console.log('Users findOne err', err);
              });
          }); 
        })
        .catch(function(err) {
          console.log('getUserReviews findAll err', err);
          res.status(500).send(err);
        });

    })
    .catch(function(err) {
      console.log('req.username findOne err', err);
    })
};

module.exports = {
  saveReview: saveReview,
  getUserReviews: getUserReviews,
  getPublicReviews: getPublicReviews,
};
