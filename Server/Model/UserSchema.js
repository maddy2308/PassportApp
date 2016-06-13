var exports = module.exports = {};
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    roles: [String]
}, {collection: 'user'});
