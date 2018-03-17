const express = require('express');
const validate = require('express-validation');
const passport = require('passport');
const init = require('../../passport/init');

init(passport);

const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

router.route('/signup').post(passport.authenticate('signup'), (req, res) => {
  res.status(201).end(JSON.stringify(req.user));
});

router.route('/signup').get((req, res) => {
  res.render('register', { message: req.flash('Please log in') });
});

router.route('/login').get((req, res) => {
  res.render('index', { message: req.flash('Welcome!') });
});

router.route('/login').post(passport.authenticate('login'), (req, res) => {
  res.status(201).end(JSON.stringify(req.user));
});

router.route('/signout').get((req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
