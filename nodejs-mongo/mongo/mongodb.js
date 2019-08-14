
var mongooes = require('mongoose');

mongooes.connect('mongodb://localhost:27017/jsonToDB',{ useNewUrlParser: true });

mongooes.connection.on('connected',function () {
    console.log('mongo connected');
})

mongooes.connection.on('error',function () {
    console.log('mongo connect error');
})

mongooes.connection.on('disconnected',function () {
    console.log('mongo disconnected');
})

module.exports = mongooes;

// exports.mongoose = mongooes;