var path = require('path');
var config = require('./config');
var logger = require('./common/logger');
var request_log = require('./middlewares/request_log');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var app = express();
var Api = require('./api/v1/output.js');
var indexRender = require('./router/indexRender');
// 常用中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(csrf({ cookie: true }));
// 请求日志
// app.use(request_log);
// cors可请求origin配置
var corsOptions = {
  origin: 'http://book.chiic.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// 页面服务
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));
app.locals._layoutFile = 'layout.html';

//路由服务
app.use('/api/v1', cors(corsOptions), Api);
app.use('/public', express.static('./public'));
app.use('/', indexRender);

app.listen(config.port, config.hostname, function(err) {
  if(!err) {
    logger.info('监听端口为:', config.port);
    logger.info('主机为:', config.hostname);
  }
})
