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
    // User login page            |                                      |                                 |
    app.get(                "/login",               middleware.passthrough,              handlers.view.login );
    //                            |                                      |                                 |
    // User account page          |                                      |                                 |
    app.get(              "/account",      middleware.ensure_authenticated,            handlers.view.account );
    //                            |                                      |                                 |
    app.post(       "/login", middleware.passthrough, function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err) }
        if (!user) {
          req.session.messages =  [info.message];
          return res.redirect('/login')
        }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.redirect('/');
        });
      })(req, res, next);
    });
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect('/');
    });
    //                            |                                      |                                 |
    // 404 - *MUST* be last       |                                      |                                 |
    app.get(                     "*",               middleware.passthrough,              handlers.view.error );
    // NO MORE ROUTES HERE... add them before the 404 page!
};

