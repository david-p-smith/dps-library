const express = require('express');
const mongoClient = require('mongodb');

const adminRouter = express.Router();

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      res.send('inserting books');
    });

  return adminRouter;
}

module.exports = router;