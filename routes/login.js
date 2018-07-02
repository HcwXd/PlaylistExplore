const express = require('express');
const router = express.Router();
/* login */
const passport = require('./passport');

router.use(passport.initialize());
router.use(passport.session());

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/return',
    passport.authenticate('facebook', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        res.redirect('/');
    }
);

module.exports = router;
