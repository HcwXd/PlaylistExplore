var express = require('express');
var router = express.Router();
const checkLogin = require('../middlewares/check').checkLogin;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('explore');
});

router.get('/explore', function(req, res, next) {
    res.render('explore');
});

router.get('/exploreA', function(req, res, next) {
    res.render('explore-floating');
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.get('/homepage', function(req, res, next) {
    res.render('homepage');
});

router.get('/profile', function(req, res, next) {
    let queryId = {
        id: req.query.id,
    };
    res.render('profile', queryId);
});

router.get('/signup', function(req, res, next) {
    res.render('signup');
});

router.get('/publish', function(req, res, next) {
    res.render('publish');
});

router.get('/publishA', function(req, res, next) {
    res.render('publish-a');
});

router.get('/friend', checkLogin, function(req, res, next) {
    res.render('friend');
});

router.get('/edit', checkLogin, function(req, res, next) {
    res.render('edit');
});

router.get('/signout', checkLogin, function(req, res, next) {
    req.session.token = null;
    return res.redirect('/explore');
});

module.exports = router;
