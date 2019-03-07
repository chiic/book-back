var express = require('express');
var booklist = require('../../controllers/booklist');
var router = express.Router();
// 获取书籍列表
router.get('/back/booklist', booklist.getBooklist);
// 获取开源书籍
router.get('/back/opensource/list', booklist.getSourcelist);
// 获取开源书籍详情
router.get('/back/opensource/detail', booklist.getSourceitem);

module.exports = router