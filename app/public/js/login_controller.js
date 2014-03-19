'use strict';
//
// Global enums
//
var STATE = {
    // Enumerations of types of app state
    LOGIN:      {value: 0, name: "Login"},
    SIGNUP:     {value: 1, name: "Signup"},
    MAX_STATES: 2
};



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
    // Share the enums so that the page scope can access
    // the various enums by their name
    $scope.STATE = STATE;


    // Setup default page state. This is one of Login, 
    // Signup, or ResetPW. This variable keeps track of
    // what "type" of page this is.
    if(_page_state_str == "SIGNUP") {
        $scope.page_state = STATE.SIGNUP;
    } else {
        $scope.page_state = STATE.LOGIN;
    }
    
    
    // Load the messages passed in from the server into 
    // the scope and display them accordingly
    $scope.messages = _messages;


    $scope.switch_state = function(target_state) {
        if(target_state.value >= 0 && target_state.value < STATE.MAX_STATES) {
            console.log("Switch state to: " + target_state.name);
            $scope.page_state = target_state;
        } else {
            console.log("ERROR: Unknown state: " + target_state);
        }
    };

    $scope.is_visible = function(state_type) {
        return ($scope.page_state.value == state_type.value);
    }

});