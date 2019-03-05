var express = require('express');
var booklist = require('../../controllers/booklist');
var router = express.Router();
// 获取书籍列表
router.get('/api/v1/back/booklist', booklist.getBooklist);

module.exports = router