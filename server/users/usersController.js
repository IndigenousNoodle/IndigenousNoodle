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
  // var username = req.body.??
  // check if user is undefined
  //'kevin is hardcoded value for development'
  Users.findOne({username: 'kevin'}, function (err, data) {
    if (err) {
      res.send(500, err)
    } else {
      res.status(200).send(data);
    }
  });
};

var getProfile = function (req, res) {
  var username = req.params.username
  Users.findOne({username:username}, function (err,data) {
    if (err) {
      res.send(500, err)
    } else {
      res.status(200).send(data);
    }
  });
};

var confirmEvent = function (req, res) {
<<<<<<< HEAD
  var clientName = req.params.username
};

||||||| merged common ancestors
  var clientName = req.url.split('/')[3];
}
=======
  var clientName = req.params.username
}
>>>>>>> (refactor) use request params to get username

module.exports = {
  getUser: getUser,
  getEvents: getEvents,
  getProfile: getProfile,
  confirmEvent: confirmEvent
};
