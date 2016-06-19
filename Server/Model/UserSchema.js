var exports = module.exports = {};
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.UserSchema = new Schema({
    username: {type: String},
    password: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    facebook : {
        token : String,
        id : String,
        displayName : String
    },
    email: {type: String},
    roles: [String]
}, {collection: 'user'});
