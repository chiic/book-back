
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Model = mongoose.model;
// 导入模型
var booklistSchema = require('./booklist');
var userSchema = require('./user');

exports.booklistModel = new Model('Booklist', booklistSchema);
exports.userModel = new Model('User', userSchema);



