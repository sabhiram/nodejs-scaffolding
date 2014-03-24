var
    exec    = require("child_process").exec,
    async   = require("async"),
    log     = null;

function log_stdout(s) {
    log.write(s);
}
function log_error(s) {
    log.error(s);
}
function exec_async(cmd, working_dir, callback) {
    var cp = exec(cmd, {cwd: working_dir});
    cp.stdout.on("data", log_stdout);
    cp.stderr.on("data", log_error);
    cp.on("exit", function(code) {
        callback();
    });
}
module.exports = function(grunt) {
    log = grunt.log;

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
                exec_async("vagrant up", "./services/mongodb", next);
            },
            function provision_vm(next) {
                exec_async("vagrant provision", "./services/mongodb", next);
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
                exec_async("vagrant halt", "./services/mongodb", next);
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
                exec_async("vagrant destroy -f", "./services/mongodb", next);
            }
        ], function(error) {
            callback(error);
        });
    });
};