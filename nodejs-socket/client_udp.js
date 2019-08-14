var PORT = '33333';
var HOST = '127.0.0.1';

var dgram = require('dgram');
var client = dgram.createSocket('udp4');

client.send('im ok', PORT, HOST, function (err, bytes) {
   if (err) throw err;
   console.log('UDP message send to' + HOST + ':' + PORT);
   client.close();
});

client.bind(function () {
    client.setBroadcast(true);
    client.send('我是广播', PORT, '255.255.255.255',function (err) {
        if (err) throw err;
        console.log('已经发生广播');
        client.close();
    });
});