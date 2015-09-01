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
  var token = req.headers['x-access-token'];
  var user = jwt.decode(token, 'localHostsSecretHostlocal');
  Users.findOne({username: user.username}, function (err, data) {
    if (err) {
      res.send(500, err)
    } else {
      res.status(200).send(data);
    }
  });
};

var getProfile = function (req, res) {
  var token = req.headers['x-access-token'];
  var user = jwt.decode(token, 'localHostsSecretHostlocal');
  Users.findOne({username: user.username}, function (err,data) {
    if (err) {
      res.send(500, err)
    } else {
      res.status(200).send(data);
    }
  });
};

var confirmEvent = function (req, res) {
  var token = req.headers['x-access-token'];
  var user = jwt.decode(token, 'localHostsSecretHostlocal');
  var acceptedUser = req.body.acceptedUser;
  var eventId = req.body.eventId;
  var hostedEventUpdateQuery = "hostedEvents." + eventId + ".usersApplied." + acceptedUser+ ".confirmed";
  var joinedEventUpdateQuery = "joinedEvents." + eventId + ".confirmed";
  // console.log(joinedEventUpdateQuery)
  // console.log(eventId)


  Users.update({username:'lisa'}, {$set:{'hostedEvents["eventId"]["confirmed"]':false}}, function(err,data){
    // console.log(err)
    console.log(data)
    res.send(data)
    res.end()
  })

  // Users.findOne({username:'lisa'}, 'joinedEvents', function(err,data){
  //   console.log(data)
  // })

  // Users.findOne({username: "lisa"}, function (err,user) {
  //   if (err) {
  //     res.send(500, err)
  //   } else {
  //     user.joinedEvents.confirmed = true
  //     user.save(function(err){
  //       console.log(err)
  //     })
  //       Users.update({username: user.username},{$set:{"hostedEvents.55e49b957ca483398f47c67a.usersApplied.lisa.confirmed":true}}, function (err,data) {
  //         if (err) {
  //           res.send(500, err)
  //         } else {
  //           res.status(200).send(data);
  //         }
  //       });
  //   }
  // });
};
// db.users.update({username: 'kevin'}, {$set: {'hostedEvents.55e49b957ca483398f47c67a.usersApplied.lisa.confirmed':true}})
// db.users.update({username:'lisa'}, {$set:{joinedEvents.55e49b957ca483398f47c67a.confirmed:true}})
module.exports = {
  getUser: getUser,
  getEvents: getEvents,
  getProfile: getProfile,
  confirmEvent: confirmEvent
};
