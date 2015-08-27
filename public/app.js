angular.module('app', [
  'app.navbar',
  'app.createEvent',
  'ui.router',
  'ui.bootstrap',
  'homepage',
  'eventList',
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
    function getEventList($http, $stateParams, dataservice) {
      return dataservice.getEventList($stateParams.city);
    }
    .state('signup',{
      url: '/signup',
      templateUrl: './signup/signupTemplate.html',
      controller: 'signupController'
    })
}
