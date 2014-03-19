var
    exec    = require("child_process").exec,
    async   = require("async");

module.exports = function(grunt) {

    // Custom task to get the test and user db up and running before
    // we jump into development etc...
    grunt.registerTask("mongo_setup", function() {
        var callback = this.async();
        async.series([
            function validate_requirements(next) {
                // TODO: Verify that vagrant is installed
                // TODO: Verify that virtualbox is installed
                next();
            },
            function bringup_vagrant(next) {
                grunt.log.write("* Note: You might be prompted to enter your system password");
                grunt.log.write("*       This is to allow vagrant to mount the NFS shared");
                grunt.log.write("*       folders for the VM being created.");
                grunt.log.write("");
                
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
        async.series([
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
        async.series([
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