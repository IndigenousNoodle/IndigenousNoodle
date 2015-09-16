(function(){
  angular
      .module('app.dataservice')
      .factory('reviewService', reviewService)

  reviewService.$inject = ['$http'];

  function reviewService ($http) {

    return {
      saveReviewAjax: saveReviewAjax,
      getReviews: getReviews,
      getPublicReviews: getPublicReviews
    };


    function saveReviewAjax(reviewData) {
      return $http.post('/saveReview', reviewData)
        .then(saveReviewAjaxComplete)
        .catch(saveReviewAjaxFailed);

      function saveReviewAjaxComplete(data){
        console.log("saveReview ajax complete data: ", data);
        return data;
      }

      function saveReviewAjaxFailed(err){
        console.log("saveReviewAjaxFailed: ", err);
      }
    }

    function getReviews(){
      console.log('inside getreviews')
      return $http.get('/getUserReviews')
        .then(getUserReviewsComplete)
        .catch(getUserReviewsFailed)

        function getUserReviewsComplete (data) {
          return data;
        }
        function getUserReviewsFailed(err) {
          console.log("getUserReviewsFailed: ", err);
        }
    }

    function getPublicReviews(username){
      console.log("getPublicReviews username: " , username);
      return $http.post('/getPublicReviews', {username: username})
        .then(getPublicReviewsComplete)
        .catch(getPublicReviewsFailed);

        function getPublicReviewsComplete (data) {
          return data;
        }
        function getPublicReviewsFailed(err) {
          console.log("getPublicReviewsFailed: ", err);
        }
    }
  }

}());