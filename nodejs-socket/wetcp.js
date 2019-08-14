var util = require('util');

function WEtcp(socket) {
    var parse_setp = WEtcp.PARSE_SETP.HEADER;
    var receive_buf = new Buffer(0);
    var header = null;
    var body = null;
    this.socket = socket;

    function parsePacket(func){
        if(receive_buf.length > WEtcp.HEADER_LENGTH) {
            header = {bodyLength: receive_buf.readInt16LE(0)};
            receive_buf = receive_buf.slice(WEtcp.HEADER_LENGTH);
            parse_setp = WEtcp.PARSE_SETP.BODY;
            parseBody(func);
        }
    }

    function parseBody(func){
        if(receive_buf.length > header.bodyLength) {
            var packet = receive_buf.toString('utf8',0,header.bodyLength);
            
            receive_buf = receive_buf.slice(header.bodyLength);
            try {
                var msg = JSON.parse(packet);
                func(msg);
            } catch(e) {
                util.log(e);
            }
            header = null;
            body = null;
            parse_setp = WEtcp.PARSE_SETP.HEADER;
            parsePacket(func);
        }
    }

    this.receiveData = (data,func) => {
        if(!func) func = msg =>undefined;
        receive_buf = Buffer.concat([receive_buf,data]);
        if(parse_setp == WEtcp.PARSE_SETP.HEADER) {
            parsePacket(func);
        } else {
            parseBody(func);
        }
    }

    this.sendData = msg => {
        var packet = JSON.stringify(msg);
        var body_buf = new Buffer(packet);
        var head_buf = new Buffer(WEtcp.HEADER_LENGTH);
        head_buf.writeUInt16LE(body_buf.length);
        var snd_buf = Buffer.concat([head_buf, body_buf]);
        this.socket.write(snd_buf);
    }

    this.destroy = () => {
        delete this.socket;
    }
}

WEtcp.HEADER_LENGTH = 4;
WEtcp.PARSE_SETP = {
    HEADER:0,
    BODY:1
};

exports.WEtcp = WEtcp;