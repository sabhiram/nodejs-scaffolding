/*
    Routes file which pairs our server's HTTP handlers
    to the ReSTy interface we provide...
*/
module.exports = function(app, handlers) {

    // Home page.
    app.get('/', handlers.view.home);
    app.get('/login', handlers.view.login);


};

