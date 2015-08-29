angular.module('app', [
  'app.navbar',
  'app.createEvent',
  'ui.router',
  'ui.bootstrap',
  'homepage',
  'eventList'
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
        getEventList: function($http, $stateParams) {
          return $http({method: 'GET', url: '/events/' + $stateParams.city})
        }
      }
    })
}

