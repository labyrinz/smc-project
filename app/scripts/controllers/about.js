'use strict';

/**
 * @ngdoc function
 * @name smcApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the smcApp
 */
angular.module('smcApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
