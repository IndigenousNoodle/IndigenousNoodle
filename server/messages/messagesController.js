var db = require('../db/db');
var jwt = require('jwt-simple');

var postMessage = function(req, res) {
  var sender;
  db.Users.findOne({
    where: {
      username: req.body.sender
    }
  }).then(function(sender){
    sender = sender;
    db.Users.findOne({
      where: {
        username: req.body.receiver
      }
    }).then(function(receiver){
      db.Messages.create({
        text: req.body.msg,
        sender: sender.dataValues.id,
        receiver: receiver.dataValues.id
      }).then(function(msg){
        res.status(200).send(msg);
      }).catch(function(err){
        console.log("ERROR", err);
      })
    })
  })
}

var getMessages = function(req, res) {

  var token = req.headers['x-access-token'];
  var hoster = jwt.decode(token, 'localHostsSecretHostlocal');

  req.body["senderId"] = hoster.id;

  db.Users.findOne({
    where: {
      username: req.params.receiver
    }
  }).then(function(receiver){
    db.Messages.findAll({
      where: { $or: [
          {
            sender: req.body.senderId,
            receiver: receiver.id
          },
          {
            sender: receiver.id,
            receiver: req.body.senderId
          }
        ]
      }
    }).then(function(msg){
      res.send(msg)
    })
  })
};

var getAllMessages = function(req, res) {
  var token = req.headers['x-access-token'];
  var user = jwt.decode(token, 'localHostsSecretHostlocal');
  var data = {};

  console.log("user", user);

  db.Messages.findAll({
    where: { $or: [
        {
          sender: user.id
        },
        {
          receiver: user.id
        }
      ]
    },
    group: ['sender', 'id'],
    order: '"createdAt" ASC',
    raw: true
  }).then(function(messages){
    messages.forEach(function(msg){
      if(msg.sender === user.id) {
        data[msg.receiver] = {msg : msg.text};
      } else {
        data[msg.sender] = {msg: msg.text};
      }
    })

    Object.keys(data).forEach(function(id, index) {
      db.Users.findOne({
        where: {
          id: id
        }
      }).then(function(user){
        data[id].username = user.username;
        if(Object.keys(data).length - 1 === index) {
          res.send(data);
        }
      })
    })
  })
}


module.exports = {
  postMessage: postMessage,
  getMessages: getMessages,
  getAllMessages: getAllMessages
};