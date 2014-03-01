var
    should      = require("should"),
    request     = require("supertest");


describe("[Middleware] - passthrough", function() {
    var passthrough;

    before(function() {
        passthrough = require("../../app/middleware/passthrough");
    });

    it("should route to next function", function(next_test) {
        passthrough(null, null, function() {
            next_test();
        });
    });

    it("should route multiple times", function(next_test) {
        passthrough(null, null, function() {
            passthrough(null, null, function() {
                next_test();
            });
        });
    });
});


describe("[Middleware] - passthrough + MockServer", function() {
    var passthrough,
        app,
        server,
        mock_http_server;

    before(function(callback) {
        passthrough             = require("../../app/middleware/passthrough");
        var MockServer          = require("../mock/http_server");
        mock_http_server        = new MockServer({
            GET: [
                {
                    url:            "/test1",
                    return_code:    200,
                    return_message: "SUCCESS",
                    middleware: [passthrough, passthrough, passthrough]
                }
            ]
        });
        app     = mock_http_server.get_app();
        server  = app.listen(8080);
        callback();
    });

    after(function() {
        server.close();
    });

    it("passthrough to pre-defined route should work", function(next_test) {
        request(app)
            .get("/test1")
            .expect(200)
            .end(function(error, response) {
                should.equal(error, null);
                response.text.should.match("SUCCESS");
                next_test();
            });
    });

    it("passthrough to un-defined route should 404", function(next_test) {
        request(app)
            .get("ishould404")
            .expect(404)
            .end(function(error, response) {
                should.equal(response, null);
                error.code.should.match("ECONNREFUSED");
                next_test();
            });
    });
});