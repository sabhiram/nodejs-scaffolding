'use strict';
//
// Angular stuff
//

var app = angular.module('NodeScaffold', [
    "ngAnimate"
]);

//
// LOGIN CONTROLLER
//
app.controller('LoginController', function LoginController($scope, $injector, $http) {
    $scope.foo = "bar";
});