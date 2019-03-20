exports.index = function(req, res, next) {
    if (!req.session.username) {
        res.json({islogin: false});
    } else {
        res.json({islogin: true});
    }
}