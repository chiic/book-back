var models = require('../models/index');

exports.addBook = function(req, res) {
    models.booklistModel.create(req.body, function(err) {
        if(!err) {
            res.status(200);
            res.json({success: true});
        }
    });
}

exports.removeBook = function(req, res) {
    models.booklistModel.deleteOne(req.body, function (err) {
        if (!err) {
            res.json({deleting: 'success'});
        }
      });
}

exports.getBooklist = function(req, res){
    models.booklistModel.find(function(err, list) {
        if(list.length > 0) {
            res.json(list);
        }
    });
}