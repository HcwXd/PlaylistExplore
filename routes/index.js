var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('explore/explore');
});

router.get('/explore', function (req, res, next) {
  res.render('explore/explore');
});

router.get('/login', function (req, res, next) {
  res.render('login/login');
});

router.get('/profile', function (req, res, next) {
  res.render('profile/profile');
});

router.get('/signup', function (req, res, next) {
  res.render('signup/signup');
});

router.get('/publish', function (req, res, next) {
  res.render('publish/publish');
});


module.exports = router;