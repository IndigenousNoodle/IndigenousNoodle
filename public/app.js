(function(){
  angular.module('app', [
    'app.navbar',
    'app.createEvent',
    'app.signupLogin',
    'ui.router',
    'ui.bootstrap',
    'app.eventsDisplay',
    'gm.datepickerMultiSelect',
    'eventList',
    'homepage',
    'app.eventManager',
    'app.userProfile',
    'app.eventDetail',
    'app.dataservice',
    'app.profilePage',
    'uiGmapgoogle-maps',
    'ngAnimate',
    'app.maps',
    'message',
    'messageList',
    'ngMaterial',
    'ngMdIcons'
    ])
  .config(router)
  .run(requireUserSignin)

  .directive('pagination', function($parse){
    return {
      restrict: 'A',
      template: '',
      scope: {
        limit: '=limit'
      },
      link: function(scope, elem, attrs) {
        var dataExpr = $parse(attrs.data);
        scope.$watchCollection(dataExpr, function(val) {
          scope.data = val;
        });
      }
    }
  })

  router.$inject = ['$urlRouterProvider', '$stateProvider', '$httpProvider'];

  function router($urlRouterProvider, $stateProvider, $httpProvider) {
    $urlRouterProvider.otherwise("/");

    // paths
    $stateProvider
      .state('homepage',{
        url: '/',
        templateUrl: './homepage/homepageTemplate.html',
        controller: 'homepageController',
        controllerAs: 'home'
      })
      .state('message', {
        url: '/message/:receiver',
        templateUrl: './messagePage/messagePageTemplate.html',
        controller: 'messageController',
        controllerAs: 'message',
        resolve: {
          getUsername: getUsername,
          getMessages: getMessages,
          getProfilePictures: getProfilePictures
        }
      })
      .state('messageList', {
        url: '/messageList',
        templateUrl: './messageListPage/messageListPageTemplate.html',
        controller: 'messageListController',
        controllerAs: 'messageList',
        resolve: {
          getAllMessages: getAllMessages
        }
      })
      .state('createEvent', {
        url: '/createEvent',
        templateUrl: './createEventPage/createEventTemplate.html',
        controller: 'createEventController',
        controllerAs: 'event'
      })
      .state('eventsDisplay', {
        url: '/eventsDisplay/:city',
        templateUrl: './eventsDisplayPage/eventsDisplayTemplate.html',
        controller: 'eventsDisplayController',
        controllerAs: 'eventsDisplay',
        resolve: {
          getEventList: getEventList
        }
      })
      .state('eventsDisplay.eventList', {
        url:'/eventList/:city',
        templateUrl: './eventsDisplayPage/eventListTemplate.html',
        controller: 'eventListController',
        controllerAs: 'eventList',
        resolve: {
          getEventList: getEventList
        }
      })
      .state('eventsDisplay.map', {
        url: '/map/:city',
        templateUrl: './eventsDisplayPage/mapsTemplate.html',
        controller: 'mapsController',
        controllerAs: 'map',
        resolve: {
          getMaps: getMaps,
          getCity: getCity,
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
          getProfilePrep: getProfileService,
          getPublicUserReviewsServicePrep: getPublicUserReviewsService
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
          getUserProfilePrep: getUserProfileService,
          getUserReviewsServicePrep: getUserReviewsService
        }
      })

      // resolve functions
      function getAllMessages($http, messagesService) {
        return messagesService.getAllMessages();
      }
      function getMessages($http, messagesService, $stateParams) {
        return messagesService.getMessages($stateParams.receiver);
      }
      function getUsername($http, usersService) {
        return usersService.getUsername();
      }
      function getEventList($http, $stateParams, eventsService) {
        return eventsService.getEventList($stateParams.city);
      }
      function getEventsService ($http, usersService) {
        return usersService.getUserEvents();
      }
      function getProfileService ($http, $stateParams, usersService) {
        return usersService.getUserProfile($stateParams.username);
      }
      function getPublicUserReviewsService ($http, $stateParams, reviewService) {
        console.log($stateParams.username);
        return reviewService.getPublicReviews($stateParams.username);
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
        return usersService.getProfile();
      }
      function getMaps (googleMap){
        return googleMap.getMapApi();
      }
      function getCity($stateParams){
        return $stateParams.city;
      }
      function getUserReviewsService (reviewService) {
        return reviewService.getReviews();
      }
      function getProfilePictures($http, messagesService, $stateParams) {
        console.log('first')
        return messagesService.getProfilePictures($stateParams.receiver);
      }

    // token authentication
    $httpProvider.interceptors.push('AttachTokens');
  
  }

    requireUserSignin.$inject = ['$rootScope','$state', '$window', 'Auth'];

    // for .run() module, ask user to sign in if user is not signed in
    function requireUserSignin($rootScope, $state, $window, Auth) {
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $window.scrollTo(0,0);

        if(toState.url === '/eventDetail/:eventId' && !Auth.isAuth()) {
          event.preventDefault();
          $state.go('signin');
        }
        if(toState.url === '/profilePage' && !Auth.isAuth()) {
          event.preventDefault();
          $state.go('signin');
        }
        if(toState.url === '/hostedEvents' && !Auth.isAuth()) {
          event.preventDefault();
          $state.go('signin');
        }
        if(toState.url === '/joinedEvents' && !Auth.isAuth()) {
          event.preventDefault();
          $state.go('signin');
        }
        if(toState.url === '/messageList' && !Auth.isAuth()){
          event.preventDefault();
          $state.go('signin');
        }
        if(toState.url === '/createEvent' && !Auth.isAuth()){
          event.preventDefault();
          $state.go('signin');
        }
      });
    }

})();



