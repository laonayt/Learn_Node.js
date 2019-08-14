var express = require('express');
var router = express.Router();
var movieControl = require('../controller/movieController');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',function (req,res) {
  res.render('login',{ title: '用户登录'});
})

router.post('/login',function (req,res) {
  var username = req.body.username;
  var password = req.body.password;
  var user = {
    username:username,
    password:password
  }
  if (username.length && password.length) {
    req.session.user = user;
    return res.redirect('/home')
  } else {
    req.session.error='用户名或密码不正确';
    return res.redirect('/login');
  }
});

router.get('/home',function (req,res) {
  if (req.session.user) {
    // res.render('home',{title:'Home'});
    res.render('home',{user:req.session.user})
  } else {
    res.redirect('login')
  }
});

router.get('/logout',function (req,res) {
  req.session.user = null;
  res.redirect('/login')
});

router.get('/movieAdd',movieControl.addMovie);

router.post('/movieAdd',movieControl.doAddMovie);

router.get('/movieGet',movieControl.movieJson);

module.exports = router;