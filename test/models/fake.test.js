var
    should      = require("should"),
    Mongoose    = require("mongoose"),
    User        = require("../../app/models/user");

// describe("Real DB Testing", function() {
//     describe("Nested test", function() {
//         it("is a test", function() {
//             true.should.be.true;
//         });
//     });
//     // before(function(done) {
//     //     Mongoose.connect("mongodb://172.12.8.155/user_test2");
//     //     done();
//     // });

//     // //
//     // // Cleanup
//     // //
//     // after(function(done) {
//     //     done();
//     // });

//     // it("add user", function(next_test) {
//     //     next_test();
//     // });
// });