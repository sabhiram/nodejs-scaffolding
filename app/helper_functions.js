/*****************************************************************************\
    Helper Functions
\*****************************************************************************/
var
    // Argparse
    //     Port of the popular pythonic argument parsing 
    //     library.
    ArgumentParser  = require('argparse').ArgumentParser;
    

module.exports = {
/*****************************************************************************\

Function:
    parse_application_arguments

Description:
    This is a sync function since it will only ever be 
    invoked during the init of the application.

\*****************************************************************************/
parse_application_arguments: function(str) {
    var parser = new ArgumentParser({
        version:        '0.0.0',
        addHelp:        true,
        description:    'Starter NodeJS+Express project!'
    });
    parser.addArgument(['-p', '--port'], {help: 'Port to start server on', defaultValue: 1234, type: "int"});
    return parser.parseArgs(str);
}

};
