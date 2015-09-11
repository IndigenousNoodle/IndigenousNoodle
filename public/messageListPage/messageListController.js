(function() {
  angular.module('messageList', [])
    .controller('messageListController', messageListController)

  messageListController.$inject = ['$state', '$stateParams', 'messagesService', 'getAllMessages'];

  function messageListController($state, $stateParams ,messagesService, getAllMessages) { 
    var vm = this;

    vm.getAllMessages = getAllMessages;
    vm.toMessage = toMessage;

    function toMessage(msg) {
      $state.go('message', {receiver: msg.username})
    }

    console.log(getAllMessages);
  }

})();