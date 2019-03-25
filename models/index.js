
var mongoose = require('mongoose');
var Model = mongoose.model;
// 导入模型
var booklistSchema = require('./booklist');
var userSchema = require('./user');
var rolesSchema = require('./roles');

exports.booklistModel = new Model('Booklist', booklistSchema);
exports.userModel = new Model('User', userSchema);
exports.rolesModel = new Model('Roles', rolesSchema);



