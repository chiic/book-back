var mongoose = require('mongoose');
var models = require('./index')
mongoose.connect('mongodb://127.0.0.1:27017/booklist', { useNewUrlParser: true });
var db = mongoose.connection;
// db日志
db.on('error',console.error.bind(console,'连接错误:'));
db.once('open', function (callback) {
  console.log("数据库成功连接");
});