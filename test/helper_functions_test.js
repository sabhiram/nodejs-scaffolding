var should = require('should');

describe('Testing the parse args function', function() {
    var helper,
        args;

    before(function(callback) {
        helper = require('../app/helper_functions');
        callback();
    });

    it('Parse arguments with specified port', function() {
        args = helper.parse_application_arguments(["--port", "1235"]);
        args.port.should.be.exactly(1235).and.be.a.Number;
        args = helper.parse_application_arguments(["-p", "32000"]);
        args.port.should.be.exactly(32000).and.be.a.Number;
    });

    it('Parse arguments with no port specified', function() {
        args = helper.parse_application_arguments([]);
        args.port.should.be.exactly(1234).and.be.a.Number;
    });

});