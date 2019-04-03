var models = require('../models/index');
var AipFaceClient = require("baidu-aip-sdk").face;
var fs = require('fs');
var path = require('path');
var APP_ID = "15901519";
var API_KEY = "EnAkLSgGoCOwVhgVwnC3NGqO";
var SECRET_KEY = "kjVoMaYLMMFxPshlXAAWWiXxB13GVVyz";
exports.getRoles = function (req, res, next) {
  models.rolesModel.find(function (err, roles) {
    if (!err) {
      res.json(roles)
    }
  })
}

exports.changeRole = function (req, res, next) {
  models.rolesModel.updateOne({
      _id: req.body._id
    },
    req.body,
    function (err, role) {
      if (!err) {
        res.json({
          success: true
        });
      } else {
        console.log(err)
      }
    }
  )
}

exports.addRole = function (req, res, next) {
  var data = req.body;
  data.faceAuth = false;
  models.rolesModel.create(data, function (err, roles) {
    if (!err) {
      res.status(200);
      res.json({
        success: true
      });
    }
  })
}

exports.uploadUserImg = function (req, res, next) {
  var img = req.body.data
  if (req.session.uid) {
    models.rolesImgModel.findOne({
      uid: req.session.uid
    }, function (err, msg) {
      if (!err) {
        if (msg) {
          models.rolesImgModel.update(msg, {
            $set: {
              imgData: img
            }
          }, function (e, updateMsg) {
            if (!e) res.json({
              message: 'updated',
              doc: updateMsg
            })
          })
        } else {
          models.rolesImgModel.create({
              uid: req.session.uid,
              imgData: img
            },
            function (ex, createMsg) {
              if (!ex) res.json({
                message: 'create',
                doc: createMsg
              })
            })
        }
      }
    })

  }
}

exports.getUserImg = function (req, res, next) {
  if (req.session.uid) {
    models.rolesImgModel.findOne({
      uid: req.session.uid
    }, function (err, msg) {
      if (!err && msg) {
        const {
          imgData
        } = msg
        res.json({
          imgData,
          exist: true
        })
      } else {
        res.json({
          exist: false
        })
      }
    })
  }
}

exports.matchRoles = function (req, res, next) {
  const loginImg = req.body.img
  if (loginImg) {
    var client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);
    models.rolesImgModel.findOne({
      uid: req.session.uid
    }, (err, doc) => {
      client.match([{
        image: loginImg.replace('data:image/jpeg;base64,', ''),
        image_type: 'BASE64'
      }, {
        image: doc.imgData.replace('data:image/jpeg;base64,', ''),
        image_type: 'BASE64'
      }]).then(function (result) {
        if(result.error_msg && result.error_msg === 'SUCCESS' && result.result.score > 85) {
          req.session.crossfaceAuth = 'crossAuth'
        }
        res.json(result);
      });
    });
  }
}

exports.changeFace = function (req, res, next) {
  models.rolesModel.update({
      _id: req.session.uid
    }, {
      $set: {
        faceAuth: req.body.value
      }
    },
    (err, doc) => {
      if (!err) {
        res.json({ischanged: true})
      }
    })
}

exports.getFace = function(req, res, next) {
  models.rolesModel.findOne({_id: req.session.uid}, (err, doc) => {
    if(!err) res.json({faceAuth: doc.faceAuth})
  })
}

exports.register = function(req, res, next) {}

exports.regValidate = function(req, res, next) {}