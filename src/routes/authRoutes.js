const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      //new async function ((){}())
      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to db server');

          const db = client.db(dbName);

          const col = db.collection('users');
          const user = { username, password };
          // create user
          const results = await col.insertOne(user);
          debug(results);
          // log user in
          req.login(results.ops[0], () => { //results.ops[0] -> new record inserted into db
            res.redirect('/auth/profile');
          });
        } catch (err) {
          debug(err);
        }
      }());

      debug(req.body);
    });
  authRouter.route('/signin')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'signIn'
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));
  authRouter.route('/signout')
    .post((req, res) => {
      req.logout();
      res.redirect('/');
    });
  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;
