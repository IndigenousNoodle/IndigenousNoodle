(function(){
  angular.module('app', [
    'app.navbar',
    'app.createEvent',
    'app.signupLogin',
    'ui.router',
    'ui.bootstrap',
    'eventList',
    'homepage',
    'app.eventManager',
    'app.userProfile',
    'app.dataservice',
    'app.eventDetail',
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
      .state('eventManager.joinedEvents', {
        url: '/joinedEvents',
        templateUrl: './eventManager/eventManagerJoinedTemplate.html',
        controller: 'eventManagerController',
        controllerAs: 'event',
        resolve: {
          getEventsPrep: getEventsService
        }
      })
      .state('eventManager.hostedEvents', {
        url: '/hostedEvents',
        templateUrl: './eventManager/eventManagerHostedTemplate.html',
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
      .state('eventDetail', {
        url: '/eventDetail/:eventId',
        templateUrl: './eventDetailPage/eventDetailTemplate.html',
        controller: 'eventDetailController',
        controllerAs: 'event',
        resolve: {
          getEvent: getEvent
        }
      })
      function getEventList($http, $stateParams, eventsService) {
        return eventsService.getEventList($stateParams.city);
      }
      function getEventsService ($http, usersService) {
        return usersService.getUserEvents();
      }
      function getProfileService ($http, $stateParams, usersService) {
        return usersService.getUserProfile($stateParams.username);
      }
      function getEvent($http, $stateParams, dataservice){
        console.log("$stateParams", $stateParams);
        return dataservice.getEvent($stateParams.eventId);
      }

      $httpProvider.interceptors.push('AttachTokens');
    }
})();
