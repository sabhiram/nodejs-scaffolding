var
    User = require("../models/user");

module.exports = function(log, passport) {
    return {
        login: function(request, response, next) {

            log.info("POST /LOGIN");

            passport.authenticate("local", function(error, user, info) {
                if(error) {
                    log.error("Authentication error: " + error);
                    return next(error);
                }
                if(!user) {
                    request.session.messages = [info.message];
                    log.info("Invalid username, routing to /login");
                    return response.redirect("/login");
                }
                request.logIn(user, function(error) {
                    if(error) {
                        log.error("Login error: " + error);
                        return next(error);
                    }
                    
                    // Since the login worked, redirect to home
                    return response.redirect("/")
                });
            })(request, response, next);
        },
        signup: function(request, response, next) {
            log.info("POST /SIGNUP");
            var user_info = request.body;

            // This is horrendous... fix this eventually
            if(!user_info.password.match(user_info.verification)) {
                request.session.messages = ["Provided passwords do not match! Try again!"];
                return response.redirect("/signup");
            }
            var new_user = new User({
                username: user_info.username,
                email: user_info.email,
                password: user_info.password
            });
            new_user.save(function(error) {
                if(!error) {
                    log.info("New user " + request.body.username + " saved");
                    request.session.messages = ["Account created, please login to continue!"];
                    return response.redirect("/");
                } else {
                    log.error(error);
                    request.session.messages = ["Error saving user to db.", error.err];
                    return response.redirect("/signup");
                }
            });
        },
        logout: function(request, response) {
            // Log the authenticated user out of the system
            request.logout();

            // Redirect to the home page
            response.redirect("/");
        }
    };
};