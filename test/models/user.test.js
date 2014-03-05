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
describe("[Models] - User registration, finding users", function() {
    //
    // Setup
    //
    before(function(done) {
        Mongoose.connect("mongodb://172.12.8.155/user_test");
        // Lets seed the db with a test user
        var test_user = new User({
            username: "test_user",
            email: "test_user@test.com",
            crypted_pw: "password"
        });
        test_user.save(function(error) {
            should.equal(error, null);
            done();
        });
    });

    //
    // Cleanup
    //
    after(function(done) {
        User.remove({}, function() {
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

    // Validate that the test user is in the system
    // find using the username
    it("find test_user by username", function(next_test) {
        User.findOne({username: "test_user"}, function(error, user) {
            user.username.should.match("test_user");
            user.email.should.match("test_user@test.com");
            user.crypted_pw.should.not.match("password");
            next_test(error);
        });
    });

    // Validate that test_user can be found using email
    it("find test_user by email", function(next_test) {
        User.findOne({email: "test_user@test.com"}, function(error, user) {
            user.username.should.match("test_user");
            user.email.should.match("test_user@test.com");
            user.crypted_pw.should.not.match("password");
            next_test(error);
        });
    });

    // Validate that invalid_user is not in the system
    it("find invalid user should fail", function(next_test) {
        User.findOne({username: "invalid_user"}, function(error, user) {
            should.equal(error, null);
            should.equal(user, null);
            next_test(error);
        });
    });

    // Create a new user
    it("Add a new user", function(next_test) {
        var new_user = new User({
            username: "philip",
            email: "philip@test.com",
            crypted_pw: "putter"
        });
        new_user.save(function(error) {
            should.equal(error, null);
            next_test(error);
        });
    });

    // Create user without email should fail
    it("Add a new user without a username", function(next_test) {
        var new_user = new User({
            email: "philip@test.com",
            crypted_pw: "putter"
        });
        new_user.save(function(error) {
            error.name.should.match("ValidationError");
            error.errors.username.path.should.match("username");
            next_test();
        });
    });

    // Create user without email should fail
    it("Add a new user without email", function(next_test) {
        var new_user = new User({
            username: "philip",
            crypted_pw: "putter"
        });
        new_user.save(function(error) {
            error.name.should.match("ValidationError");
            error.errors.email.path.should.match("email");
            next_test();
        });
    });

    // Create user without password should fail
    it("Add a new user without password", function(next_test) {
        var new_user = new User({
            username: "philip",
            email: "philip@test.com"
        });
        new_user.save(function(error) {
            error.name.should.match("ValidationError");
            error.errors.crypted_pw.path.should.match("crypted_pw");
            next_test();
        });
    });

    // Ensure philip exists in db
    it("Verify new user", function(next_test) {
        User.findOne({
            username: "philip",
            email: "philip@test.com"
        }, function(error, user) {
            should.equal(error, null);
            user.username.should.match("philip");
            user.email.should.match("philip@test.com");
            user.crypted_pw.should.not.match("putter");
            next_test(error);
        });
    });

    // Re-adding an existing user should fail
    it("Re-save existing user should fail", function(next_test) {
        var existing_user = new User({
            username: "philip",
            email: "philip2@test.com",
            crypted_pw: "driver"
        });
        existing_user.save(function(error) {
            error.code.should.eql(11000);
            error.name.should.match("MongoError");
            error.err.should.startWith("E11000 duplicate key error");
            next_test();
        });
    });
});
