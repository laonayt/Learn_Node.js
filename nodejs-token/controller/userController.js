var mongo = require('../config/mongo');
var user = require('../model/user');
var JwtUtil = require('../utils/jwt');

exports.login = function (req,res) {
    var username = req.body.username;
    var password = req.body.password;
    user.findOne({username:username},function (err,docs) {
       if (err) {
           res.send('system error');
       }
       else if (docs == null) {
           res.send({status:404,msg:'账号不存在'});
       }
       else {
           if (docs.password == password) {
               let _id = docs._id.toString();
               let jwt = new JwtUtil(_id);
               let token = jwt.generateToken(jwt);
               res.send({status:200,msg:'登录成功',token:token});
           } else {
               res.send({status: 400,msg:'密码错误'});
           }
       }
    });
};

exports.register = function (req,res) {
    var username = req.body.username;
    var password = req.body.password;
    user.findOne({username:username},function (err,docs) {
        if (err) {
            res.send('system error');
        } else if (docs == null) {
            var newUser = new user({
                username: username,
                password: password,
                loginDate: new Date(),
            });
            newUser.save(function (err) {
               if (err) {
                   res.send('insert db error');
               }  else {
                   res.send('insert db success');
               }
            });
        } else {
            res.send('already exists');
        }
    })
};


exports.homelist = function (req,res) {
    res.send({status:200,msg:'测试'});
};