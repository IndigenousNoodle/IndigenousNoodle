(function(){
  angular.module('app', [
    'app.navbar',
    'app.createEvent',
    'app.signupLogin',
    'app.factories',
    'ui.router',
    'ui.bootstrap',
    'eventList',
    'homepage',
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
      .state('eventList', {
        url:'/eventList/:city',
        templateUrl: './eventListPage/eventListTemplate.html',
        controller: 'eventListController',
        controllerAs: 'eventList',
        resolve: {
          getEventList: getEventList
        }
      })
      .state('signup',{
        url: '/signup',
        templateUrl: './signupLogin/signupTemplate.html',
        controller: 'signupLoginController',
        controllerAs: 'signupLogin'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: './signupLogin/signinTemplate.html',
        controller: 'signupLoginController',
        controllerAs: 'signupLogin'
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
      function getEventList($http, $stateParams, dataservice) {
        return dataservice.getEventList($stateParams.city);
      }
      function getEventsService ($http) {
        return $http({method: 'GET', url: '/user/eventsManager'});
      }
      function getProfileService ($http, $stateParams) {
        return $http({method: 'GET', url: 'user/userProfile/' + $stateParams.username})
      }

      $httpProvider.interceptors.push('AttachToken');
    }
})();
