// app being passed in
// only additional deps. are required

const passport = require('passport');
require('./strategies/local.strategy')();

module.exports = function passportConfig(app) {

  app.use(passport.initialize()); // creates e.g. login on request - i.e. req.login
  app.use(passport.session());

  // Stores user in session
  passport.serializeUser((user, done) => {

    // skeleton - done(err, thing)
    done(null, user); //could use just user.id for efficiency
  });

  // Retrieves user from session
  passport.deserializeUser((user, done) => { //if only id used, this would be userId - followed by a function to find user by id and load from db

    // skeleton - done(err, thing)
    done(null, user); //could use just user.id for efficiency
  });
};
