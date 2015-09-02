var Events = require('../events/eventsModel');
var Users = require('../users/usersModel');
var jwt = require('jwt-simple');
// var db = require('../db/mongodb.js');
var db = require('../db/newdb.js');

var postEvents = function(req, res){

  var token = req.headers['x-access-token'];
  var hoster = jwt.decode(token, 'localHostsSecretHostlocal');

  req.body["host"] = hoster.username;

  // get the users id?
  // then create the event
  // then set the events hostId to be the users id

  db.Users.findOne({
      where: {
        username: hoster.username
      }
    }).then(function(user){
      db.Events.create({
        title: req.body.title,
        description: req.body.description,
        city: req.body.city,
        time: req.body.time, // might want to change it to datetime
        hostId: user.dataValues.id
      }).then(function(ev){
        res.status(200).send(ev);
      }).catch(function(err){
        console.log("EVENT ERR ===== ", err);
      });
    }).catch(function(err){
      console.log('ERRRORRRRR', err);
    });

  // Events.create(req.body, function(err, response){
  //   if (err){
  //     console.log("ERROR", err);
  //   }else{
  //     // try to update user
  //     console.log("response === ", response);

  //     var hostedQuery = {};
  //     var hostedQueryUpdate = "hostedEvents." + response._id;
  //     hostedQuery[hostedQueryUpdate] = req.body;

  //     console.log("HostedQuery === ", hostedQuery);

  //     // find where the user name matches then simply $set on the user id
  //     db.instance.collection('users').update(
  //       {username: response.host},
  //       {$set:
  //         hostedQuery
  //       },
  //       function(err, data){
  //         if (err){ console.log("ERROR === ", err);}
  //         res.status(200).send(data);
  //       }
  //     );
  //   }
  // });

  // Create event and then update user and then set the user id on the event 



};


// must send the id to the below method
// then must add to joined events the id information


var joinEvent = function(req, res){
  var token = req.headers['x-access-token'];
  var joiner = jwt.decode(token, 'localHostsSecretHostlocal');

  // match the username
  // match the event id of an event (object) in hostedEvents (array)
  // push a user to the userApplied array

  console.log("req.body === ", req.body);
  console.log("joiner === ", joiner);

  if (req.body.hostId !== joiner.id){

    db.Users.findOne({
      where: {
        username: joiner.username
      }
    }).then(function(user){
      db.Events.findOne({
        where: {
          id: req.body.id
        }
      }).then(function(ev){
        db.JoinersEvents.create({
          eventId: req.body.id,
          userId: user.id,
          confirmed: false
        }).then(function(joinerEv){
          res.status(200).send(joinerEv);
        }).catch(function(err){
          console.log("joinerEv err === ", err);
        });
      }).catch(function(err){
        console.log("EVENT ERR === ", err);
      });
    }).catch(function(err){
      console.log("user err === ", err);
    });

    // db.Users.find({
    //   username: req.body.
    // })


    // var hostedEventIDQuery = "hostedEvents." + req.body._id + ".usersApplied." + joiner.username + ".confirmed";
    // var hostedQuery = {};
    // hostedQuery[hostedEventIDQuery] = false;

    // db.instance.collection('users').update(
    //     {username: req.body.host},
    //     {$set:
    //       hostedQuery
    //     },
    //     function(err, data){
    //       if (err){ console.log("ERROR ==== ", err);}
    //       // query to set the joined 

    //       var joinedEventIDQuery = "joinedEvents." + req.body._id;
    //       var joinedQuery = {};
    //       console.log("req.body === ", req.body);
    //       joinedQuery[joinedEventIDQuery] = req.body;
    //       joinedQuery[joinedEventIDQuery]["confirmed"] = false;

    //       db.instance.collection('users').update(
    //           {username: joiner.username},
    //           {$set:
    //             joinedQuery
    //           },
    //           function(err, data){
    //             if (err){ console.log("ERROR === ", err);}
    //             res.status(200).send(data);
    //           }
    //         );
    //     }
    //   );
  }
};

module.exports = {
  postEvents: postEvents,
  joinEvent: joinEvent
};