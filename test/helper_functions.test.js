var
    should      = require("should");

describe("[Helper Functions] - append_all", function() {
    var helper;

    before(function() {
        helper = require("../app/helper_functions");
    });

    it("no params", function() {
        var result = helper.append_all();
        result.length.should.be.exactly(0);
    });

    it("empty params", function() {
        var result = helper.append_all([], [], [], [], []);
        result.length.should.be.exactly(0);
    });

    it("with params", function() {
        var result = helper.append_all(["H"], ["E"], ["L", "L", "O"]);
        result.length.should.be.exactly(5);
        result[0].should.eql("H").and.be.a.String;
        result[1].should.eql("E").and.be.a.String;
        result[2].should.eql("L").and.be.a.String;
        result[3].should.eql("L").and.be.a.String;
        result[4].should.eql("O").and.be.a.String;
    });

    it("with empty arrays and valid params", function() {
        var result = helper.append_all([], ["H"], ["E"], [], [], ["L", "L", "O"]);
        result.length.should.be.exactly(5);
        result[0].should.eql("H").and.be.a.String;
        result[1].should.eql("E").and.be.a.String;
        result[2].should.eql("L").and.be.a.String;
        result[3].should.eql("L").and.be.a.String;
        result[4].should.eql("O").and.be.a.String;
    });
});