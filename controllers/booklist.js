var models = require('../models/index');
var fs = require('fs');
var path = require('path');
exports.addBook = function (req, res) {
  const data = req.body;
  data.uid = req.session.uid;
  models.booklistModel.create(data, function (err) {
    if (!err) {
      res.status(200);
      res.json({
        success: true
      });
    }
  });
}

exports.removeBook = function (req, res) {
  models.booklistModel.findById(req.query.id, function (err, doc) {
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
  models.booklistModel.find({
    uid: req.session.uid
  }, function (err, list) {
    if (list.length > 0 && !err) {
      res.json(list);
    }
  });
}

exports.updatebook = function (req, res) {
  models.booklistModel.updateOne({
      _id: req.body._id,
      uid: req.session.uid
    },
    req.body,
    function (err, doc) {
      if (!err) {
        res.json({
          success: true
        });
      }
    })
}

exports.getbook = function (req, res) {
  models.booklistModel.findById(req.query, function (err, data) {
    if (!err) {
      res.json(data);
    }
  })
}

exports.getSourcelist = function (req, res) {
  fs.readFile(path.join(__dirname, '../datas/res/list.json'), function (err, data) {
    if (!err) res.send(data);
  })
}

exports.getSourceitem = function (req, res) {
  var id = req.query.id;
  fs.readFile(
    path.join(__dirname, '../datas/res/items/', id + '.txt'),
    function (err, data) {
      if (!err) res.send(data);
    });
}