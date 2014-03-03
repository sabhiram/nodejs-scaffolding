var
    should      = require("should"),
    request     = require("supertest");

describe("[Mock] - Mock HTTP Server", function() {
    var app,
        server,
        mock_http_server;

    before(function(callback) {
        var MockServer      = require("./http_server");
        mock_http_server    = new MockServer({
            GET: [
                {
                    url:            "/test1",
                    return_code:    200,
                    return_message: "SUCCESS1"
                },
                {
                    url:            "/test2",
                    return_code:    200,
                    return_message: "SUCCESS2"
                }
            ],
            POST: [
                {
                    url:            "/test_post",
                    return_code:    200,
                    return_message: "SUCCESS"
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

    it("test mock GET route", function(next_test) {
        request(app)
            .get("/test1")
            .expect(200)
            .end(function(error, response) {
                should.equal(error, null);
                response.text.should.match("SUCCESS1");
                next_test(error);
            });
    });

    it("test another mock GET route", function(next_test) {
        request(app)
            .get("/test2")
            .expect(200)
            .end(function(error, response) {
                should.equal(error, null);
                response.text.should.match("SUCCESS2");
                next_test(error);
            });
    });

    it("test invalid GET route", function(next_test) {
        request(app)
            .get("ishould404")
            .expect(404)
            .end(function(error, response) {
                should.equal(response, null);
                error.code.should.match("ECONNREFUSED");
                next_test();
            });
    });

    it("test mock POST route", function(next_test) {
        request(app)
            .post("/test_post")
            .send({A: 1, B: 2, C: 3})
            .expect(200, "SUCCESS")
            .end(function(error, response) {
                next_test(error);
            });
    })
});