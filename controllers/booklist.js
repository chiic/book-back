var models = require('../models/index');
var fs = require('fs');
var path = require('path');
exports.addBook = function (req, res) {
    models.booklistModel.create(req.body, function (err) {
        if (!err) {
            res.status(200);
            res.json({
                success: true
            });
        }
    });
}

exports.removeBook = function (req, res) {
    models.booklistModel.findById(req.body, function (err, doc) {
        if (!err) {
            models.booklistModel.deleteOne(doc, function (err) {
                if (!err) {
                    res.json({
                        deleting: 'success'
                    });
                }
            });
        }
    });
}

exports.getBooklist = function (req, res) {
    models.booklistModel.find(function (err, list) {
        if (list.length > 0) {
            res.json(list);
        }
    });
}

exports.updatebook = function (req, res) {
    console.log(req.body)
    models.booklistModel.updateOne(
        {_id: req.body._id},
        req.body,
        function (err, doc) {
            if (!err) {
                res.json({
                    success: true
                });
            }
        })
}

exports.getbook = function(req, res) {
    models.booklistModel.findById(req.query, function(err, data) {
        if(!err) {
            res.json(data)
        }
    })
}

exports.getSourcelist = function (req, res) {
    fs.readFile(path.join(__dirname, '../datas/res/list.json'), function (err, data) {
        if(!err) res.send(data);
    })
}

exports.getSourceitem = function(req, res) {
    var id = req.query.id;
    fs.readFile(
        path.join(__dirname, '../datas/res/items/', id + '.txt'),
        function(err, data) {
            if(!err) res.send(data);
        });
}