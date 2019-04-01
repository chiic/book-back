var models = require('../models')
exports.index = function(req, res, next) {
    if (!req.session.username) {
        res.json({islogin: false});
    } else {
        models.rolesModel.findOne({_id: req.session.uid}, (err, doc) => {
            console.log(doc)
            res.json({
                islogin: true,
                role: req.session.role,
                username: req.session.username,
                faceAuth: doc.faceAuth
            });            
        })

    }
}
