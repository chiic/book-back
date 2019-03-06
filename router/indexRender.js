var express = require('express');
var router = express.Router();
var userlogin = require('../controllers/userlogin');
var homePage = require('../controllers/home');
var overviewPage = require('../controllers/overview')
var booklistApi = require('../controllers/booklist');
var authToken = require('../middlewares/auth');

// 权限控制
router.use(/^(?!\/(api|login)).*/, authToken());

// 主页
router.get('/', homePage.render);
router.get('/favicon.ico', homePage.render);

// 登录页
router.get('/login', userlogin.render);
// 登录api
router.post('/api/back/login', userlogin.index);

// 添加书籍
router.post('/api/back/addbook', booklistApi.addBook);
// 删除书籍
router.delete('/api/back/removebook', booklistApi.removeBook);
// 更新书籍
router.put('/api/back/updatebook', booklistApi.updatebook);

// 概览页面
router.get('/overview', overviewPage.render)

module.exports = router;