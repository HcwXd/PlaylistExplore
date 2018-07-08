var express = require('express');
var router = express.Router();
const checkLogin = require('../middlewares/check').checkLogin

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('explore');
});

router.get('/explore', function (req, res, next) {
  res.render('explore');
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.get('/profile', function (req, res, next) {
  let queryId = {
    id: req.query.id
  }
  res.render('profile', queryId);
});

router.get('/signup', function (req, res, next) {
  res.render('signup');
});

router.get('/publish', checkLogin, function (req, res, next) {
  res.render('publish');
});

router.get('/signout', checkLogin, function (req, res, next) {
  req.session.token = null;
  return res.redirect('/explore');
});


module.exports = router;