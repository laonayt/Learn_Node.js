var net = require('net');
var util = require('util');
var wetcp = require('./wetcp').WEtcp;

var options = {
    host:'127.0.0.1',
    port:8080
};

util.log('connect options:' + util.inspect(options));

var client = net.connect(options,function(){

    wetcp.call(client,client);

    client.on('data',function(data){

        client.receiveData(data,function(msg){
            util.log('client receive msg:' + util.inspect(msg));
        });
    });

    client.on('end',function(){
        util.log('disconnect from server :' + client.remoteAddress);
        client.destroy();
    });

    client.on('error',function(err){
        util.log(err);
        client.end();
    });

    for(var i=0; i<10; i++){
        var msg = {op:'client send',msg:'hello 你妹',times:i};
        client.sendData(msg);
    }

    client.end();
});