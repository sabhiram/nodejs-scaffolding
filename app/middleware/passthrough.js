/*****************************************************************************\
Simple passthough module to forward a http request. This is mostly being used
as a dummy middleware.
\*****************************************************************************/
module.exports = function(request, response, next_route) {
    next_route();
};