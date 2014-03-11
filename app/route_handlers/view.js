module.exports = function(log) {
    return {
        home: function(request, response) {
            response.render("index", { user: request.user });
        },
        login: function(request, response) {
            response.render("login", { user: request.user, messages: request.session.messages });
        },
        signup: function(request, response) {
            response.render("signup", { messages: request.session.messages });
        },
        account: function(request, response) {
            response.render("account", { user: request.user });
        },
        error: function(request, response) {
            log.warn("404 page invoked due to some error!");
            response.send(404, "Umm, this is an error page... what the heck are you looking for?");
        }
    };
};