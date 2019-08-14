
var mongo = require('../config/mongo')

var userSchema = new mongo.Schema({
    username:String,
    password:String,
    loginDate:Date,
    age:Number
})

module.exports = mongo.model('loginUser',userSchema);