var express = require('express');
var userContriller = require('../controller/userController');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test',function (req,res,next) {
  res.send('request test success');
});

router.post('/login',userContriller.login);

router.post('/register',userContriller.register);

router.post('/homelist',userContriller.homelist);


module.exports = router;
