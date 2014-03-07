/*****************************************************************************\
    Application Requires the following modules
\*****************************************************************************/
var
    // Underscore.js - http://underscorejs.org/
    //     Utility module for NodeJS with awesome helpers for
    //     working with collections, lists, and higer order functions 
    _               = require("underscore")._,
    
    // Async - https://github.com/caolan/async
    //     Async utility module, very useful for things like avoiding
    //     excessively nested callbacks. Allows for easier control flow
    //     of async code
    async           = require("async"),
    
    // nconf - https://github.com/flatiron/nconf
    //     Config utility for NodeJS which is useful for loading global
    //     configuration settings from a settings file (for ex)
    nconf           = require("nconf"),
    
    // express - http://expressjs.com/
    //     A web framework for node, provides easy ways to manage 
    //     a web application"s routes, etc
    express         = require("express"),

    // Load the user model
    User            = require("./app/models/user"),
    
    // Other commonly used NodeJS modules
    mongoose        = require("mongoose"),
    util            = require("util"),
    fs              = require("fs"),
    path            = require("path");


/*****************************************************************************\
    Setup Logging
\*****************************************************************************/
// Create logs folder if it does not exist
// The *only* reason this is using a *Sync call is due to the
// fact that this only occurs on server startup and can afford
// to be a blocking call. The last thing we want in our server
// a stupid blocking call causing our requests to get queued up.
// So again, only do this while initializing the server, matter
// of fact, I probably should remove this crap...
if(!fs.existsSync("./logs")) {
    fs.mkdirSync("./logs");
}


// Since we have a common logs folder for our logs, we can encapsulate
// the loggers settings in a logger.js file, and pass the path to the
// logs dir while requiring the logger module. This way all modules
// can log to a consistent location.
var logs_path = path.join(__dirname, "logs");
var log = require("./app/logger.js")(logs_path);


// Configure passport to use the local strategy etc
var passport = require("./app/config/passport.config");


/*****************************************************************************\
    Application Globals
\*****************************************************************************/
var helpers = require("./app/helper_functions.js"),
    args = {
        port:       process.env.PORT || 1234,
        version:    "0.0.1",
        name:       "NodeJS Scaffolding"
    },
    handlers = {
        view: {
            home: function(request, response) {
                response.render("index", { user: request.user });
            },
            login: function(request, response) {
                response.render("login", { user: request.user, message: request.session.messages });
            },
            account: function(request, response) {
                response.render("account", { user: request.user });
            },
            error: function(request, response) {
                log.warn("404 page invoked due to some error!");
                response.send(404, "Umm, this is an error page... what the heck are you looking for?");
            },
        },
        user: {
            login: function(request, response, next) {
                passport.authenticate("local", function(error, user, info) {
                    if(error) {
                        return next(error);
                    }
                    if(!user) {
                        request.session.messages = [info.message];
                        return response.redirect("/login");
                    }
                    request.logIn(user, function(error) {
                        if(error) {
                            return next(error);
                        }
                        return response.redirect("/account");
                    });
                })(request, response, next);
            },
            logout: function(request, response) {
                // Log the authenticated user out of the system
                request.logout();

                // Redirect to the home page
                response.redirect("/");
            }
        }
    },
    middleware = {
        passthrough:            require("./app/middleware/passthrough"),
        ensure_authenticated:   require("./app/middleware/ensure_authenticated")
    };


/*****************************************************************************\
    Initialize Server
\*****************************************************************************/
// Connect to the user db using mongoose
mongoose.connect("mongodb://172.12.8.155/userdb");

// Create and configure an express app
var app = require("./app/config/app.config")(express(), passport);

// Configure application routes and fetch our API object which
// just contains the TYPE, url and description of the things
// we implement.
require("./app/routes.js")(app, passport, middleware, handlers);

// Launch Server
app.listen(args.port);
log.info("Server up at: " + new Date());
log.info("... running on port: " + args.port);


// Test code to add / remove users.
// (new User({username: "phil", password: "secret", email: "phil@email.com"})).save(function(error) {
//     if(error) console.log(error);
//     else console.log("Saved user phil");
// });
// User.remove({}, function(error) {
//     // REMOVED ALL USERS
// });


// This is done so that we can require, and test this app
module.exports = app;