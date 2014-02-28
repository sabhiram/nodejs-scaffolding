/*****************************************************************************\
    GRUNTFILE

    This file"s job is to describe to grunt what types of plugins we want to 
    load, as well as the initialization of the same.
\*****************************************************************************/
module.exports = function(grunt) {

    // Initialize any plugins we wish to load
    grunt.initConfig({
        
        // JS Hint Initialization via Grunt
        // Detailed options here: http://www.jshint.com/docs/options/
        jshint: {
            src: ["Gruntfile.js", "server.js", "app/**/*.js"],
            options: {
                undef:              true,
                latedef:            true,
                immed:              true,
                globals:    {
                    require:        true,
                    module:         true,
                    __dirname:      true,
                    console:        true,
                }
            }
        },

    });

    // Setup tasks ...
    grunt.loadNpmTasks("grunt-contrib-jshint");

    // Default tasks ...
    grunt.registerTask("default", ["jshint"]);
};