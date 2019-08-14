
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var fs = require("fs")

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("xptest");

    insertVideoTo(dbo)

    insertImgTo(dbo);

    insertTxtTo(dbo);
});

function insertVideoTo(dbo) {
    var array = [];

    for (var i = 0; i < 30; i++) {
        var obj = {
            title: "一起跳舞",
            url: "http://mvvideo11.meitudata.com/5ccd61bd34d8akjcayxrjx6504_H264_1_251e821ce52480.mp4"};
        array.push(obj);
    }

    dbo.collection("精彩视频").insertMany(array, function (err, res) {
        if (err) throw err;
        console.log("Video插入成功");
        // db.close();
    });
}


function insertTxtTo(dbo) {
    var array = [];
    var content = fs.readFileSync('xiaoshuo.txt');

    for (var i = 0; i < 30; i++) {
        var obj = {
            title: "百度百科对文章的解读",
            content: content};
        array.push(obj);
    }

    dbo.collection("精彩文章").insertMany(array, function (err, res) {
        if (err) throw err;
        console.log("Txt插入成功");
        // db.close();
    });
}

function insertImgTo(dbo) {
    var array = [];

    for (var i = 0; i < 30; i++) {
        var obj = {
            title: "百度搜集到的美轮美奂的图片一大片",
            urls: ["https://dwz.cn/9IfukcPu","https://dwz.cn/6ybPzRBq","https://dwz.cn/NUgTditX"] };
        array.push(obj);
    }

    dbo.collection("精彩图集").insertMany(array, function (err, res) {
        if (err) throw err;
        console.log("Img插入成功");
        // db.close();
    });
}
