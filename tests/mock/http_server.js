/*****************************************************************************\
    Mock Server. Used for testing routes and etc
\*****************************************************************************/
var
    express = require("express"),
    _       = require("underscore")._;

function MockServer(routes) {
    this.app = express();
    for(var http_type in routes) {
        _.each(routes[http_type], function(route) {
            var url         = route.url;
            var return_code = route.return_code || 200;
            var msg         = route.return_message || "";
            var middleware  = route.middleware || [];
            var callback    = route.callback || function(request, response) {
                response.send(return_code, msg);
            };
            if(http_type == "GET") {
                this.app.get(url, middleware, callback);
            } else if(http_type == "POST") {
                this.app.post(url, middleware, callback);
            } else if(http_type == "PUT") {
                this.app.put(url, middleware, callback);
            } else if(http_type == "DELETE") {
                this.app.delete(url, middleware, callback);
            }
        }, this);

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