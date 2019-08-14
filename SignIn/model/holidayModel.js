
var mongo = require('../config/mongo');

var holidaySchema = new mongo.Schema({
    beginTime:Date,
    endTime:Date,
    reason:String,
    userName:String
});

module.exports = mongo.model('holiday',holidaySchema);