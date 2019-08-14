var net = require('net');
var stick = require('stickpackage').stick;

var tcp_server = net.createServer();

tcp_server.on('connection',function(socket){
    dealSocket(socket);
});

tcp_server.on('close',function(){
    console.log('server close');
});

tcp_server.listen(8080);

function dealSocket(socket) {
    socket.stick = new stick(1024).setReadIntBE('32');
    socket.on('data',function(data){
        socket.stick.putData(data);
    });

    socket.stick.onData(function(data){
        const header = new Buffer(4);
        data.copy(header,0,0,4);

        const body = new Buffer(header.readInt32BE());
        data.copy(body,0,4,header.readInt32BE());

        console.log('header:' + header.readInt32BE());
        console.log('body:',body.toString());
    });
};