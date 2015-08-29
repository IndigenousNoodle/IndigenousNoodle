var Users = require('../users/usersModel');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');

var signup = function(req, res) {
	console.log("Post to signup: ", req.body);

	// find user by username
  Users.findOne({username: req.body.username})
    .exec(function(err, data){
      if (err) { // if findOne err
        console.log("signup findOne error: ", err);
      } else { // if no findOne err
        if (!data) { // if no user found, save user
          bcrypt.hash(req.body.password, null, null, function(err, hash) {
            if (err) {
              console.log("signup bcrypt err: ", err);
            } else {
              var newUser = new Users({username: req.body.username, password: hash});
              newUser.save(function(err, data) {
                if (err) { // if save user err
                  console.log("signup .save error: ", err);
                }
                console.log("newUser saved data: ", data);
                var token = jwt.encode(data, 'localHostsSecretHostlocal');
                console.log("token: ", token);
                res.json({token: token});
              });
            }
          });
        } else { // if user already exist
          console.log("saveUser user already exist ", data);
          res.send(null);
          // res.send("user already exist");
        }
      }
    });   
};

var signin = function(req, res) {
  console.log("Post to signin: ", req.body);

  // find user by username
  Users.findOne({username: req.body.username})
    .exec(function(err, data) {
      if (err) {
        console.log("Post to signin err: ", err);
      } 
      if (!data) {
        // console.log("Singin username doesn't exist");
        res.send(null);
      }
      // compare passwords
      if (data) {
        bcrypt.compare(req.body.password, data.password, function(err, result) {
          if (err) {
            console.log("Password compare err: ", err);
          }
          if (result) {
            console.log("Signin matched user data: ", data);
            var token = jwt.encode(data, 'localHostsSecretHostlocal');
            console.log("token: ", token);
            res.json({token: token});
          } else {
            // console.log("wrong password");
            res.send(null);
          }
        });
      }
    });

 

}

module.exports = {
  signup: signup,
  signin: signin
};
