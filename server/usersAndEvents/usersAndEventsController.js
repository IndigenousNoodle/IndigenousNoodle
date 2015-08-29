var Events = require('../events/eventsModel');
var Users = require('../users/usersModel');

var postEvents = function(req, res){
  Events.create(req.body, function(err, response){
    if (err){
      console.log("ERROR");
    }else{
      // try to update user
      Users.findOneAndUpdate(
        {"username": req.body.host},
        {$addToSet: {"hostedEvents": req.body}},
        {safe: true, new: true},
        function(err, model){
          if (err){
            console.log("ERROR: ", err);
            res.send(500,err);
          }else{
            console.log("SUCCESS", model);
            res.status(200).send(model);
          }
        }
      );
    }
  });
};

var joinEvent = function(req, res){
  console.log("joining event, req.body === ", req.body);

  // {eventData: event, joiner: joiner, host: host}
  // must use eventID to reference the same event

  // match the username
  // match the event id of an event (object) in hostedEvents (array)
  // push a user to the userApplied array

  // must have an event with an id in eventData

// { eventData: { id: 1, val: 'hardcoded' },
//   joiner: 'Lisa',
//   host: 'Michael' }


// { 
//   "_id" : ObjectId("55e0ecf9422d86f0a3b37b8f"),
//    "username" : "Lisa", 
//    "hostedEvents" : [ { "_id" : 2, "usersApplied" : [ ] } ], 
//    "joinedEvents" : [ { "confirmed" : false } ] 
// }

Users.update({username:'Michael', "hostedEvents._id": "1"},
  {$addToSet: {"hostedEvents.$.usersApplied": {"username":"SDasdfFSDFKJDSFKJSDFKJDSFKLJDSFLJSDF"}}});

};

module.exports = {
  postEvents: postEvents,
  joinEvent: joinEvent
};

  // Users.findOneAndUpdate(
  //     {"username": req.body.host},
  //     {$addToSet: {"usersApplied": req.body.eventData}},
  //     {safe: true, new: true},
  //     function(err, host){
  //       if (err){
  //         console.log("ERROR: ", err);
  //         res.send(500,err);
  //       }else{
  //         // now we must find a joining user and push into the joinedEvents the eventData
  //         // console.log("host === ", host);
  //         // Users.findOneAndUpdate(
  //         //   {"username": req.body.joiner},
  //         //   {$addToSet: {"joinedEvents": req.body.eventData}},
  //         //   {safe: true, new: true},
  //         //   function(err, joiner){
  //         //     if (err){
  //         //       console.log("ERROR: ", err);
  //         //       res.send(500, err);
  //         //     }else{
  //         //       console.log("Joiner === ", joiner);
  //         //     }
  //         //   }
  //         // );
  //       }
  //     }
  //   );

  // find the host user
  // then push into users applied the eventData
  // find the joining user
  // push into the joinedEvents the eventData
