// winston - https://github.com/flatiron/winston
//     An amazingly flexible logger for NodeJS, allows the user
//     to define transport mechanisims to route logs to arbitary
//     recievers
var winston = require("winston"),
    path    = require("path");

// There is actually an issue when using more than one type of each transport
// with winston. This can be worked around by overloading the "name" field in
// the transport object (since that is what the code uses to identify unique
// tansports). However, this causes some pretty silly things to happen w.r.t.
// the wrong messages ending up in the wrong logfile. Therefore, I am using only 
// the default master logfile. You can read more about this here: 
// http://stackoverflow.com/questions/10045891/multiple-log-files-with-winston
module.exports = function(logs_path) {
    return new (winston.Logger)({
        transports: [
            // Route all messages to the console
            new winston.transports.Console({ colorize: "true" }),

            // Route all messages to the global logs file
            new winston.transports.File({ filename: path.join(logs_path, "master.log"), json: false }),
        ],
        exceptionHandlers: [
            // Log exceptions to the exception file
            new winston.transports.File({ filename: path.join(logs_path, "exceptions.log"), json: false }),
        ],
        exitOnError: false
    });
};
