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
    RESETPW:    {value: 2, name: "ResetPW"},
    MAX_STATES: 3
};

var PANES = {
    USERNAME:       {value: 0, name: "username"},
    EMAIL:          {value: 1, name: "email"},
    PASSWORD:       {value: 2, name: "password"},
    VERIFICATION:   {value: 3, name: "verification"},
    LOGIN_BTN:      {value: 4, name: "login_btn"},
    SUBMIT_BTN:     {value: 5, name: "submit_btn"},
    NEW_ACCOUNT:    {value: 6, name: "new_account"},
    LOGIN_INSTEAD:  {value: 7, name: "login_instead"},
    FORGOT_PW:      {value: 8, name: "forgot_password"},
    MAX_PANES:      9
};

app.controller('LoginController', function LoginController($scope, $injector, $http) {
    // Share the enums so that the page scope can access
    // the various enums by their name
    $scope.STATE = STATE;
    $scope.PANES = PANES;

    // Setup default page state. This is one of Login, 
    // Signup, or ResetPW. This variable keeps track of
    // what "type" of page this is.
    $scope.page_state = STATE.LOGIN;

    $scope.switch_state = function(target_state) {
        if(target_state.value >= 0 && target_state.value < STATE.MAX_STATES) {
            console.log("Switch state to: " + target_state.name);
            $scope.page_state = target_state;
        } else {
            console.log("ERROR: Unknown state: " + target_state);
        }
    };

    $scope.is_visible = function(pane_type) {
        var visible = false;
        if($scope.page_state.value == STATE.LOGIN.value) {
            visible =
                pane_type.value == PANES.USERNAME.value ||
                pane_type.value == PANES.PASSWORD.value ||
                pane_type.value == PANES.LOGIN_BTN.value ||
                pane_type.value == PANES.NEW_ACCOUNT.value ||
                pane_type.value == PANES.FORGOT_PW.value;
        }
        else if($scope.page_state.value == STATE.SIGNUP.value) {
            visible =
                pane_type.value == PANES.USERNAME.value ||
                pane_type.value == PANES.EMAIL.value ||
                pane_type.value == PANES.PASSWORD.value ||
                pane_type.value == PANES.VERIFICATION.value ||
                pane_type.value == PANES.SUBMIT_BTN.value ||
                pane_type.value == PANES.LOGIN_INSTEAD.value;
        }
        else if($scope.page_state.value == STATE.RESETPW.value) {
            visible =
                pane_type.value == PANES.USERNAME.value ||
                pane_type.value == PANES.LOGIN_INSTEAD.value;
        }
        else {
            console.log("Error: is_visible unable to be determined for: " + pane_type);
        }
        return visible;
    }

});