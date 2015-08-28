var Users = require('../users/usersModel');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');

var signup = function(req, res) {
	console.log("Post to saveUser: ", req.body);

	// find user by username
  Users.findOne({username: req.body.username})
  	.exec(function(err, data){
  		if (err) { // if findOne err
  			console.log("saveUser findOne error: ", err);
  		} else { // if no findOne err
  			if (!data) { // if no user found, save user
          bcrypt.hash(req.body.password, null, null, function(err, hash) {
            if (err) {
              console.log("saveUser bcrypt err: ", err);
            } else {
      				var newUser = new Users({username: req.body.username, password: hash});
      				newUser.save(function(err, data) {
      					if (err) { // if save user err
      						console.log("saveUser .save error: ", err);
      					}
                // console.log("newUser saved data: ", data);
                // var token = jwt.encode(data, 'localHostsSecretHostlocal');
                // console.log("token: ", token);
                // res.json({token: "token"});
                res.json({data: data});

      				});
            }
          });
  			} else { // if user already exist
  				console.log("saveUser user already exist ", data);
  				res.send("user already exist");
  			}
  		}
  	});   
};

module.exports = {
  signup: signup
};
