//导入所需模块
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var morgan = require('morgan');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require("socket.io").listen(server,{origin:'*:*'});
var sessionScoket = require('session.socket.io');
var cookiecfg = require('./config/cookieCfg');
var userRouter = require('./router/userRouter');
var bookRouter =require('./router/bookRouter');
var instantCtrl = require('./controller/instantCtrl');
/**
 * 配置中间件
 */
var sessionStore = new redisStore({
  port:cookiecfg.redis_port,
  host:cookiecfg.redis_host
});
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('public'));
app.use(session({
  cookie:{maxAge:30 * 24 * 60 * 60 * 1000},
  resave: true,
  saveUninitialized: true,
  secret: cookiecfg.session_secret,
  store: new redisStore({
    port: cookiecfg.redis_port,
    host: cookiecfg.redis_host
  })
}));
app.use(function(req, res, next) { 
    res.setHeader('Access-Control-Allow-Origin', '*');  
    res.header('Access-Control-Allow-Credentials', true);    
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
     if (req.method == 'OPTIONS') {
       res.send(200); 
     }
    else {
       next();
    }   
});
var sessionScokets = new sessionScoket(io,sessionStore,cookieParser(cookiecfg.session_secret));
sessionScokets.on('connection',instantCtrl.instantMessage);
app.use('/user',userRouter);
app.use('/book',bookRouter);
app.use(function(req, res, next) {
  var err = new Error('没有此页面');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
  	code:500,
  	msg:'没有此页面'
  })
});
if(!module.parent){
  server.listen(3000);
  console.log('listening ' + 3000);
}
module.exports = app;