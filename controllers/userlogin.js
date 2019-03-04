var models = require('../models');
exports.index = function(req, res) {
    var reqUser = req.body.username;
    var reqPsd = req.body.psd;
    console.log(typeof reqPsd)
    models.userModel.find({username: reqUser, psd: reqPsd}, function(err, users){
        if(users.length > 0) {
            res.status(302);
            res.redirect('/');
        }
    })
}

exports.render = function(req, res) {
    res.render('login', {title: '登录页'});
}