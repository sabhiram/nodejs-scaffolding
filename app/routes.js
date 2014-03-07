/*
    Routes file which pairs our server"s HTTP handlers
    to the ReSTy interface we provide...
*/
module.exports = function(app, middleware, handlers) {
    /*  Handler -----------------------------------------------------------------------------------o */
    /*  Middleware ----------------------------------------------o                                 | */
    /*  URL ----------------------o                              |                                 | */
    /*                            |                              |                                 | */
    //                            |                              |                                 | 
    // Home page                  |                              |                                 | */
    app.get(                     "/",       middleware.passthrough,               handlers.view.home );
    //                            |                              |                                 |
    // User login page            |                              |                                 |
    app.get(                "/login",       middleware.passthrough,              handlers.view.login );
    //                            |                              |                                 |
    // 404 - *MUST* be last       |                              |                                 |
    app.get(                     "*",       middleware.passthrough,              handlers.view.error );
    // NO MORE ROUTES HERE... add them before the 404 page!
};

