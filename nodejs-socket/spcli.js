/**
 * script: spcli.js
 * description: SPtcp客户端
 * authors: alwu007@sina.cn
 * date: 2016-04-15
 */
 
var util = require('util');
var net = require('net');
var SPtcp = require('./sptcp').SPtcp;
 
var connect_options = {
    host: '127.0.0.1',
    port: 6200,
    localPort: 6201,
};
util.log('connect options: ' + util.inspect(connect_options));
var client = net.connect(connect_options, ()=>{
    //套接字继承SPtcp
    SPtcp.call(client, client);
    //监听data事件
    client.on('data', data => {
        client.spReceiveData(data, msg => {
            util.log('susl msg: ' + util.inspect(msg));
        });
    });
    //监听结束事件
    client.on('end', () => {
        util.log('disconnected from server: ' + client.remoteAddress);
        client.spDestroy();
    });
    //监听错误事件
    client.on('error', err => {
        util.log(err);
        client.end();
    });
    //发送消息
    for (var i=0; i<10; i++) {
        var msg = {op:'test', msg:'hello, 草谷子!', times:i};
        client.spSendData(msg);
    }
    //关闭连接
    client.end();
});