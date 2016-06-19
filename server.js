var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var multer = require('multer');
var upload = multer({ dest: './uploads' });

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var externalResources = require("./Server/resources/resources.js");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(session({secret : 'this is a secret'}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

/* Configure the database*/
mongoose.connect(externalResources.reources['connectionUrl']);


app.use(express.static(__dirname + '/public'));

app.listen(3000);


// app.get('/', function(req, res){
//     res.send('hello world');
// });


// get DAO
var userDAO = require('./Server/DAO/UserDao.js');



passport.use(new LocalStrategy(function (username, password, done) {
    // for (var u in users) {
    //     if (username == users[u].username && password == users[u].password) {
    //         return done(null, users[u]);
    //     }
    // }
    // return done(null, false, {message : 'Unable to login'});

    userDAO.service.isValidUser(username, password).then(function(user) {
        if (!user) {
            return done(null, false, {message : 'Unable to login'});
        } else {
            return done(null, user);
        }
    }).catch (function(error) {
        if (error) {
            return done(error);
        }
    });

}));

var facebookConfig = {
    clientID : 'YOUR APP ID/ YOUR CLIENT ID',
    clientSecret : 'YOUR CLIENT SECRET',
    callbackURL : '/auth/facebook/callback'
};

passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));

// managing the session back and forth be user and server
passport.serializeUser(function(user, done) {
   done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.post('/login', passport.authenticate('local') , function(req, res) {
    var user = req.user;
    console.log(user);
    return res.json(user);
});

var auth = function(req, res, next) {
    if (!req.isAuthenticated()){
        res.send(401);
    } else {
        next();
    }
};


app.get('/rest/user', auth, function(req, res) {
   res.json(users);
});

// mocking users
var users = [
    {username : "alice", password : "alice", firstName : 'Alice', lastName : 'In Wonderland'},
    {username : "bob", password : "bob", firstName : 'Bob', lastName : ''},
    {username : "charlie", password : "charlie", firstName : 'Charlie', lastName : ''}
];

app.get("/auth/facebook", passport.authenticate('facebook'));

app.get("/auth/facebook/callback", passport.authenticate('facebook', {
    successRedirect : '/#/profile',
    failureRedirect : '/#/login'
}));


function facebookLogin (token, refreshToken, profile, done) {
    console.log(profile);
    userDAO.service.findFacebookUser(profile.id)
        .then(function (facebookUser) {
            if (facebookUser) {
                return done(null, facebookUser);
            } else {
                facebookUser = {
                    username: profile.displayName.replace(/ /g, ''),
                    facebook : {
                        token : token,
                        id : profile.id,
                        displayName : profile.displayName
                    }
                };
                userDAO.service.createUser(facebookUser).then(function(newUser){
                    return done(null, newUser);
                }).catch(function(error) {
                   console.log(error);
                });
            }
        }).catch(function(error) {

    });
}