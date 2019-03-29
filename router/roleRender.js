var express = require('express');
var router = express.Router();
var roles = require('../controllers/roles');

// 获取用户角色列表
router.get('/getroles', roles.getRoles);

// 修改用户角色
router.put('/changerole', roles.changeRole);

// 添加用户账号
router.post('/addrole', roles.addRole);

// 添加用户的头像信息,即人脸识别信息
router.post('/uploaduserimg', roles.uploadUserImg);

router.get('/getuserimg', roles.getUserImg);
module.exports = router;
