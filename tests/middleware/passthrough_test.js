var
    should      = require("should"),
    request     = require("supertest");


describe("Test the passthrough function", function() {
    var passthrough;

    before(function() {
        passthrough = require("../../app/middleware/passthrough");
    });

    it("passthrough should route to next function", function(next_test) {
        passthrough(null, null, function() {
            next_test();
        });
    });

    it("passthrough should route multiple times", function(next_test) {
        passthrough(null, null, function() {
            passthrough(null, null, function() {
                next_test();
            });
        });
    });
});


describe("Test the passthrough middleware to random page", function() {
    var passthrough,
        app,
        port,
        http_server,
        express;

    before(function(callback) {
        passthrough = require("../../app/middleware/passthrough");
        express     = require("express");
        app         = express();
        port        = 8338;
        
        // Add definition for some insane route that will never be hit so we
        // can test and make sure passthrough gets to the last function
        app.get("/F12ja0FXA3hjf03h393bhc/falksjf093/ah23e9202ejd90", passthrough, passthrough, function(request, response) {
            response.send("SUCCESS", 200);
        });
        app.get("*", passthrough, passthrough, function(request, response) {
            response.send("ERROR", 404);
        });
        
        // Some settings for the express app
        app.use(express.json());
        app.use(express.urlencoded());

        // Listen using the server
        http_server = app.listen(port, function(error, result) {
            callback(error);
        });
    });

    after(function() {
        http_server.close();
    });

    it("passthrough to pre-defined route should work", function(next_test) {
        request(app)
            .get("/F12ja0FXA3hjf03h393bhc/falksjf093/ah23e9202ejd90")
            .expect(200)
            .end(function(error, response) {
                should.equal(error, null);
                response.should.not.match("SUCCESS");
                next_test();
            });
    });

    it("passthrough to un-defined route should 404", function(next_test) {
        request(app)
            .get("foobar")
            .expect(404)
            .end(function(error, response) {
                next_test();
            });
    });
});