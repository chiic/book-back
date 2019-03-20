var authToken = function() {
    return function(req, res, next) {
        if(req.session.username) {
            next();
        } else {
            res.status(403);
            res.json({login: 'notlogin'})
        }
    }
}

module.exports = authToken;