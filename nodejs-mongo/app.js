var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var session = require('express-session');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var readerRouter = require('./routes/reader')

var app = express();

// 下面三行设置渲染的引擎模板
app.set('views', __dirname + '/views');//设置模板的目录
app.engine('html',ejs.__express);// 使用ejs引擎解析html文件中ejs语法
app.set('view engine', 'html'); //app.set('view engine', 'pug');// 设置解析模板文件类型：这里为html文件


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//使用 session 中间件
app.use(session({
  secret:'laonayt',
  resave:false,
  saveUninitialized:true,
  cookie:{maxAge:1000*60*3}
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reader',readerRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
