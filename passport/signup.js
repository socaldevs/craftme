const LocalStrategy = require('passport-local').Strategy;
const db = require('../db/schema.js');
const bCrypt = require('bcrypt-nodejs');

module.exports = passport => {
  let createHash = password => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };
  passport.use(
    'signup',
    new LocalStrategy(
      {
        passReqToCallback: true
      },
      async (req, username, password, done) => {
        const user = await db.User.findOne({ where: { username: username } }); // .then(user => {
        console.log(user);
        if (user) {
          return done(null, `${username} already exists!`);
        } else {
          db.User.create({
            username: username,
            password: createHash(password)
          });
          return done(null, { username: username });
        }
      }
    )
  );
};
