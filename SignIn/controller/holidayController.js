var mongoose = require('mongoose');
var Holiday = require('../model/holidayModel');
// var Holiday = mongoose.model('holiday');

exports.addHoliday = function (req,res) {
    var newHoliday = Holiday({
        beginTime : req.body.beginTime,
        endTime : req.body.endTime,
        reason : req.body.reason,
        userName: req.body.userName
    });

    newHoliday.save(function (err) {
        if (err) {
            res.json({"status" : "success","msg": "insert db error"});
        } else {
            res.json({"status": "success","msg": "insert success"});
        }
    })
};

exports.getHolidays = function (req,res) {
    var userName = req.body.userName;
    var pageNum = parseInt(req.body.pageNum);
    var pageIndex = parseInt(req.body.pageIndex);

    Holiday.find({userName: userName}).sort({'_id' : -1}).limit(pageNum).skip((pageIndex-1)*pageNum).exec(function (err,doc) {
        if (err) {
            res.json({"status" : "error","msg" : "system error"});
        } else {
            if (doc.isNaN) {
                res.json({"status" : "success","msg" : "empty data"});
            } else {
                res.json({"status" : "success", "msg" : doc});
            }
        }
    })
};