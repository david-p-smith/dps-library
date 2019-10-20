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
  authRouter.route('/profile')
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;
