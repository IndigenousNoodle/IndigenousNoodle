var Users = require('./usersModel');
var jwt = require('jwt-simple');


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
  Users.findOne({_id: user._id}, function (err, data) {
    if (err) {
      res.send(500, err)
    } else {
      res.status(200).send(data);
    }
  });
};

var getProfile = function (req, res) {
  var token = req.body.token;
  var user = jwt.decode(token, 'localHostsSecretHostlocal');
  Users.findOne({_id: user._id}, function (err,data) {
    if (err) {
      res.send(500, err)
    } else {
      res.status(200).send(data);
    }
  });
};

var confirmEvent = function (req, res) {
  var clientName = req.params.username
};


module.exports = {
  getUser: getUser,
  getEvents: getEvents,
  getProfile: getProfile,
  confirmEvent: confirmEvent
};
