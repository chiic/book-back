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
        req.body._id,
        req.body,
        function(err, role) {
            if(!err) {
                res.json({success: true});
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