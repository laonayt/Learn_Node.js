var net = require('net');
var util = require('util');
var wetcp = require('./wetcp').WEtcp;

var options = {
    host:'127.0.0.1',
    port:8080
};

var server = net.createServer(function(client){
    util.log('client connected: ' + client.remoteAddress);

    wetcp.call(client,client);

    client.on('data',function(data){
        client.receiveData(data,function(msg){
            util.log('server receive msg: ' + util.inspect(msg));
            client.sendData({op:'server back',msg:'im ok'});
        });
    });

    client.on('end',function(){
        util.log('client disconnected: ' + client.remoteAddress);
        client.destroy();
    });

    client.on('error',function(err){
        util.log(err);
        client.end();
    });
});

server.listen(options,function(){
    util.log('server listen on: ' + options.host + ':' + options.port);
})