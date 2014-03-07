/*****************************************************************************\
Simple ensure authenticated middleware, which is responsible for validating
that a user is authenticated, else forwards to the login page.
\*****************************************************************************/
module.exports = function(request, response, next_route) {
    if(request.isAuthenticated()) {
        return next_route();
    } else {
        response.redirect('/login');
    }
};