const express = require('express');
const router = express.Router();
/* login */
const passport = require('./passport');

function getAvatarURL(facebookId) {
    let url = "http://graph.facebook.com/" + facebookId + "/picture?type=large";
    return url;
}

router.use(passport.initialize());
router.use(passport.session());

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/return',
    passport.authenticate('facebook', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        let userInfo = {
            userName: req.user._json.name,
            token: req.user._json.id,
            avatar: getAvatarURL(req.user._json.id),
            bio: ''
        }
        req.session.token = userInfo.token;
        req.session.userName = userInfo.userName;
        req.session.avatar = userInfo.avatar;
        res.redirect('/explore');
    }
);

module.exports = router;
