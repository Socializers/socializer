/* eslint-disable strict */
'use strict';
let FACEBOOK_APP_ID= 609873966537501;
let FACEBOOK_APP_SECRET= '28d08be6ce839590e4418031b17ff74f';
let passport = require('passport')
    , Facebookstrategy = require('passport-facebook').Strategy;
module.exports= passport.use(new Facebookstrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL:" http://localhost:3000/auth/facebook/callback"
},
    function (accessToken, refreshToken, profile, done) {
        User.findOrCreate(... function (err, user) {
            if (err) { return done(err); }
            done(null, user);
        });
    }
));