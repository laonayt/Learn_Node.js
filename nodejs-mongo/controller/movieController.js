var mongodb = require('../mongo/mongodb');
var movieModel = require('../models/movieModel');


exports.addMovie = function (req,res) {
    if (req.params.name) {
        return res.render('movie',{
            title:req.params.name + '|电影|管理|movie.me',
            label:'编辑电影:' + req.params.name,
            movie:req.params.name
        })
    }  else {
        return res.render('movie',{
            title:'新增加|电影|管理|moive.me',
            label:'新增加电影',
            movie:false
        })
    }
}

exports.doAddMovie = function (req,res) {
    var json = JSON.parse(req.body.c_editor);

    if (json._id) {
        console.log('ddd');
    } else {
        movieModel.save(json,function (err) {
            if (err) {
                res.send({'status':'error','msg':err});
            } else {
                res.send({'status':'success'});
            }
        });
    }
}

exports.movieJson = function (req,res) {
    movieModel.findByName(req.params.name,function (err,obj) {
        if (err) {
            res.send({'status':'error','msg':err});
        } else {
            res.send(obj);
        }
    })
}