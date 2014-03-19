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
var STATE = {
    // Enumerations of types of app state
    LOGIN:      {value: 0, name: "Login"},
    SIGNUP:     {value: 1, name: "Signup"},
    MAX_STATES: 2
};

// var PANES = {
//     USERNAME:       {value: 0, name: "username"},
//     EMAIL:          {value: 1, name: "email"},
//     PASSWORD:       {value: 2, name: "password"},
//     VERIFICATION:   {value: 3, name: "verification"},
//     LOGIN_BTN:      {value: 4, name: "login_btn"},
//     SUBMIT_BTN:     {value: 5, name: "submit_btn"},
//     NEW_ACCOUNT:    {value: 6, name: "new_account"},
//     LOGIN_INSTEAD:  {value: 7, name: "login_instead"},
//     FORGOT_PW:      {value: 8, name: "forgot_password"},
//     MAX_PANES:      9
// };

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
    
    console.log(_page_state_str);

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