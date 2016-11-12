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
          'url': 'http://lab.rtve.es/webdocs/xavier-cugat/',
          'text': 'Sexo, Maracas y Chihuahuas: La increíble vida de Xavier Cugat',
          'via': '',
          'hashtags': 'XavierCugatRTVE',
          'trigger': 'click',
          'popupHeight': 800,
          'popupWidth' : 400
        }
      },
      {
        'provider': 'facebook',
        'conf': {
          'url': 'http://lab.rtve.es/webdocs/xavier-cugat/#/',
          'trigger': 'click',
          'popupHeight': 800,
          'popupWidth' : 400
        }
      }
    ]);
  }]);
