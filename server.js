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
    
    // Other commonly used NodeJS modules
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


/*****************************************************************************\
    Application Globals
\*****************************************************************************/
var helpers         = require("./app/helper_functions.js"),
    args            = {
        port:       process.env.PORT || 1234,
        version:    "0.0.1",
        name:       "NodeJS Scaffolding"
    },
    handlers        = {
        view: {
            home: function(request, response) {
                response.send("Hello from the home page!");
            },
            login: function(request, response) {
                response.send("Hello from the login page!");
            },
            error: function(request, response) {
                log.warn('404 page invoked due to some error!');
                response.send("Umm, this is an error page... what the heck are you looking for?");
            },
        }
    },
    middleware      = {
        passthrough: require("./app/middleware/passthrough")
    };


/*****************************************************************************\
    Initialize Server
\*****************************************************************************/
var app = express();

// Configure express application
app.configure(function() {
    // Setup app preferences
    app.use(express.cookieParser());

    // There is an issue which prevents express from using the bodyParser since
    // they have not migrated to Connect 3.0. See this post for more details:
    // http://stackoverflow.com/questions/19581146/how-to-get-rid-of-connect-3-0-deprecation-alert
    // app.use(express.bodyParser()); /* becomes */
    app.use(express.json());
    app.use(express.urlencoded());

    // Setup server side template engine
    app.set("view engine", "ejs");
});

// Configure application routes and fetch our API object which
// just contains the TYPE, url and description of the things
// we implement.
require("./app/routes.js")(app, middleware, handlers);

// Launch Server
app.listen(args.port);
log.info("Server up at: " + new Date());
log.info("... running on port: " + args.port);

// This is done so that we can require, and test this app
module.exports = app;