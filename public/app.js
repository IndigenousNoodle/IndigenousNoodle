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
    'app.eventDetail',
    'app.dataservice',
    'app.profilePage',
    'ngAnimate'
    ])
  .config(router)
  .run(requireUserSignin)

  router.$inject = ['$urlRouterProvider', '$stateProvider', '$httpProvider'];
  requireUserSignin.$inject = ['$rootScope','$state', 'Auth'];

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
      ///////////////////////////////////////////////////////
      .state('requireSignin', {
        url: '/require',
        templateUrl: './signupLogin/requireTemplate.html',
        controller: 'signupLoginController',
        controllerAs: 'signupLogin'
      })
      ///////////////////////////////////////////////////////
      .state('eventManager', {
        url: '/events/eventManager',
        templateUrl: './eventManager/eventManagerTemplate.html'
      })
      .state('eventManager.joinedEvents', {
        url: '/joinedEvents',
        templateUrl: './eventManager/eventManagerJoinedTemplate.html',
        controller: 'eventManagerJoinedController',
        controllerAs: 'event',
        resolve: {
          getJoinedEventsPrep: getJoinedEventsService
        }
      })
      .state('eventManager.hostedEvents', {
        url: '/hostedEvents',
        templateUrl: './eventManager/eventManagerHostedTemplate.html',
        controller: 'eventManagerHostedController',
        controllerAs: 'event',
        resolve: {
          getHostedEventsPrep: getHostedEventsService
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
      .state('profilePage', {
        url: '/profilePage',
        templateUrl: './profilePage/profilePageTemplate.html',
        controller: 'profilePageController',
        controllerAs: 'user',
        resolve: {
          getUserProfilePrep: getUserProfileService
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
      function getEvent($http, $stateParams, eventsService){
        return eventsService.getEvent($stateParams.eventId);
      }
      function getJoinedEventsService ($http, usersService) {
        return usersService.getJoinedEvents();
      }
      function getHostedEventsService ($http, usersService) {
        return usersService.getHostedEvents();
      }
      function getUserProfileService ($http, usersService) {
        return usersService.getProfile()
      }

      $httpProvider.interceptors.push('AttachTokens');
    }

    // for .run() module, ask user to sign in if user is not signed in
    function requireUserSignin($rootScope, $state, Auth) {
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if(toState.url === '/eventDetail/:eventId' && !Auth.isAuth()) {
          event.preventDefault();
          $state.go('signin');
        }
        if(toState.url === '/profilePage' && !Auth.isAuth()) {
          event.preventDefault();
          $state.go('signin');
        }
        if(toState.url === '/events/eventManager' && !Auth.isAuth()) {
          event.preventDefault();
          $state.go('signin');
        }
      });
    }

})();



