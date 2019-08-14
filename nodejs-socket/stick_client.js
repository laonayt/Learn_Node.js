var net = require('net');

var tcp_client = net.createConnection({port:8080,host:'127.0.0.1'},function(){
    const body = Buffer.from('username=123&password=1234567,qwe');
    const header = new Buffer(4);
    header.writeUInt32BE(body.byteLength,0);
    console.log('header:' + header.readUInt32BE());
    tcp_client.write(header);
    tcp_client.write(body);
});

tcp_client.on('data',function(data){
    console.log(data.toString());
});

tcp_client.on('end',function(){
    console.log('disconnect');
})