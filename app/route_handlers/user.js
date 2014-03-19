var
    User    = require("../models/user"),
    Message = require("../message");

module.exports = function(log, passport) {
    return {

        login: function(request, response, next) {
            // Reset any session messages
            // TODO: Make this a middleware?
            request.session.messages = [];

            passport.authenticate("local", function(error, user, info) {
                if(error) {
                    log.error("Authentication error: " + error);
                    return next(error);
                }
                if(!user) {
                    request.session.messages = [new Message(Message.ERROR, "Bad username, or password")];
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
            // Reset any session messages
            request.session.messages = [];
            
            // Extract user info from the form
            var user_info = request.body;

            // This is horrendous... fix this eventually
            if(!user_info.password.match(user_info.verification)) {
                request.session.messages = [new Message(Message.ERROR, "Provided passwords do not match! Try again!")];
                return response.redirect("/signup");
            }

            // Create a new user
            var new_user = new User({
                username: user_info.username,
                email: user_info.email,
                password: user_info.password
            });

            // Save it to the DB
            new_user.save(function(error) {
                if(!error) {
                    log.info("New user " + request.body.username + " saved");
                    request.session.messages = [new Message(Message.SUCCESS, "Account created, please login to continue!")];
                    return response.redirect("/");
                } else {
                    log.error(error);
                    var msg = "Unknown error occured!";
                    if(error.code == 11000) {
                        msg = "User " + user_info.username + " already exists!"
                    }
                    request.session.messages = [new Message(Message.ERROR, "Error saving user to db. " + msg)];
                    return response.redirect("/signup");
                }
            });
        },

        logout: function(request, response) {
            // Reset any sesison messages
            request.session.messages = [];

            // Log the authenticated user out of the system
            request.logout();

            // Redirect to the home page
            response.redirect("/");
        }
    };
};