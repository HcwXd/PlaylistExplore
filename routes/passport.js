const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const fs = require('fs');
const config = require('./passportConfig.js');
/* database */
const userTable = require('../database/userTable');

function getAvatarURL(facebookId) {
    let url = "http://graph.facebook.com/" + facebookId + "/picture?type=large";
    return url;
}
passport.use(new Strategy({
        clientID: config.CLIENT_ID,
        clientSecret: config.CLIENT_SECRET,
        callbackURL: config.callbackURL
    },
    async function(accessToken, refreshToken, profile, cb) {
        console.log(profile.id);
        if(await userTable.userExist(profile.id)){
            console.log('have existed');
            return cb(null, profile);
        }
        userData = {
            token: profile._json.id,
            userName: profile._json.name,
            avatar: getAvatarURL(profile._json.id)
        }
        let path = __dirname + "../public/img/" + profile._json.id + '/';
        fs.mkdirSync(path);
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
