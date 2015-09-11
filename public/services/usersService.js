(function(){
  angular
      .module('app.dataservice')
      .factory('usersService', usersService)

  usersService.$inject = ['$http'];

  function usersService ($http) {

    return {
      getUserEvents: getUserEvents,
      getUserProfile: getUserProfile,
      confirmEvent: confirmEvent,
      getJoinedEvents: getJoinedEvents,
      getHostedEvents: getHostedEvents,
      getProfile: getProfile,
      uploadImage: uploadImage,
      getUsername: getUsername
    };

    function getUsername() {
      return $http.get('/username')
        .then(haveUsername)
        .catch(haveUsernameFailed)

        function haveUsername (username) {
          return username
        }

        function haveUsernameFailed(error) {
          console.log("ERROR: ", error);
        }
    }


    function getUserEvents() {
      return $http.get('/user/eventsManager')
        .then(getUserEventsComplete)
        .catch(getUserEventsFailed)

        function getUserEventsComplete (newData) {
          return newData
        }
        function getUserEventsFailed(error) {
          console.log("ERROR: ", error);
        }
    }

    function getUserProfile(username) {
      return $http.post('/user/userProfile/', {username: username})
        .then(getUserProfileComplete)
        .catch(getUserPorfileFailed)

        function getUserProfileComplete (newData) {
          return newData;
        }

        function getUserPorfileFailed (error) {
          console.log("ERROR: ", error);
        }
    }

    function confirmEvent(acceptedUser, eventId){
      return $http.post('/user/confirmEvent/', {acceptedUser: acceptedUser, eventId: eventId})
        .then(confirmEventComplete)
        .catch(confirmEventFailed);

      function confirmEventComplete(data){
        console.log("confirming event complete");
        return data;
      }

      function confirmEventFailed(error){
        console.log("ERROR: ", error);
      }
    }

    function getJoinedEvents() {
      return $http.get('/user/joinedEventsManager')
        .then(getJoinedEventsComplete)
        .catch(getJoinedEventsFailed)

        function getJoinedEventsComplete (joinedEvents) {
          return joinedEvents;
        }
        function getJoinedEventsFailed(error) {
          console.log("ERROR: ", error);
        }
    }

    function getHostedEvents() {
      return $http.get('/user/hostedEventsManager')
        .then(getHostedEventsComplete)
        .catch(getHostedEventsFailed)

        function getHostedEventsComplete (hostedEvents) {
          return hostedEvents;
        }
        function getHostedEventsFailed(error) {
          console.log("ERROR: ", error);
        }
    }

    function getProfile(){
      return $http.get('/user')
        .then(getProfileComplete)
        .catch(getProfileFailed);

      function getProfileComplete(data){
        return data;
      }

      function getProfileFailed(error){
        console.log("ERROR: ", error);
      }
    }

    function uploadImage () {
      var file = document.getElementById("image").files[0];
      console.log('here')
      $http.get('/AWS/sign?file_name=' + file.name + "&file_type=" + file.type)
        .then(getUrlComplete)
        .catch(getUrlFailed)

      function upload(file, signed_request, url, done) {
        var xhr = new XMLHttpRequest()
        xhr.open("PUT", signed_request)
        xhr.setRequestHeader('x-amz-acl', 'public-read')
        xhr.onload = function() {
          if (xhr.status === 200) {
            done()
          }
        }
        xhr.send(file)
      }

      function getUrlComplete (response) {
        upload(file, response.data.signed_request, response.data.url, function() {
          var imageUrl = "https://s3-us-west-2.amazonaws.com/localhosts/" + file.name;
          document.getElementById("profileImage").style.backgroundImage = 'url('+imageUrl+')';
          $http.post('/user/profileImage', {imageUrl: imageUrl}).then(function(response){
          }).catch(getUrlFailed);
        });
      }

      function getUrlFailed (err) {
        console.log("ERROR: ", err)
      }
    }



  }

}());