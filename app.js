var path = require('path');
var https = require('https');
var fs = require('fs');
var config = require('./config');
var logger = require('./common/logger');
var request_log = require('./middlewares/request_log');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var cors = require('cors');
var app = express();
var Api = require('./api/v1/output.js');
var indexRender = require('./router/indexRender');
var osRender = require('./router/osRender');
var roleRender = require('./router/roleRender');
// 开启数据库
require('./models/start_mongo');
// 常用中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
  secret: 'alita',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60 * 1000
  }
}))

// 密钥和签名证书
var options = {
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt')
}
// app.use(csrf({ cookie: true }));
// 请求日志
// app.use(request_log);
// cors可请求origin配置
var corsOptions = {
  origin: config.allowOrigin,  // 设置可跨域
  credentials: config.credentials, // 是否允许跨域携带cookie
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// 页面服务
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));
app.locals._layoutFile = 'layout.html';

// api接口
app.use('/api', indexRender);

//系统层面接口
app.use('/os', osRender);

// 用户权限接口
app.use('/role', roleRender);

// 使用node代理vue spa页面
app.use(express.static('./public'))

// 开启https
// var httpsServer = https.createServer(options, app);

app.listen(config.port, config.hostname, function(err) {
  if(!err) {
    logger.info('监听端口为:', config.port);
    logger.info('主机为:', config.hostname);
  }
})
