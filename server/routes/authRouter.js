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
  res.status(201).send(req.user);
});

router.route('/signup').get((req, res) => {
  res.status(201).send('Please make an account');
});

router.route('/login').get((req, res) => {
  res.status(201).send('Log in please');
});

router.route('/login').post(passport.authenticate('login'), (req, res) => {
  res.status(201).send(req.user);
});

router.route('/signout').get((req, res) => {
  req.logout();
  res.send('Logged out!');
});

module.exports = router;
