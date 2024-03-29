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

// 刷脸识别
router.post('/matchroles', roles.matchRoles);

// 修改刷脸认证
router.post('/changeface', roles.changeFace);

// 获取刷脸认证
router.get('/getface', roles.getFace);

// 用户注册
router.post('/register', roles.register);

// 用户注册邮箱验证
router.get('/reg_validate', roles.regValidate);

module.exports = router;
