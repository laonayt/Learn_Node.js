var app = require('express')();

app.get('/',function (req,res) {
    res.send('Hello Word');
})

var server = app.listen(8000,function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('server running on:', + host)
})


// module.exports = server;


// var http = require('http');
//
// http.createServer(function (request,response) {
//
// })