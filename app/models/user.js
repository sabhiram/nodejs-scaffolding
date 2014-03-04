var
    Mongoose        = require("mongoose"),
    Async           = require("async"),
    Schema          = Mongoose.Schema,
    Bcrypt          = require("bcrypt");

// TEMP CODE - REMOVE ME
var config = {
    SALT_FACTOR: 10
};
// END TEMP CODE

/*****************************************************************************\
User Model

A user *should* have the following properties which is defined in the _schema
variable below:
    1. email:       unique id to identify user's by
    2. password:    string (TODO: Enforce min pw requirements)
\*****************************************************************************/
var User = function() {

    // Define the schema for the User object
    var _schema = new Schema({
        email: { type: String, index: { unique: true, required: true } },
        password: { type: String, required: true }
    });
    
    // Get an instance of a "user" model using the above schema
    var _model = Mongoose.model("user", _schema);

    // Define how the user registers with an email / password
    var _register = function(email, password, callback) {
        _model.create({ email: email, password: password }, function(error, user) {
            if(error) {
                callback(error);
            } else {
                callback(null, user);
            }
        });
    };

    // We want to inject our hash when storing the p/w
    _schema.pre("save", function(callback) {
        var _current_user = this;

        // Do nothing if the p/w is the same
        if(_current_user.isModified("password") === false) {
            return callback();
        }

        // Store the p/w after hashing it
        Async.waterfall([
            // Generate salt
            function generate_salt(next) {
                Bcrypt.genSalt(config.SALT_FACTOR, next);
            },
            function hash_pw(salt, next) {
                Bcrypt.hash(_current_user.password, salt, next);
            },
            function set_pw(hash, next) {
                _current_user.password = hash;
                next();
            }
        ], function(error, result) {
            callback(error);
        });
    });

    return {
        schema:         _schema,
        register:       _register,
        model:          _model,
    };
};

module.exports = User();