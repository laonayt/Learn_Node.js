var app = require('app');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

io.on('connection',function (socket) {
    socket.emit('socket open');

    var client = {
        socket:socket,
        name:false,
        color:getColor()
    }

    socket.on('message',function (msg) {
        var obj = {time:getTime(),color: getColor()};

        if (!client.name) {
            client = msg;
            client['text'] = msg;
            obj['author'] = 'System';
            obj['type'] = 'welcome';

            socket.emit('system',obj);

            socket.broadcast.emit('system',obj);

        } else {
            client['text'] = msg;
            client['author'] = client.name;
            client['type'] = 'message';

            socket.emit('message',obj);

            socket.broadcast.emit('message',obj);
        }

    });


    socket.on('disconnect',function () {
        var obj = {
            time:getTime(),
            color:client.color,
            author:'System',
            text:client.name,
            type:'disconnect'
        };

        socket.broadcast.emit('system',obj);
    });

});

app.get('/', function(req, res){
    res.sendfile('views/chat.html');
});

var getTime=function(){
    var date = new Date();
    return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
};

var getColor=function(){
    var colors = ['aliceblue','antiquewhite','aqua','aquamarine','pink','red','green',
        'orange','blue','blueviolet','brown','burlywood','cadetblue'];
    return colors[Math.round(Math.random() * 10000 % colors.length)];
};
