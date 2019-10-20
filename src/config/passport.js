// app being passed in
// only additional deps. are required

const passport = require('passport');

module.exports = function passportConfig(app) {

  app.use(passport.initialize());
  app.use(passport.session());

  // Stores user in session
  passport.serializeUser((user, done) => {

    // skeleton - done(err, thing)
    done(null, user); //could use just user.id for efficiency
  });

  // Retrieves user from session
  passport.deserializeUser(

  );

};
