// app being passed in
// only additional deps. are required

const passport = require('passport');

module.exports = function passportConfig(app) {

  app.use(passport.initialize());

  // Stores user in session
  passport.serializeUser(

  );

  // Retrieves user from session
  passport.deserializeUser(

  );

};
