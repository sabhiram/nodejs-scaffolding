var
    User            = require("../models/user"),

    // passport - 
    //     A session / p/w manager which can sit on top of a mongodb
    //     user database to provide auth as express middleware
    passport        = require("passport"),
    LocalStrategy   = require("passport-local").Strategy;

// Teach passport how to identify an "ordering" in
// users (ala - tell it what property of the "user"
// is unique to a user)
passport.serializeUser(function(user, callback) {
    callback(null, user.id);
});

// Teach passport also how to go from a unique user
// id to the appropriate user model
passport.deserializeUser(function(id, callback) {
    User.findById(id, function(error, user) {
        callback(error, user);
    });
});

// Configure passport to use the local strategy
passport.use(new LocalStrategy(function(username, password, callback) {
    User.findOne({username: username}, function(error, user) {
        if(error) {
            return callback(error);
        }
        if(!user) {
            return callback(null, false, {message: "Unknown user " + username});
        }
        user.compare_password(password, function(error, match) {
            if(error) {
                return callback(error);
            }
            if(match) {
                return callback(null, user);
            } else {
                return callback(null, false, {message: "Invalid password"});
            }
        });
    });
}));

module.exports = passport;