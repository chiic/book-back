var express = require('express');
var router = express.Router();
var userlogin = require('../controllers/userlogin');
var homePage = require('../controllers/home');
var overviewPage = require('../controllers/overview')
var booklistApi = require('../controllers/booklist');
var authToken = require('../controllers/auth');

// 登录api
router.post('/back/login', userlogin.index);

// 权限验证
router.get('/back/islogin', authToken.index);
// 添加书籍
router.post('/back/addbook', booklistApi.addBook);
// 删除书籍
router.delete('/back/removebook', booklistApi.removeBook);
// 更新书籍
router.put('/back/updatebook', booklistApi.updatebook);

// 概览页面
// router.get('/overview', overviewPage.render)

module.exports = router;