var path = require('path')
var express = require('express');
var router = express.Router();
var userlogin = require('../controllers/userlogin');
var booklistApi = require('../controllers/booklist');
var authToken = require('../controllers/auth');
var uploadControl = require('../controllers/upload');
// 上传文件设置
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.json')
    }
});
var upload = multer({storage: storage });
// 登录api
router.post('/back/login', userlogin.index);
router.get('/back/loginout', userlogin.loginOut);
// 修改密码
router.post('/back/changepsd', userlogin.changePsd);
// 权限验证
router.get('/back/islogin', authToken.index);
// 添加书籍
router.post('/back/addbook', booklistApi.addBook);
// 删除书籍
router.delete('/back/removebook', booklistApi.removeBook);
// 更新书籍
router.put('/back/updatebook', booklistApi.updatebook);
// 获取书籍列表
router.get('/back/booklist', booklistApi.getBooklist);
// 获取某一个id对应的书籍信息
router.get('/back/getbook', booklistApi.getbook);
// 上传接口
router.post('/upload', upload.single('file'), uploadControl.upload)
// 概览页面
// router.get('/overview', overviewPage.render)

module.exports = router;