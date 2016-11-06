'use strict';

/**
 * @ngdoc overview
 * @name smcApp
 * @description
 * # smcApp
 *
 * Main module of the application.
 */
angular
  .module('smcApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    '720kb.socialshare'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(['socialshareConfProvider', function configApp(socialshareConfProvider) {

    socialshareConfProvider.configure([
      {
        'provider': 'twitter',
        'conf': {
          'url': 'http://www.ccma.cat/tv3/documentals/xavier-cugat/',
          'text': 'Sexe, Maraques i Chichuahues: La increïble vida de Xavier Cugat',
          'via': '',
          'hashtags': 'XavierCugatTV3',
          'trigger': 'click',
          'popupHeight': 800,
          'popupWidth' : 400
        }
      },
      {
        'provider': 'facebook',
        'conf': {
          'url': 'http://xaviercugat.ccma.cat/',
          'trigger': 'click',
          'popupHeight': 800,
          'popupWidth' : 400
        }
      }
    ]);
  }]);
