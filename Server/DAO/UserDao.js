(function () {
    var exports = module.exports = {};
    var mongoose = require('mongoose');

    var User = require("../Model/UserSchema.js");
    var userModel = mongoose.model('user', User.UserSchema);

    exports.service = {
        isValidUser: isValidUser,
        findFacebookUser: findFacebookUser,
        createUser: createUser
    };


    function isValidUser(username, password) {
        return userModel.findOne({username: username, password: password}, function (error, artist) {
            if (!error) {
                return artist;
            } else {
                return error;
            }
        });
    }

    function findFacebookUser (id) {
        return userModel.findOne({"facebook.id" : id});
    }

    function createUser(user) {
        return userModel.create(user);
    }

})();

