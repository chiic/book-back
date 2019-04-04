var models = require('../models/index');
var AipFaceClient = require("baidu-aip-sdk").face;
var nodemailer = require('nodemailer');
var random = require('string-random');
var aes = require('../utils/sign_crypto');
var qs = require('querystring');
// 利用生成cookie的库来生成密文字符串
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
        if (result.error_msg && result.error_msg === 'SUCCESS' && result.result.score > 85) {
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
        res.json({
          ischanged: true
        })
      }
    })
}

exports.getFace = function (req, res, next) {
  models.rolesModel.findOne({
    _id: req.session.uid
  }, (err, doc) => {
    if (!err) res.json({
      faceAuth: doc.faceAuth
    })
  })
}

function sendMail(to, url) {
  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({
    //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
    service: 'qq',
    port: 465, // SMTP 端口
    secureConnection: true, // 使用 SSL
    auth: {
      user: '442747096@qq.com',
      //这里密码不是qq密码，是你设置的smtp密码
      pass: 'wnxlmltddlhmcbdb'
    }
  });
  var mailOptions = {
    from: '442747096@qq.com', // 发件地址
    to: to, // 收件列表
    subject: 'register', // 标题
    html: `这是激活链接，<b>${url}</b>请在30分钟内激活,若邮箱不支持外跳打开，请复制后打开` // html 内容
  };

  // send mail with defined transport object
  return transporter.sendMail(mailOptions);
}

exports.register = function (req, res, next) {
  if (req.body) {
    const randomStr = random(16)
    const data = {
      ...req.body,
      state: 0,
      activeCode: randomStr,
      createTime: new Date()
    }
    models.cacheModel.create(data, function (err, doc) {
      if (!err) {
        const aesData = aes.aesEncrypt('username=' + req.body.username + '&activeCode=' + randomStr)
        const url = `http://localhost:3001/role/reg_validate?${aesData}`
        sendMail(req.body.email, url).then(
          info => {
            res.json({register: 'success'});
          }
        )
      }
    })
  }
}

exports.regValidate = function (req, res, next) {
  if (req.query) {
    const datas = aes.aesDecrypt(Object.keys(req.query)[0])
    models.cacheModel.findOne(qs.parse(datas), function(err, doc) {
      if(!err && doc) {
        const {username, psd} = doc
        models.rolesModel.create({username, psd, roleName: 'user', faceAuth: false})
          .then(() => {
            res.set('Content-Type', 'text/plain;utf-8');
            res.end('注册成功');
          })
      }
      if(!doc) {
        res.set('Content-Type', 'text/plain;utf-8');
        res.end('注册失败，可能是邮箱验证时间太长');
      }
    })
  }
}