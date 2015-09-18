(function(){
  angular
      .module('app.dataservice')
      .factory('messagesService', messagesService)

  messagesService.$inject = ['$http'];

  function messagesService ($http) {

    return {
      postMessage: postMessage,
      getMessages: getMessages,
      getAllMessages: getAllMessages,
      getProfilePictures: getProfilePictures
    }

    function postMessage(data){
      return $http.post('/postMessage', data)
        .then(postMessageComplete)
        .catch(postMessageFailed);

      function postMessageComplete(data){
        console.log("posting message complete");
        return data;
      }

      function postMessageFailed(error){
        console.log("ERROR: ", error);
      }
    }

    function getMessages(receiver){
      return $http({method: 'GET', url: '/getMessages/' + receiver})
        .then(getMessagesComplete)
        .catch(getMessagesFailed);

      function getMessagesComplete(data){
        return data.data;
      }

      function getMessagesFailed(err){
        console.log(err);
      }
    }

    function getAllMessages(){
      return $http.get('/getAllMessages')
        .then(getAllMessagesComplete)
        .catch(getAllMessagesFailed);

      function getAllMessagesComplete(data){
        return data.data;
      }

      function getAllMessagesFailed(err){
        console.log(err);
      }
    }

    function getProfilePictures(receiver) {
      console.log(receiver)
      return $http({method: 'GET', url: '/getProfilePictures/' + receiver})
        .then(getProfilePicturesComplete)
        .catch(getProfilePicturesFailed)

      function getProfilePicturesComplete(data){
        return data;
      }

      function getProfilePicturesFailed(err){
        console.log(err);
      }
    }
  }

}());