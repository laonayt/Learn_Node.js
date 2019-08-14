var mongooes = require('mongoose')
var config = require('./config')

mongooes.connect(config.mongourl,{useNewUrlParser: true});

mongooes.connection.on('connected',function () {
    console.log('mongo connected to:%s', config.mongourl);
})

mongooes.connection.on('error',function (err) {
    console.log('mongo connect error:%s', err)
})

mongooes.connection.on('disconnected',function () {
    console.log('mongo disconnected');
})

module.exports = mongooes;