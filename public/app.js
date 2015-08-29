(function() {
  angular.module('app', [
    'app.navbar',
    'app.createEvent',
    'ui.bootstrap',
    'homepage',
    'ui.router',
    'app.eventManager',
    'app.userProfile',
    'app.dataservice'
    ])

  .config(router)

  router.$inject = ['$urlRouterProvider', '$stateProvider', '$httpProvider'];

  function router($urlRouterProvider, $stateProvider, $httpProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('homepage',{
        url: '/',
        templateUrl: './homepage/homepageTemplate.html',
        controller: 'homepageController',
        controllerAs: 'home'
      })
      .state('createEvent', {
        url: '/createEvent',
        templateUrl: './createEventPage/createEventTemplate.html',
        controller: 'createEventController',
        controllerAs: 'event'
      })
      .state('eventManager', {
        url: '/events/eventManager',
        templateUrl: './eventManager/eventManagerTemplate.html',
        controller: 'eventManagerController',
        controllerAs: 'event',
        resolve: {
          getEventsPrep: getEventsService
        }
      })
      .state('userProfile', {
        url:'/user/userProfile/:username',
        templateUrl: './userProfile/userProfileTemplate.html',
        controller: 'userProfileController',
        controllerAs: 'user',
        resolve: {
          getProfilePrep: getProfileService
        }
      })
      function getEventsService ($http, dataservice) {
         return dataservice.getUserEvents();
      }

      function getProfileService ($http, dataservice, $stateParams) {
        return dataservice.getUserProfile($stateParams.username);
      }
  }

})();