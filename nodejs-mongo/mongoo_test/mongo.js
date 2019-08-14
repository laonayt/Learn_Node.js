var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/testlogin',{useNewUrlParser: true})

mongoose.connection.on('connected',function () {
    console.log('mongo connected');
})

mongoose.connection.on('error',function (err) {
    console.log('mongo connect error:%s', err)
})

mongoose.connection.on('disconnected',function () {
    console.log('mongo disconnected');
})

module.exports = mongoose;
