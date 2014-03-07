/*
    Routes file which pairs our server"s HTTP handlers
    to the ReSTy interface we provide...
*/
module.exports = function(app, passport, middleware, handlers) {
    /*  Handler -------------------------------------------------------------------------------------------o */
    /*  Middleware ------------------------------------------------------o                                 | */
    /*  URL ----------------------o                                      |                                 | */
    /*                            |                                      |                                 | */
    //                            |                                      |                                 | 
    // Home page                  |                                      |                                 | */
    app.get(                     "/",               middleware.passthrough,               handlers.view.home );
    //                            |                                      |                                 |
    // User login pages           |                                      |                                 |
    app.get(                "/login",               middleware.passthrough,              handlers.view.login );
    //                            |                                      |                                 |
    // User account page          |                                      |                                 |
    app.get(              "/account",      middleware.ensure_authenticated,            handlers.view.account );
    
    //                            |                                      |                                 |
    //                            |                                      |                                 |
    // User actions               |                                      |                                 |
    app.get(               "/logout",               middleware.passthrough,             handlers.user.logout );
    app.post(               "/login",               middleware.passthrough,              handlers.user.login );
    //                            |                                      |                                 |
    //                            |                                      |                                 |
    // 404 - *MUST* be last       |                                      |                                 |
    app.get(                     "*",               middleware.passthrough,              handlers.view.error );
    // NO MORE ROUTES HERE... add them before the 404 page!
};

