var Events = require('../events/eventsModel');
var Users = require('../users/usersModel');
var jwt = require('jwt-simple');
var db = require('../db/mongodb.js');

var postEvents = function(req, res){

  var token = req.headers['x-access-token'];
  var hoster = jwt.decode(token, 'localHostsSecretHostlocal');

  req.body["host"] = hoster.username;

  Events.create(req.body, function(err, response){
    if (err){
      console.log("ERROR", err);
    }else{
      // try to update user
      console.log("response === ", response);

      var hostedQuery = {};
      var hostedQueryUpdate = "hostedEvents." + response._id;
      hostedQuery[hostedQueryUpdate] = req.body;

      console.log("HostedQuery === ", hostedQuery);

      // find where the user name matches then simply $set on the user id
      db.instance.collection('users').update(
        {username: response.host},
        {$set:
          hostedQuery
        },
        function(err, data){
          if (err){ console.log("ERROR === ", err);}
          res.status(200).send(data);
        }
      );
    }
  });
};


// must send the id to the below method
// then must add to joined events the id information


var joinEvent = function(req, res){
  var token = req.headers['x-access-token'];
  var joiner = jwt.decode(token, 'localHostsSecretHostlocal');

  // match the username
  // match the event id of an event (object) in hostedEvents (array)
  // push a user to the userApplied array
  if (req.body.host !== joiner.username){
    var hostedEventIDQuery = "hostedEvents." + req.body._id + ".usersApplied." + joiner.username + ".confirmed";
    var hostedQuery = {};
    hostedQuery[hostedEventIDQuery] = false;

    db.instance.collection('users').update(
        {username: req.body.host},
        {$set:
          hostedQuery
        },
        function(err, data){
          if (err){ console.log("ERROR ==== ", err);}
          // query to set the joined 

          var joinedEventIDQuery = "joinedEvents." + req.body._id;
          var joinedQuery = {};
          console.log("req.body === ", req.body);
          joinedQuery[joinedEventIDQuery] = req.body;
          joinedQuery[joinedEventIDQuery]["confirmed"] = false;

          db.instance.collection('users').update(
              {username: joiner.username},
              {$set:
                joinedQuery
              },
              function(err, data){
                if (err){ console.log("ERROR === ", err);}
                res.status(200).send(data);
              }
            );
        }
      );
  }
};

module.exports = {
  postEvents: postEvents,
  joinEvent: joinEvent
};

