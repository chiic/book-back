var models = require('../models/index');
var AipFaceClient = require("baidu-aip-sdk").face;
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
  console.log(loginImg)
  if (!loginImg) {
    var client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);
    models.rolesImgModel.find((err, doc) => {
      doc.forEach(element => {
        client.match([{
          image: loginImg,
          image_type: 'BASE64'
        }, {
          image: doc.imgData,
          image_type: 'BASE64'
        }]).then(function (result) {
          console.log('<match>: ' + JSON.stringify(result));
        });
      });  
    });
  }
}