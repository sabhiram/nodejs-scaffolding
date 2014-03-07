var
    // mongoose - 
    //     A node module to interface w/ mongoDB
    mongoose        = require("mongoose"),
    
    // bcrypt -
    //     Someone say crypto?
    bcrypt          = require("bcrypt"),
    
    // Other utils
    async           = require("async"),

    // Globals
    SALT_FACTOR     = 10;


// Define the user schema
var UserSchema = mongoose.Schema({
    username: {
        type:       String,
        required:   true,
        unique:     true
    },
    email: {
        type:       String,
        required:   true,
        unique:     true
    },
    password: {
        type:       String,
        required:   true
    }
});

// Attach a custom handler on the save event which hashes
// the users password if it has changed
UserSchema.pre("save", function(callback) {
    var _current_user = this;

    // Do nothing if the p/w is the same
    if(_current_user.isModified("password") === false) {
        return callback();
    }
    
    // Store the p/w after hashing it
    async.waterfall([
        // Generate salt
        function generate_salt(next) {
            bcrypt.genSalt(SALT_FACTOR, next);
        },
        function hash_pw(salt, next) {
            bcrypt.hash(_current_user.password, salt, next);
        },
        function set_pw(hash, next) {
            _current_user.password = hash;
            next();
        },
    ], function(error, result) {
        callback(error);
    });
});

// Define a compare_password method which allows us to check a
// password attempt against the user database with ease.
UserSchema.methods.compare_password = function(password_attempt, callback) {
    bcrypt.compare(password_attempt, this.password, function(error, match) {
        callback(error, match);
    });
};

module.exports = mongoose.model("User", UserSchema);