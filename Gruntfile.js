/*****************************************************************************\
    GRUNTFILE

    This file"s job is to describe to grunt what types of plugins we want to 
    load, as well as the initialization of the same.
\*****************************************************************************/
// Defining some groups of files so we can mix and match them later
var
    exec                    = require("child_process").exec,
    helper                  = require("./app/helper_functions.js"),
    SERVER_FILES            = ["server.js"],
    GRUNT_FILES             = ["Gruntfile.js"],
    APP_FILES               = ["app/**/*.js"],
    TEST_FILES              = ["test/**/*.js"],
    DOCUMENTATION_FILES     = ["docs/**/*.md", "mkdocs.yml"],
    ALL_FILES               = helper.append_all(SERVER_FILES, GRUNT_FILES, APP_FILES, TEST_FILES, DOCUMENTATION_FILES),
    LINT_FILES              = helper.append_all(SERVER_FILES, APP_FILES, GRUNT_FILES),
    ALL_CODE_FILES          = helper.append_all(SERVER_FILES, APP_FILES, TEST_FILES);

module.exports = function(grunt) {

    // Initialize any plugins we wish to load
    grunt.initConfig({
        
        // JS Hint Initialization via Grunt
        // Detailed options here: http://www.jshint.com/docs/options/
        jshint: {
            src:                    LINT_FILES,
            options: {
                undef:              true,
                latedef:            true,
                immed:              true,
                indent:             4,
                trailing:           true,
                globals:    {
                    require:        true,
                    module:         true,
                    __dirname:      true,
                    console:        true,
                    process:        true,
                }
            },
        },

        // Watch module is responsible for providing hooks to pair a group
        // of files, to a certain task. This is invoked when the user triggers
        // the "watch" job. For instance: "grunt watch:lint" will only run the
        // lint job on change, while "grunt watch" will run all jobs under "watch"
        watch: {
            // Clear the console... anytime anything changes...
            clear_console: {
                files:              GRUNT_FILES,
                tasks:              ["clear_console"]
            },

            // Anytime the lint-able files change, we run the lint job
            // Notice the <%= %> which gives you access to the things passed
            // into "initConfig({...})"
            lint: {
                files:              "<%= jshint.src %>",
                tasks:              ["jshint"]
            },

            // Anytime the code files change, re-run our suite of
            // mocha tests. For now these are only the server side tests
            // and do not contain any of our client side testing (yet..)
            test: {
                files:              ALL_CODE_FILES,
                tasks:              ["run_mocha_tests"]
            },

            // Anytime the documentation files change, re-generate the
            // documentation "site" from the md files. This is output
            // to our public folder so that this site is routable from
            // our app / etc...
            documentation: {
                files:              DOCUMENTATION_FILES,
                tasks:              ["generate_documentation"]
            },
        },

        // Tasks to run concurrently. This way when we deploy the default
        // task by running "grunt", we will concurrently run all tasks
        // listed below. Typically this is used to concurrently run things
        // like minification, uglification, asset parsing etc. Once these
        // are defined here, it is easy to pick and choose arbitary groups
        // of these concurrent tasks and assign them to things like "dev" 
        // "prod" tasks.
        concurrent: {
            lint:                   ["jshint"],
            test:                   ["run_mocha_tests"],
            docs:                   ["generate_documentation"],
        },

    });

    // Setup tasks which are defined in the NPM registry ...
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-concurrent");
    
    //
    // Custom tasks ...
    //

    // Create a custom task which goes and runs any tests as outlined in the package.json
    // file under the `scripts` key. I opted for this route as opposed to the one which 
    // creates a MakeFile since this seemed more universal.
    // More info: http://stackoverflow.com/questions/10753288/how-to-specify-test-directory-for-mocha
    grunt.registerTask("run_mocha_tests", function() {
        var callback = this.async();
        exec("mocha", function(error, stdout) {
            grunt.log.write(stdout);
            callback(error);
        });
    });

    // The point of this task it to clear the screen before running other watch or 
    // whatever commands
    grunt.registerTask("clear_console", function() {
        var callback = this.async();
        exec("clear", function(error, stdout) {
            grunt.log.write(stdout);
            callback(error);
        });
    });

    // Custom task to generate documentation using mkdocs
    grunt.registerTask("generate_documentation", function() {
        var callback = this.async();
        // TODO: Verify that mkdocs exists before we go off doing this...
        // TODO: Maybe we need a plugin to install mkdocs??
        exec("mkdocs build", function(error, stdout) {
            grunt.log.write(stdout);
            callback(error);
        });
    });

    // Default tasks ...
    grunt.registerTask("default", ["clear_console", "concurrent:lint", "concurrent:test"]);
    grunt.registerTask("test", ["clear_console", "concurrent:test"]);
    // TODO:
    // grunt.registerTask("dev", ...);
    // grunt.registerTask("prod", ...);
};


















