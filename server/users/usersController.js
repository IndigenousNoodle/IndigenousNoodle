var Users = require('./usersModel');

var getUser = function(req, res) {
  Users.find().exec(function(err,data){
    if (err) {
      res.send(500, err);
    } else {
      res.send(data);
    }
  })
};

var getEvents = function(req, res) {
  // username stored in session
  // var username = req.body.??

  // check if user is undefined

  Users.findOne({username: 'kevin'}, 'hostedEvents', function (err, data) {
    if (err) {
      res.send(500, err)
    } else {
      res.status(200).send(data);
    }
  });
};

var getProfile = function (req, res) {
  var username = req.url.split('/')[3];
  Users.findOne({username:username}, function (err,data) {
    if (err) {
      res.send(500, err)
    } else {
      res.status(200).send(data);
    }
  });
}

module.exports = {
  getUser: getUser,
  getEvents: getEvents,
  getProfile: getProfile
};
