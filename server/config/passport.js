// const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../model/User');
const key = require('./keys').secret;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

module.exports = passport => {
    passport.use( 
        new JwtStrategy(opts, (jwt_payload, done) => {
            // User.findById(jwt_payload._id).then(user => {
            User.findById(jwt_payload._id).populate("timers").then(user => {
                if(user) return done(null, user); // null since no error
                return done(null, false);
            }).catch( err => {
                console.log(err);
            });
        }));
};