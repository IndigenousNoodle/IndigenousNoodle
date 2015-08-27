var Events = require('../events/eventsModel');
var Users = require('../users/usersModel');

var postEvents = function(req, res){
  // post to db
  console.log("posting event");
  console.log("req.body === ", req.body);
  Events.create(req.body, function(err, response){
    if (err){
      console.log("ERROR");
    }else{
      // try to update user
      console.log("trying to update the user");
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

module.exports = {
  postEvents: postEvents
};
