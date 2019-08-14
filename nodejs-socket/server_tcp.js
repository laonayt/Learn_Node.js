
var HOST = "127.0.0.1";
var PORT = 33333;
var net = require('net');

var tcp_server = net.createServer();

var sockets = {};
var socketID = 1;

tcp_server.on('connection',function(socket){
    console.log(socket.address());
    sockets[socketID] = socket;
    socketID++;
    DealConnect(socket);
});

tcp_server.on('error',function(data){
    console.log('tcp_server error' + data);
});

tcp_server.on('close',function(){
    console.log('tcp_server close');
});

tcp_server.listen(PORT,HOST,function(){
    console.log('tcp_server running on ' + tcp_server.address().address + ':' + tcp_server.address().port);
});

function DealConnect(socket) {
    socket.on('data',function(data){
        console.log('server receive:' + data.toString());

        socket.write('Hello Client' + socket.address().address);
    });

    socket.on('close',function(){
        console.log(socket.address() +'断开连接');
    });
}