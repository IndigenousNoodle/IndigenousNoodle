var db = require('../db/db');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var jwtSecret = require('../../../jwt.config.js');

var signup = function(req, res) {
	console.log("Post to signup: ", req.body);


  // find user by username
  db.Users.findOne({ where: {username: req.body.username} })
    .then(function(data) {
      if (!data) { // if no user found, save user
        bcrypt.hash(req.body.password, null, null, function(err, hash) {
          if (err) {
            console.log("signup bcrypt err: ", err);
          } else {
            db.Users.create({username: req.body.username, password: hash})
              .then(function(data) {
                console.log("newUser saved data: ", data);
                var token = jwt.encode(data, jwtSecret.secret);
                console.log("token: ", token);
                res.json({token: token});
              }).catch(function(err) { // if save user err
                console.log("signup .create error: ", err);
              });
          }
        });
      } else {
        console.log("saveUser user already exist ", data);
        res.send(null);
      }
    }).catch(function(err) { console.log("signup findOne error: ", err); }); // if findOne err
};


var signin = function(req, res) {
  console.log("Post to signin: ", req.body);

  // find user by username
  db.Users.findOne({ where: {username: req.body.username} })
    .then(function(data) {
      if (!data) { 
        res.send(null);
      } else {
        //compare passwords using bcrypt
        bcrypt.compare(req.body.password, data.password, function(err, result) {
          if (err) {
            console.log("Password compare err: ", err);
          } else if (result) {
            console.log("Signin matched user data: ", data);
            var token = jwt.encode(data, jwtSecret.secret);
            console.log("jwtSecret.secret=======: ", jwtSecret.secret);
            console.log("token: ", token);
            res.json({token: token});
          } else {
            console.log("wrong password");
            res.send(null);
          }
        });
      }
    }).catch(function(err) { console.log("Post to signin err: ", err); });
};


var checkAuth = function(req, res) {
  console.log("inside checkAuth, req.body: ", req.body);
  var token = req.headers['x-access-token'];
  if (!token) {
    console.log("checkAuth empty token");
  } else {
    // decode user info
    var user = jwt.decode(token, 'localHostsSecretHostlocal');
    Users.findOne({username: user.username})
      .exec(function(err, data) {
        if (err) {
          console.log("checkAuth findOne err", err);
        }
        if (data) {
          res.json(user);
        }
        if (!data) {
          res.send("checkAuth, Username does not exist");
        }
      }); 
  }
};

module.exports = {
  signup: signup,
  signin: signin,
  checkAuth: checkAuth
};
