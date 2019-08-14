var mongo = require('./sampleMongo');

var UserSchema = new mongo.Schema({
    username:String,
    password:String,
    age:Number,
    loginDate:Date
});

module.exports = mongo.model('user',UserSchema);