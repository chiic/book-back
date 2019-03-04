var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var userlogin = require('../controllers/userlogin');
var homePage = require('../controllers/home');
var models = require('../models/index');
// 主页
router.get('/', homePage.render);
router.get('/favicon.ico', homePage.render);
// 登录页
router.get('/login', userlogin.render);

// 登录
router.post('/api/back/login', userlogin.index)
// 添加书籍
router.post('/api/back/addbook', function(req, res) {
    models.booklistModel.create(req.body, function(err) {
        if(!err) {
            res.status(200);
            res.json({success: true})
        }
    });
})

module.exports = router;