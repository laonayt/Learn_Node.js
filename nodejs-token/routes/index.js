var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/gettest',function (req, res, next) {
  res.send({status:200,msg:req.query});
});


module.exports = router;
