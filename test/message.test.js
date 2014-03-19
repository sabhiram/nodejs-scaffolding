var
    should  = require("should");

describe("Message Tests", function() {
    var
        Message = require("../app/message");

    //
    // Setup
    //
    before(function(done) {
        done();
    });

    //
    // Cleanup
    //
    after(function(done) {
        // do nothing
        done();
    });

    it("Creating a new message should return an object", function(next_test) {
        var m = new Message(Message.SUCCESS, "Hello");
        m.type.should.match(Message.SUCCESS.name);
        m.class.should.match("ns-message-success");
        m.message.should.match("Hello");
        next_test();
    });

    it("Creating multiple messages", function(next_test) {
        var m_arr = [
            new Message(Message.SUCCESS, "Hello"),
            new Message(Message.ERROR, "Hello"),
            new Message(Message.WARN, "Hello")
        ];
        m_arr[0].type.should.match(Message.SUCCESS.name);
        m_arr[0].class.should.match("ns-message-success");
        m_arr[0].message.should.match("Hello");

        m_arr[1].type.should.match(Message.ERROR.name);
        m_arr[1].class.should.match("ns-message-error");
        m_arr[1].message.should.match("Hello");

        m_arr[2].type.should.match(Message.WARN.name);
        m_arr[2].class.should.match("ns-message-warn");
        m_arr[2].message.should.match("Hello");
        next_test();
    });
});
