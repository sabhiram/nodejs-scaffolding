var
    should  = require("should");

//
// Test group to validate the append_all helper function
//
describe("[Helper Functions] - append_all", function() {
    var helper;

    //
    // Setup
    //
    before(function(done) {
        helper = require("../app/helper_functions");
        done();
    });

    //
    // Cleanup
    //
    after(function(done) {
        // do nothing
        done();
    });

    //
    // Tests
    //
    it("no params", function(next_test) {
        var result = helper.append_all();
        result.length.should.be.exactly(0);
        next_test();
    });

    it("empty params", function(next_test) {
        var result = helper.append_all([], [], [], [], []);
        result.length.should.be.exactly(0);
        next_test();
    });

    it("with params", function(next_test) {
        var result = helper.append_all(["H"], ["E"], ["L", "L", "O"]);
        result.length.should.be.exactly(5);
        result[0].should.eql("H").and.be.a.String;
        result[1].should.eql("E").and.be.a.String;
        result[2].should.eql("L").and.be.a.String;
        result[3].should.eql("L").and.be.a.String;
        result[4].should.eql("O").and.be.a.String;
        next_test();
    });

    it("with empty arrays and valid params", function(next_test) {
        var result = helper.append_all([], ["H"], ["E"], [], [], ["L", "L", "O"]);
        result.length.should.be.exactly(5);
        result[0].should.eql("H").and.be.a.String;
        result[1].should.eql("E").and.be.a.String;
        result[2].should.eql("L").and.be.a.String;
        result[3].should.eql("L").and.be.a.String;
        result[4].should.eql("O").and.be.a.String;
        next_test();
    });
});