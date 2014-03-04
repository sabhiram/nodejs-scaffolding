var
    exec                    = require("child_process").exec,
    Async                   = require("async");

module.exports = function(grunt) {

    // Custom task to get the test and user db up and running before
    // we jump into development etc...
    grunt.registerTask("mongo_setup", function() {
        var callback = this.async();
        Async.series([
            function validate_requirements(next) {
                // TODO: Verify that vagrant is installed
                // TODO: Verify that virtualbox is installed
                next();
            },
            function bringup_vagrant(next) {
                exec("vagrant up", {cwd: "./services/mongodb"}, function(error, stdout) {
                    grunt.log.write(stdout);
                    exec("vagrant provision", {cwd: "./services/mongodb"}, function(error, stdout) {
                        grunt.log.write("\n");
                        grunt.log.write(stdout);
                        next(error);
                    });
                });
            }
        ], function(error) {
            callback(error);
        });
    });

    // Custom task to shutdown vm w/ mongo container
    grunt.registerTask("mongo_cleanup", function() {
        var callback = this.async();
        Async.series([
            function validate_requirements(next) {
                // TODO: Verify that vagrant is installed
                // TODO: Verify that virtualbox is installed
                next();
            },
            function halt_vagrant(next) {
                exec("vagrant halt", {cwd: "./services/mongodb"}, function(error, stdout) {
                    grunt.log.write(stdout);
                    next(error);
                });
            }
        ], function(error) {
            callback(error);
        });
    });

    // Custom task to destroy vm for mongo container
    grunt.registerTask("mongo_destroy", function() {
        var callback = this.async();
        Async.series([
            function validate_requirements(next) {
                // TODO: Verify that vagrant is installed
                // TODO: Verify that virtualbox is installed
                next();
            },
            function reset_vagrant(next) {
                exec("vagrant destroy -f", {cwd: "./services/mongodb"}, function(error, stdout) {
                    grunt.log.write(stdout);
                    next(error);
                });
            }
        ], function(error) {
            callback(error);
        });
    });
};