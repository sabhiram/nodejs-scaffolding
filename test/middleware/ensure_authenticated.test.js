var
    should      = require("should"),
    request     = require("supertest");

//
// Test group to validate the ensure_authenticated middleware
//
describe("Middleware Tests: Ensure Authenticated", function() {
    var
        auth,
        not_authd_request = { isAuthenticated: function() { return false; } };

    //
    // Setup
    //
    before(function(done) {
        auth = require("../../app/middleware/ensure_authenticated");
        done();
    });

    // 
    // Cleanup
    //
    after(function(done) {
        // do nothing
        done();
    });

    // Validate that authenticated requests route forward
    describe("Authenticated Request", function() {
        var request = { isAuthenticated: function() { return true; } };

        it("should route to next function, with an authenticated request", function(next_test) {
            auth(request, null, function() {
                next_test();
            });
        });

        it("should route multiple times", function(next_test) {
            auth(request, null, function() {
                auth(request, null, function() {
                    next_test();
                });
            });
        });
    });
    
    // Group to validate authentication middleware where the request
    // has not been authenticated. We use the Mock server to provide
    // routes to validate.
    describe("Non-Authenticated Request", function() {
        var app,
            server,
            mock_http_server;

        //
        // Setup
        //
        before(function(callback) {
            var MockServer = require("../mock/http_server");
            mock_http_server = new MockServer({
                GET: [
                    {
                        url:            "/target",
                        return_code:    200,
                        return_message: "TARGET",
                        middleware:     [auth]
                    },
                    {
                        url:            "/login",
                        return_code:    200,
                        return_message: "LOGIN"
                    }
                ]
            });
            app     = mock_http_server.get_app();
            server  = app.listen(8081);
            callback();
        });

        //
        // Cleanup
        //
        after(function(done) {
            server.close();
            done();
        });

        //
        // Tests
        //
        it("GET /login should work", function(next_test) {
            request(app)
                .get("/login")
                .expect(200)
                .end(function(error, response) {
                    should.equal(error, null);
                    response.text.should.match("LOGIN");
                    next_test(error);
                });
        });

        it("GET /target should redirect to /login", function(next_test) {
            request(app)
                .get("/target")
                .expect(302)
                .end(function(error, response) {
                    should.equal(error, null)
                    response.header.location.should.match("/login");
                    next_test(error);
                });
        });
    });

});
