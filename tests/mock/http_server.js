/*****************************************************************************\
    Mock Server. Used for testing routes and etc
\*****************************************************************************/
var express = require("express");

function MockServer(routes) {
    this.app    = express();
    for(var http_type in routes) {
        for(var idx in routes[http_type]) {
            var route       = routes[http_type][idx];
            var middleware  = routes[http_type][idx].middleware || [];
            var callback    = routes[http_type][idx].callback || function(request, response) {
                response.send(route.return_code, route.return_message);
            };

            if(http_type == "GET") {
                this.app.get(route.url, middleware, callback);
            } else if(http_type == "POST") {
                this.app.post(route.url, middleware, callback);
            } else if(http_type == "PUT") {
                this.app.put(route.url, middleware, callback);
            } else if(http_type == "DELETE") {
                this.app.delete(route.url, middleware, callback);
            }
        }
        // Setup 404 page for all other GETs
        this.app.get("*", function(request, response) {
            response.send(404, "Error, undefined route.");
        });
    }

    // This needs to be exposed so that the calling test / etc can use this
    // to listen on whatever port. Then they can also control the close() of
    // the http_server which is created when we end up listening on the "app"
    this.get_app = function() {
        return this.app;
    }
}

module.exports = MockServer;