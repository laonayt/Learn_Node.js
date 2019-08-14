/**
 * script: spsvr.js
 * description: SPtcp服务器端
 * authors: alwu007@sina.cn
 * date: 2016-04-15
 */
 
var util = require('util');
var net = require('net');
var SPtcp = require('./sptcp').SPtcp;
 
var server = net.createServer(client => {
    util.log('client connected: ' + client.remoteAddress);
    //套接字继承SPtcp
    SPtcp.call(client, client);
    //监听data事件
    client.on('data', data => {
        client.spReceiveData(data, msg => {
            util.log('susl msg: ' + util.inspect(msg));
            client.spSendData(msg);
        });
    });
    //监听结束事件
    client.on('end', () => {
        util.log('disconnected from client: ' + client.remoteAddress);
        client.spDestroy();
    });
    //监听错误事件
    client.on('error', err => {
        util.log(err);
        client.end();
    });
});
 
var listen_options = {
    host: '127.0.0.1',
    port: 6200,
};
util.log('listen options: ' + util.inspect(listen_options));
server.listen(listen_options, () => {
    util.log('server bound');
});