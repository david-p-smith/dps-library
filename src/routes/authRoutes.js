const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router() {
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
        } catch (err) {
          debug(err.body);
        }
      }());

      debug(req.body);
      // create user

      // log user in
      req.login(req.body, () => {
        res.redirect('/auth/profile');
      });
    });
  authRouter.route('/profile')
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;
