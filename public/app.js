angular.module('app', [
  'ui.router',
  'app.navbar',
  'app.createEvent'
  ])

.config(router)

router.$inject = ['$urlRouterProvider', '$stateProvider', '$httpProvider'];

function router($urlRouterProvider, $stateProvider, $httpProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('homepage',{
      url: '/',
      templateUrl: './homepage/homepageTemplate.html',
      controller: 'homepageController'
    })
    .state('createEvent', {
      url: '/createEvent',
      templateUrl: './createEventPage/createEventTemplate.html',
      controller: 'createEventController',
      controllerAs: 'event'
    })
}
