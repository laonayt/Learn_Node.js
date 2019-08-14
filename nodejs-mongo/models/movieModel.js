var mongoose = require('../mongo/mongodb');

var movieSchema = new mongoose.Schema({
    name           : String,
    alias   	    : [String],
    publish       : Date,
    create_date	  : { type: Date, default: Date.now},
    images        :{
        coverSmall:String,
        coverBig:String,
    },
    source        :[{
        source:String,
        link:String,
        swfLink:String,
        quality:String,
        version:String,
        lang:String,
        subtitle:String,
        create_date  : { type: Date, default: Date.now }
    }]

});

var Movie = mongoose.model('Movie',movieSchema);

exports.save = function (objc,callback) {
    var newMovie = new Movie(objc);

    newMovie.save(function (err) {
        callback(err);
    })
}

exports.findByName = function (name,callback) {
    Movie.findOne({name:name},function (err,doc) {
        callback(err,doc);
    })
}