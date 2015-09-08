(function() {
  angular.module('message', [])
    .controller('messageController', messageController)

    messageController.$inject = ['$stateParams', 'messagesService', 'getUsername', 'getMessages']

  function messageController($stateParams, messagesService, getUsername, getMessages) {
    var vm = this;
    var socket = io();
    vm.emitMessage = emitMessage;
    vm.send = send;
    vm.userId = getUsername.data.id;
    vm.username = getUsername.data.username;
    vm.getMessages = getMessages;
    vm.receiver = $stateParams.receiver;

    send();

    socket.on('new_msg', function(data) {
      $('#messages').append($('<li>').text(data.sender + ': ' + data.msg));
    });

    function send() {
      socket.emit('join', {username: vm.username});
    }

    function emitMessage() {
      var messageData = {msg: vm.text, sender: vm.username, receiver: $stateParams.receiver}

      messagesService.postMessage(messageData);

      socket.emit('sendTo', {msg: vm.text, sender: vm.username, receiver: $stateParams.receiver});
      vm.text = '';
      return false;
    }
  }

})();
