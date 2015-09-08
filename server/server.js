var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8000;
var middleware = require('./middleware.js');

middleware(app);

var server = app.listen(port);

io.attach(server);

console.log('server is running on port ' + port);

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('join', function (data) {
    console.log('data join on', data);
    socket.join(data.username);
  });

  socket.on('sendTo', function(data){
    io.to(data.sender).emit('new_msg', data);
    io.to(data.receiver).emit('new_msg', data);
  });
});
