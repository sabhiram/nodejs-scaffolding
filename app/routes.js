/*
    Routes file which pairs our server's HTTP handlers
    to the ReSTy interface we provide...
*/
var 
    path        = require('path'),
    util        = require('util'),
    logs_path   = path.join('./', 'logs'),
    log         = require('./logger.js')(logs_path);


function append_to_api_object(type, url, description) {
    log.info(util.inspect({
        type:           type,
        url:            url,
        description:    description
    }));
}

function GET(app, url, routee, description) {
    append_to_api_object("GET", url, description);
    app.get(url, routee);
}

function POST(app, url, routee, description) {
    append_to_api_object("POST", url, description);
    app.post(url, routee);
}

function PUT(app, url, routee, description) {
    append_to_api_object("PUT", url, description);
    app.put(url, routee);
}

function DELETE(app, url, routee, description) {
    append_to_api_object("DELETE", url, description);
    app.delete(url, routee);
}


module.exports = function(app, handlers) {
    GET(app, '/', function(request, response) {
        log.info('HTTP GET /');
        response.send('Hello from the server!');
        response.end();
    }, 'The home page for our app!');

    GET(app, '/foo', function(request, response) {
        log.info('HTTP GET /foo');
        response.send('Foo from the server!');
        response.end();
    }, 'The foo page for our app!');

    GET(app, '/api', function(request, response) {
        log.info('HTTP GET /api');
        response.send("HELLO THERE API");
        response.end();
    }, 'The API Page');
};

