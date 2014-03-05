var
    Mongoose        = require("mongoose"),
    Bcrypt          = require("bcrypt"),
    Async           = require("async"),
    SALT_FACTOR     = 10;

var UserSchema = Mongoose.Schema({
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
    crypted_pw: {
        type:       String,
        required:   true
    }
});

UserSchema.pre("save", function(callback) {
    var _current_user = this;

    // Do nothing if the p/w is the same
    if(_current_user.isModified("crypted_pw") === false) {
        return callback();
    }

    // Store the p/w after hashing it
    Async.waterfall([
        // Generate salt
        function generate_salt(next) {
            Bcrypt.genSalt(SALT_FACTOR, next);
        },
        function hash_pw(salt, next) {
            Bcrypt.hash(_current_user.crypted_pw, salt, next);
        },
        function set_pw(hash, next) {
            _current_user.crypted_pw = hash;
            next();
        }
    ], function(error, result) {
        callback(error);
    });
});

UserSchema.methods.compare_password = function(password_attempt, callback) {
    Bcrypt.compare(password_attempt, this.crypted_pw, function(error, match) {
        callback(error, match);
    });
};

module.exports = Mongoose.model("User", UserSchema);