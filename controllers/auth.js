var models = require('../models')
exports.index = function (req, res, next) {
  if (!req.session.username) {
    res.json({
      islogin: false
    });
  } else {
    if (req.session.crossfaceAuth === 'notCrossAuth') {
      res.json({
        islogin: false
      });
    } else {
      res.json({
        islogin: true,
        role: req.session.role,
        username: req.session.username
      });
    }
  }
}