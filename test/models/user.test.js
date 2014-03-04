var
    should      = require("should"),
    Mongoose    = require("mongoose"),
    User        = require("../../app/models/user");

// Note: Some of these tests will make expectations based on (seemingly)
//       arbitary error codes. These are documented here if they are 
//       related to Mongo: http://www.mongodb.org/about/contributors/error-codes/

//
// Test group to validate the user model
//
describe("[Models] - User registration", function() {
    //
    // Setup
    //
    before(function(done) {
        Mongoose.connect("mongodb://172.12.8.155/user_test");
        // Lets seed the db with a test user
        User.register("test@test.com", "9a$$w0Rd", function(error, user) {
            done(error);
        });
    });

    //
    // Cleanup
    //
    after(function(done) {
        User.model.remove({}, function() {
            Mongoose.connection.close();
            done();
        });
    });

    //
    // Tests
    //

    // Validate that the user model is not null
    it("user model should exist", function(next_test) {
        User.should.not.eql(null);
        next_test();
    });

    // Validate that a new user with a unique email can sign up
    it("register new user", function(next_test) {
        User.register("test2@test.com", "pa$Sw0rd", function(error, user) {
            should.equal(null, error);
            user.email.should.equal("test2@test.com");
            user.password.should.not.equal("pa$Sw0rd");
            next_test(error);
        });
    });

    // Validate that a new user with an already used email cannot
    // sign up
    it("fail registration if duplicate email is used", function(next_test) {
        User.register("test@test.com", "password", function(error, user) {
            error.code.should.eql(11000);
            error.name.should.match("MongoError");
            error.err.should.startWith("E11000 duplicate key error");
            should.equal(null, user);
            next_test();
        });
    });
});
