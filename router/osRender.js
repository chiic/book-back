var express = require('express');
var router = express.Router();
var disk = require('../controllers/disk');

router.get('/disk', disk.getDisk)