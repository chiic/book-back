var models = require('../models/index');

exports.getRoles = function(req, res, next) {
    models.rolesModel.find(function(err, roles) {
        if(!err) {
            res.json(roles)
        }
    })
}

exports.changeRole = function(req, res, next) {
    models.rolesModel.updateOne(
        { _id: req.body._id },
        req.body,
        function(err, role) {
            if(!err) {
                res.json({success: true});
            } else {
                console.log(err)
            }
        }
    )
}

exports.addRole = function(req, res, next) {
    var data = req.body;
    models.rolesModel.create(data, function(err, roles) {
        if(!err) {
            res.status(200);
            res.json({
                success: true
            });
        }
    })
}

exports.uploadUserImg = function(req, res, next) {
    var img = req.body.data
    if(req.session.uid) {
        models.rolesImgModel.findOne({uid: req.session.uid}, function(err, msg) {
            if(!err) {
                if(msg) {
                    models.rolesImgModel.update(msg, {$set: {imgData: img}}, function(e, updateMsg){
                        if(!e) res.json({message: 'updated', doc: updateMsg})
                    })
                } else {
                    models.rolesImgModel.create(
                        {uid: req.session.uid, imgData: img},
                        function(ex, createMsg) {
                            if(!ex) res.json({message: 'create', doc: createMsg})
                    })                    
                }
            }
        })

    }
}

exports.getUserImg = function(req, res, next) {
    if(req.session.uid) {
        models.rolesImgModel.findOne({uid: req.session.uid}, function(err, msg) {
            if(!err && msg) {
                const { imgData } = msg
                res.json({imgData, exist: true}) 
            } else {
                res.json({exist: false})
            }
        })
    }
}