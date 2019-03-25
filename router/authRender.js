var express = require('express');
var router = express.Router();
var roles = require('../controllers/roles');

// 获取用户角色列表
router.get('/getroles', roles.getRoles);

// 修改用户角色
router.put('/changerole', roles.changeRole);

// 添加用户账号
router.post('/addrole', roles.addRole);

module.exports = router;
