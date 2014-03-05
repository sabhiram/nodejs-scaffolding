var
    should      = require("should"),
    request     = require("supertest");

//
// Test group to validate the Mock http server by registering random
// GET / POST etc routes. 
//
describe("Mock HTTP Server Tests", function() {
    var
        app,
        server,
        mock_http_server;

    //
    // Setup
    //
    before(function(done) {
        var MockServer      = require("./http_server");
        mock_http_server    = new MockServer({
            GET: [
                { url: "/test1",        return_code: 200,   return_message: "SUCCESS1" },
                { url: "/test2",        return_code: 200,   return_message: "SUCCESS2" }
            ],
            POST: [
                { url: "/test_post",    return_code: 200,   return_message: "SUCCESS" }
            ]
        });
        app     = mock_http_server.get_app();
        server  = app.listen(8080);
        done();
    });

    //
    // Cleanup
    //
    after(function(done) {
        // Exit the mock server after we are done testing
        server.close();
        done();
    });

    //
    // Tests
    //
    it("app should exist", function(next_test) {
        should.exist(app);
        next_test();
    });

    it("server should exist", function(next_test) {
        should.exist(server);
        next_test();
    });


    // GET tests
    describe("GET", function() {

        it("GET /test1 - should succeed", function(next_test) {
            request(app)
                .get("/test1")
                .expect(200)
                .end(function(error, response) {
                    should.equal(error, null);
                    response.text.should.match("SUCCESS1");
                    next_test(error);
                });
        });

        it("GET /test2 - should succeed", function(next_test) {
            request(app)
                .get("/test2")
                .expect(200)
                .end(function(error, response) {
                    should.equal(error, null);
                    response.text.should.match("SUCCESS2");
                    next_test(error);
                });
        });

        it("GET /ishould404 - should 404", function(next_test) {
            request(app)
                .get("/ishould404")
                .expect(404)
                .end(function(error, response) {
                    should.equal(error, null);
                    // This check might be brittle, it will break when you change
                    // the message from the mock http_server.
                    response.text.should.match("Error, undefined route.");
                    next_test(error);
                });
        });

    });


    // POST tests
    describe("POST", function() {

        it("POST /test_post - with json should return SUCCESS", function(next_test) {
            request(app)
                .post("/test_post")
                .send({A: 1, B: 2, C: 3})
                .expect(200, "SUCCESS")
                .end(function(error, response) {
                    next_test(error);
                });
        });

    });


    // PUT tests
    describe("PUT", function() {
        
        xit("TODO: Validate PUT", function(next_test) {
            // TODO: Validate PUT with Mock HTTP Server
            next_test();
        });

    });

    // DELETE tests
    describe("DELETE", function() {
        
        xit("TODO: Validate DELETE", function(next_test) {
            // TODO: Validate DELETE with Mock HTTP Server
            next_test();
        });

    });
    
});