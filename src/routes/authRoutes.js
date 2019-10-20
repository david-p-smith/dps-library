const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      debug(req.body);
      // create user

      // log user in
      req.login(req.body);
      res.json(req.body);
    });
  return authRouter;
}

module.exports = router;
