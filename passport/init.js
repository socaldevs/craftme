const login = require('./login.js');
const signup = require('./signup.js');
const db = require('../db/schema.js');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    console.log('serializing user: ', user);
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    db.User.findById(id, (err, user) => {
      console.log('deserializing user: ', user);
      done(err, user);
    });
  });

  login(passport);
  signup(passport);
};
