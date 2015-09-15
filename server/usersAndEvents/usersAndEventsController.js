var jwt = require('jwt-simple');
var db = require('../db/db.js');

var postEvents = function(req, res){
  var token = req.headers['x-access-token'];
  var hoster = jwt.decode(token, 'localHostsSecretHostlocal');
  var userEventTimes = req.body.time;

  req.body["host"] = hoster.username;

  // get the users id?
  // then create the event
  // then set the events hostId to be the users id

  db.Users.findOne({
      where: {
        username: hoster.username
      }
    }).then(function(user){
      console.log(user)
      db.Events.create({
        title: req.body.title,
        description: req.body.description,
        city: req.body.city,
        address: req.body.address,
        price: req.body.price,
        hostId: user.dataValues.id
      }).then(function(ev){
        userEventTimes.forEach(function(time){
          db.EventTimes.create({
            time: time.toString(),
            eventId: ev.id
          })
        });
      }).then(function(){
        res.status(200).send('done');
      }).catch(function(err){
        console.log("EVENT ERR ===== ", err);
      });
    }).catch(function(err){
      console.log('ERRRORRRRR', err);
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
          confirmed: false,
          eventtimeId: req.body.time
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
  }
};

module.exports = {
  postEvents: postEvents,
  joinEvent: joinEvent
};