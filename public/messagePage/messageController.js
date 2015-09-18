(function() {
  angular.module('message', [])
    .controller('messageController', messageController)

    messageController.$inject = ['$stateParams', 'messagesService', 'getUsername', 'getMessages', 'getProfilePictures']

  function messageController($stateParams, messagesService, getUsername, getMessages, getProfilePictures) {
    $('#nav-header').addClass("nav-color")

    var vm = this;
    var socket = io();
    vm.emitMessage = emitMessage;
    vm.send = send;
    vm.userId = getUsername.data.id;
    vm.username = getUsername.data.username;
    vm.getMessages = getMessages;
    vm.receiver = $stateParams.receiver;
    vm.pictures = getProfilePictures.data;

    send();

    socket.on('new_msg', function(data) {
      if(data.sender === vm.username) {
        $('.ChatLog').append('<li class="ChatLog__entry ChatLog__entry_mine"><img class="ChatLog__avatar" src=' + vm.pictures + '><p class="ChatLog__message">' + data.msg + '</p></li>');
      } else {
        $('.ChatLog').append('<li class="ChatLog__entry"><img class="ChatLog__avatar" src=' + vm.pictures + '><p class="ChatLog__message">' + data.msg + '</p></li>');
      }
    });

    function send() {
      socket.emit('join', {username: vm.username});
    }

    function emitMessage() {
      console.log('emit message');
      var messageData = {msg: vm.text, sender: vm.username, receiver: $stateParams.receiver}

      messagesService.postMessage(messageData);

      socket.emit('sendTo', {msg: vm.text, sender: vm.username, receiver: $stateParams.receiver});
      vm.text = '';
      return false;
    }
  }

})();
