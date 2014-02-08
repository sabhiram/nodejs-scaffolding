var 
    /* 
    Argparse
        Port of the popular pythonic argument parsing 
        library.
    */
    ArgumentParser  = require('argparse').ArgumentParser,
    /*
    Underscore.js - http://underscorejs.org/
        Utility module for NodeJS with awesome helpers for
        working with collections, lists, and higer order functions 
    */
    _               = require('underscore')._,
    /*
    Async - https://github.com/caolan/async
        Async utility module, very useful for things like avoiding
        excessively nested callbacks. Allows for easier control flow
        of async code
    */
    async           = require('async'),
    /*
    nconf - https://github.com/flatiron/nconf
        Config utility for NodeJS which is useful for loading global
        configuration settings from a settings file (for ex)
    */
    nconf           = require('nconf'),
    /*
    express - http://expressjs.com/
        A web framework for node, provides easy ways to manage 
        a web application's routes, etc
    */
    express         = require('express'),
    /*
    Other commonly used NodeJS modules
    */
    util            = require('util'),
    path            = require('path');
    

var parser = new ArgumentParser({
    version:        '0.0.0',
    addHelp:        true,
    description:    'Starter NodeJS+Express project!'
});
parser.addArgument(['-p', '--port'], {help: 'Port to start server on', defaultValue: 1234, type: "int"});
var args = parser.parseArgs();
console.log(args)

/* 
Initialize application...
*/
async.series([
    // 1. Setup loggers
    function setup_loggers(next_cb) {
        console.log("setup_loggers");
        next_cb();
    },
    // 2. Parse arguments
    function parse_arguments(next_cb) {
        console.log("parse_arguments");
        next_cb();
    },
    // 3. Setup application routes
    function setup_routes(next_cb) {
        console.log("setup_routes");
        next_cb();
    },
], function(error) {
    if(error) {
        console.log('Error initializing server: ' + error);
    }
    else {
        console.log('Server up and running at: ' + new Date());
        // TODO: Listen w/ server here
    }    
});