/*****************************************************************************\
    Application Requires the following modules
\*****************************************************************************/
var 
    // Underscore.js - http://underscorejs.org/
    //     Utility module for NodeJS with awesome helpers for
    //     working with collections, lists, and higer order functions 
    _               = require('underscore')._,
    
    // Async - https://github.com/caolan/async
    //     Async utility module, very useful for things like avoiding
    //     excessively nested callbacks. Allows for easier control flow
    //     of async code
    async           = require('async'),
    
    // nconf - https://github.com/flatiron/nconf
    //     Config utility for NodeJS which is useful for loading global
    //     configuration settings from a settings file (for ex)
    nconf           = require('nconf'),
    
    // express - http://expressjs.com/
    //     A web framework for node, provides easy ways to manage 
    //     a web application's routes, etc
    express         = require('express'),
    
    // Other commonly used NodeJS modules
    util            = require('util'),
    path            = require('path');


/*****************************************************************************\
    Application Globals
\*****************************************************************************/
var helpers         = require('./app/helper_functions.js'),
    args            = helpers.parse_application_arguments(),
    handlers        = {
    };


/*****************************************************************************\
    Initialize Server
\*****************************************************************************/
var app = express();

// Configure express application
app.configure(function() {
    // Setup app preferences
    app.use(express.cookieParser());
    app.use(express.bodyParser());

    // Setup server side template engine
    app.set('view engine', 'ejs');
});

// Configure application routes
require('./app/routes.js')(app, handlers);

// Launch Server
app.listen(args.port);
console.log('Server up at: ' + new Date());
console.log('... running on port: ' + args.port);


