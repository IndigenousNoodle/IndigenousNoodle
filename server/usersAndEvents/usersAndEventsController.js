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


  // match the username
  // match the event id of an event (object) in hostedEvents (array)
  // push a user to the userApplied array

  // Users.update({username:'Michael', "hostedEvents._id": "1"},
  //   {$addToSet: {"hostedEvents.$.usersApplied": {"username":"Lisa"}}});
  
  Users.findOne({username: "Michael", "hostedEvents._id": "1"}, function(err,doc){
    for (var ev in doc.hostedEvents){
      if (ev._id === req.body.id){
        doc.hostedEvents.push(req.body);
        doc.save();
      }
    }
    console.log("doc === ", doc);
  });

// Model.findOne({ name: 'borne' }, function (err, doc){
//   doc.name = 'jason borne';
//   doc.visits.$inc();
//   doc.save();
// });


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
