var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get', function (req, res, next) {
  res.send({'msg' : 'success','data' : {'id' : '1', 'name' : 'we', 'age' : '10'}})
});

router.post('/post', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  if (username && password) {
    res.send({
      'msg' : 'success',
      'username' : username,
      'password' : password,
      'list' :
          [{'id' : '1','title' : '小二'}
          ,{'id' : '2','title' : '张三'}]
    });
  } else {
    res.send({'msg' : 'error'});
  }

})

module.exports = router;
