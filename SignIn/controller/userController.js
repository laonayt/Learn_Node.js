
var mongoose = require('mongoose');
var User = require('../model/userModel')

exports.login = function (req,res) {
    var username = req.body.username
    var password = req.body.password

    User.findOne({username:username}, function (err,docs) {
        if (err)  {
            res.json({"status":"error","msg":"system_error"})
        } else if(docs == null) {
            res.json({"status":"error","msg":"not find"})
        } else {
            if (docs.password == password) {
                res.json({"status":"success","msg":""})
            } else {
                res.json({"status":"error","msg":"密码错误"})
            }
        }
    })
}

exports.register = function (req,res) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username:username}, function (err,docs) {
        if (err) {
            res.json({"status":"error","msg":"system_error"})
        } else if (docs == null) {
            var newUser = new User({
                username:username,
                password:password,
                loginDate: new Date(),
                age:30
            });
            newUser.save(function (err) {
                if (err){
                    res.json({"status":"error","msg":"insert db error"})
                } else {
                    res.json({"status":"success","msg":"register_ok"})
                }
            })
        } else {
            res.json({"status":"error","msg":"already_exist"})
        }
    })
}