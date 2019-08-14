var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/video',function (req,res) {
    var videoName = req.query.name;
    res.writeHead(200, {'Content-Type' : 'video/mp4'});
    var rs = fs.createReadStream( './public/' + videoName + '.mp4');
    rs.pipe(res);
    rs.on('end',function () {
       res.end();
    });
});

module.exports = router;