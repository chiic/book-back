var models = require('../models');
exports.index = function(req, res) {
    var reqUser = req.body.username;
    var reqPsd = req.body.psd;
    models.userModel.find({username: reqUser, psd: reqPsd}, function(err, users){
        console.log(users);
        if(users.length > 0) {
            res.status(302);
            res.cookie('name', 'islogin', {expires: new Date(Date.now() + 1000000), httpOnly: true})
            res.redirect('/');
        } else {
            res.status(403);
            res.send();
        }
    });
}

exports.render = function(req, res) {
    res.render('login', {title: '登录页'});
}