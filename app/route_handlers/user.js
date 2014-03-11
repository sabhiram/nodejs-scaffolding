module.exports = function(log, User, passport) {
    return {
        login: function(request, response, next) {
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
                    return response.redirect("/account");
                });
            })(request, response, next);
        },
        signup: function(request, response, next) {
            var user_info = request.body;
            // This is horrendous... fix this eventually
            if(!user_info.password_1.match(user_info.password_2)) {
                request.session.messages = ["Provided passwords do not match! Try again!"];
                return response.redirect("/signup");
            }
            var new_user = new User({
                username: user_info.username,
                email: user_info.email,
                password: user_info.password_1
            });
            new_user.save(function(error) {
                if(!error) {
                    log.info("New user " + request.body.username + " saved");
                    return response.redirect("/account");
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