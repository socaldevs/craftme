const passport = require('passport'),
  localStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt-nodejs');
const db = require('../db/schema.js');

const isValidPassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
};

module.exports = function(passport) {
  passport.use(
    'login',
    new localStrategy(
      {
        passReqToCallback: true
      },
      async (req, username, password, done) => {
        const user = await db.User.findOne({ where: { username: username } });
        if (!user) {
          return done(null, false);
        }
        if (user) {
          if (!isValidPassword(user, password)) {
            return done(null, false);
          }
          if (isValidPassword(user, password)) {
            return done(null, { username: username });
          }
        }
      }
    )
  );
};
