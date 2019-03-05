var models = require('../models/index');
exports.render = function (req, res) {
    models.booklistModel.find(function(err, list) {
        if(!err) {
            res.render('overview', {
                title: '概览',
                bookdataSet: list
            })
        }
    });
}