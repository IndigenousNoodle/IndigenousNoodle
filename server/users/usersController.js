var Users = require('./usersModel');

var getUser = function(req, res) {
  Users.find().exec(function(err,data){
    if (err) {
      res.send(500, err);
    } else {
      res.send(data);
    }
  })
}

module.exports = {
  getUser: getUser
};
