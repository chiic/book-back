var authToken = function() {
    return function(req, res, next) {
        if(req.session.username) {
            next();
        } else {
            return res.redirect(302, '/login')
        }
    }
}

module.exports = authToken;