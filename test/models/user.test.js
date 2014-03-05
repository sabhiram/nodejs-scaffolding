var
    should      = require("should"),
    mongoose    = require("mongoose"),
    User        = require("../../app/models/user");

// Note: Some of these tests will make expectations based on (seemingly)
//       arbitary error codes. These are documented here if they are 
//       related to Mongo: http://www.mongodb.org/about/contributors/error-codes/
mongoose.connection.on("error", function(error) {
    console.log("mongoose error: " + error);
});

// Test group to validate the user model
// These tests have base expectations on how they are ordered since
// some of them check for existence of users, and others create users
describe("User Model Tests", function() {
    //
    // Setup (run once, before all the tests)
    //
    before(function(done) {
        mongoose.connect("mongodb://172.12.8.155/user_test");
        // Lets seed the db with a test user
        var test_user = new User({
            username:   "test_user",
            email:      "test_user@test.com",
            password:   "password"
        });
        test_user.save(function(error) {
            should.equal(error, null);
            done();
        });
    });

    //
    // Cleanup (run once after all the tests)
    //
    after(function(done) {
        User.remove(function(error) {
            mongoose.connection.close();
            done();
        });
    });


    // Tests for finding users. Validates various things like looking
    // up users using email, username, etc. As well as negative cases
    // like looking up invalid users.
    describe("Find users", function() {
        // Validate that the test user is in the system
        // find using the username
        it("find test_user by username", function(next_test) {
            User.findOne({username: "test_user"}, function(error, user) {
                user.username.should.match("test_user");
                user.email.should.match("test_user@test.com");
                user.password.should.not.match("password");
                next_test(error);
            });
        });

        // Validate that test_user can be found using email
        it("find test_user by email", function(next_test) {
            User.findOne({email: "test_user@test.com"}, function(error, user) {
                user.username.should.match("test_user");
                user.email.should.match("test_user@test.com");
                user.password.should.not.match("password");
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
    });


    // Tests for adding new users. Validate things like adding a new
    // user to the db. Adding an exising user to the db (negative case) 
    describe("Add users", function() {

        // Create a new user
        it("Add a new user", function(next_test) {
            var new_user = new User({
                username:   "philip",
                email:      "philip@test.com",
                password:   "putter"
            });
            new_user.save(function(error) {
                should.equal(error, null);
                next_test(error);
            });
        });

        // Create user without email should fail
        it("Add a new user without a username", function(next_test) {
            var new_user = new User({
                email:      "philip@test.com",
                password:   "putter"
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
                username:   "philip",
                password:   "putter"
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
                username:   "philip",
                email:      "philip@test.com"
            });
            new_user.save(function(error) {
                error.name.should.match("ValidationError");
                error.errors.password.path.should.match("password");
                next_test();
            });
        });

        // Ensure philip exists in db
        it("Verify new user", function(next_test) {
            User.findOne({
                username:   "philip",
                email:      "philip@test.com"
            }, function(error, user) {
                should.equal(error, null);
                user.username.should.match("philip");
                user.email.should.match("philip@test.com");
                user.password.should.not.match("putter");
                next_test(error);
            });
        });

        // Re-adding an existing user should fail
        it("Re-save existing user should fail", function(next_test) {
            var existing_user = new User({
                username:   "philip",
                email:      "philip2@test.com",
                password:   "driver"
            });
            existing_user.save(function(error) {
                error.code.should.eql(11000);
                error.name.should.match("MongoError");
                error.err.should.startWith("E11000 duplicate key error");
                next_test();
            });
        });

    });


    // Test to validate the compare_password method. This is important because
    // we need to apply a simple function to deduce if the attempted p/w
    // matches what we salted and hashed when the user created / changed their
    // password.
    describe("Compare Passwords", function() {

        // Validate that the compare_assword function works
        it("valid password", function(next_test) {
            User.findOne({username: "test_user"}, function(error, user) {
                user.compare_password("password", function(error, match) {
                    match.should.be.true;
                    user.username.should.match("test_user");
                    user.email.should.match("test_user@test.com");
                    user.password.should.not.match("password");
                    next_test(error);
                });
            });
        });

        // Validate that the compare_assword function rejects a bad
        // password
        it("invalid password", function(next_test) {
            User.findOne({username: "test_user"}, function(error, user) {
                user.compare_password("PASSWORD", function(error, match) {
                    match.should.be.false;
                    user.username.should.match("test_user");
                    user.email.should.match("test_user@test.com");
                    user.password.should.not.match("password");
                    next_test(error);
                });
            });
        });

    });

});


