var mongo = require('../config/mongo');

var userSchema = new mongo.Schema({
    username: String,
    password: String,
    loginDate: Date
});

module.exports = mongo.model('user',userSchema);