var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // var type = file.mimetype.split('/').pop();
        // cb(null, file.fieldname + '.' + type);
        cb(null, file.originalname);
    }
});

var upload = multer({storage:storage});

//下载1
router.get('/download1',function (req, res, next) {
    var filename = req.query.filename;
    var path = './uploads/' + filename;

    res.writeHead(200,{
        'Content-Type' : 'applocation/octet-stream',
        'Content-Disposition' : 'attachment; filename=' + encodeURI(filename),
    });

    var readStream = fs.createReadStream(path);

    readStream.on('data',(chunk) => {
       res.write(chunk,'binary');
    });

    readStream.on('end',() => {
        res.end();
    });
});

router.get('/download2',function (req, res, next) {
    var filename = req.query.filename;
    var path = './uploads/' + filename;
    var f = fs.createReadStream(path);
    res.writeHead(200,{
        'Content-Type' : 'application/force-download',
        'Content-Disposition' : 'attachment; filename=' + filename,
    });
    f.pipe(res);
});

router.post('/upload',upload.single('file'),function (req, res, next) {
    res.send({status: 200, msg:'upload'});
});

router.post('/uploadmore',upload.array('file',2),function (req, res, next) {
    res.send({status:200, msg:'uploadmore'});
});

module.exports = router;