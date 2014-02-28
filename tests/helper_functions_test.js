var should = require('should');

describe('Testing the parse_application_arguments function', function() {
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

describe('Testing the append_all function', function() {
    var helper;

    before(function(callback) {
        helper = require('../app/helper_functions');
        callback();
    });

    it('Append with no params', function() {
        var result = helper.append_all();
        result.length.should.be.exactly(0);
    });

    it('Append with empty params', function() {
        var result = helper.append_all([], [], [], [], []);
        result.length.should.be.exactly(0);
    });

    it('Append with params', function() {
        var result = helper.append_all(["H"], ["E"], ["L", "L", "O"]);
        result.length.should.be.exactly(5);
        result[0].should.eql("H").and.be.a.String;
        result[1].should.eql("E").and.be.a.String;
        result[2].should.eql("L").and.be.a.String;
        result[3].should.eql("L").and.be.a.String;
        result[4].should.eql("O").and.be.a.String;
    });

    it('Append with empty arrays params', function() {
        var result = helper.append_all([], ["H"], ["E"], [], [], ["L", "L", "O"]);
        result.length.should.be.exactly(5);
        result[0].should.eql("H").and.be.a.String;
        result[1].should.eql("E").and.be.a.String;
        result[2].should.eql("L").and.be.a.String;
        result[3].should.eql("L").and.be.a.String;
        result[4].should.eql("O").and.be.a.String;
    });
});