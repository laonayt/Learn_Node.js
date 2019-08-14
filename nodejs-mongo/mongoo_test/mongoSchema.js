
var mongo = require('./mongo');

var imgSchema = new mongo.Schema({
    title : String,
    urls : [String]
});

var imgModle = mongo.model('img',imgSchema)

module.exports = {
    imgModle
}
