var models = require('../models');
exports.index = function(req, res) {
    var reqUser = req.body.username;
    var reqPsd = req.body.psd;
    models.rolesModel.find({username: reqUser, psd: reqPsd}, function(err, users){
        if(users.length > 0) {
            req.session.username = reqUser;
            req.session.role = users[0].roleName;
            res.json({login: 'islogin'})
        } else {
            res.status(403);
            res.send({login: 'notlogin'});
        }
    });
}

exports.render = function(req, res) {
    res.render('login', {title: '登录页'});
}