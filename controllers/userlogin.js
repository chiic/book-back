var models = require('../models');
exports.index = function(req, res, next) {
    var reqUser = req.body.username;
    var reqPsd = req.body.psd;
    models.rolesModel.find({username: reqUser, psd: reqPsd}, function(err, users){
        if(users.length > 0) {
            req.session.username = reqUser;
            req.session.role = users[0].roleName;
            req.session.uid = users[0]._id
            if (users[0].faceAuth) {
                req.session.crossfaceAuth = 'notCrossAuth'
            }
            res.json({login: 'passpsd', faceAuth: users[0].faceAuth})
        } else {
            res.status(403);
            res.send({login: 'notpass'});
        }
    });
}

exports.loginOut = function(req, res, next) {
    req.session.destroy(function(err) {
        if(!err) {
            res.json({
                success: true
            });
        } else {
            res.json({
                success: false
            });
        }
    })
}

exports.changePsd = function(req, res, next) {
    const newpsd = req.body.newpsd;
    models.rolesModel.update(
        {_id: req.session.uid},
        {$set: {psd: newpsd}},
        function(err, doc) {
            if(!err) {
                res.json({update: 'success'})
            }
        }
    )
}