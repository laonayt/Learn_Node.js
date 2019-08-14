
var createError = require('http-errors');
var logger = require('morgan');
var path = require('path');

var app =require('express')();
var indexRouter = require('./routes');
var bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/',indexRouter);
app.use(function (req,res,next) {
    next(createError(404));
});
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

app.use(logger('dev'));

// var Holiday = require('./model/holidayModel');
// for (var i = 0;i<100;i++) {
//
//     var newHoliday = new Holiday({
//         beginTime : new Date(),
//         endTime: Date(),
//         reason: "原因" + i,
//         userName: "we"
//     });
//     newHoliday.save(function (err) {
//         if (err) {
//             console.log("创建失败");
//         } else {
//             console.log("创建成功");
//         }
//     });
// }

module.exports = app;