(function(){
  angular
      .module('app.dataservice')
      .factory('reviewService', reviewService)

  reviewService.$inject = ['$http'];

  function reviewService ($http) {

    return {
      saveReviewAjax: saveReviewAjax
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
        console.log("saveReview ajax err: ", err);
      }
    }

  }

}());