var express = require('express');
var booklist = require('../controllers/booklist');
var router = express.Router();

router.get('/booklist/:booktype', booklist.getbooktype);

module.exports = router