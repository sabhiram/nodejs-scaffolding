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
    fs              = require('fs'),
    path            = require('path');


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
if(!fs.existsSync('./logs')) {
    fs.mkdirSync('./logs');
}
// Since we have a common logs folder for our logs, we can encapsulate
// the loggers settings in a logger.js file, and pass the path to the
// logs dir while requiring the logger module. This way all modules
// can log to a consistent location.
var log = require('./app/logger.js')('./logs');


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
log.info('Server up at: ' + new Date());
log.info('... running on port: ' + args.port);
log.error('ERROR STRING HERE');
log.warn('WARNING STRING HERE');
log.log('NORMAL STRING HERE');