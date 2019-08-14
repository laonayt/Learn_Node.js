var HOST = '127.0.0.1';
var PORT = 33333;
var net = require('net');

var tcp_client = net.createConnection(PORT,HOST);

tcp_client.on('connect',function(){
    console.log('client connect to server');
});

tcp_client.on('data',function(data){
    console.log('client receive:' + data);
});

tcp_client.on('close',function(data){
    console.log('disconnect');
});

tcp_client.end('hello im client');