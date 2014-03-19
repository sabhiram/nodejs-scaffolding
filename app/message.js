var Message = function(type, str) {
    return {
        type: type.name,
        class: type.add_class,
        message: str
    };
};

module.exports = Message;

module.exports.SUCCESS  = {value: 0, name: "SUCCESS", add_class: "ns-message-success"};
module.exports.ERROR    = {value: 1, name: "ERROR", add_class: "ns-message-error"};
module.exports.WARN     = {value: 2, name: "WARN", add_class: "ns-message-warn"};
