var mongoose = require('mongoose');
var dburl = 'mongodb://127.0.0.1:27017/token';

mongoose.connect(dburl,{useNewUrlParser:true});

mongoose.connection.on('connected',function () {
    console.log('mongo connected to:%s', dburl);
});

mongoose.connection.on('error',function (err) {
    console.log('mongo connect error:%s', err)
});

mongoose.connection.on('disconnected',function () {
    console.log('mongo disconnected');
});

module.exports = mongoose;