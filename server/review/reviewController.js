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

module.exports = {
  saveReview: saveReview
};
