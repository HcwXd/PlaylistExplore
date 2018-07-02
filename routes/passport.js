const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const config = require('./passportConfig.js');
/* database */
const userTable = require('../database/userTable');

function getAvatarURL(facebookId) {
    let url = "http://graph.facebook.com/" + facebookId + "/picture?type=square";
    return url;
}
passport.use(new Strategy({
        clientID: config.CLIENT_ID,
        clientSecret: config.CLIENT_SECRET,
        callbackURL: config.callbackURL
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log(profile);
        console.log(userTable.userExist(profile.id));
        if(userTable.userExist(profile.id)){
            console.log('have existed');
            return cb(null, profile);
        }
        userData = {
            token: profile._json.id,
            userName: profile._json.name,
            avatar: getAvatarURL(profile._json.id)
        }
        userTable.createAccount(userData);
        return cb(null, profile);
    }));

passport.serializeUser(function(user, cb) {
    cb(null, user);
})

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
})

module.exports = passport;
