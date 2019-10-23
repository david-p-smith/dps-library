const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');
const bookController = require('../controllers/bookController');

const bookRouter = express.Router();

function router(nav) {
  const { getIndex, getById } = bookController(nav);
  bookRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });
  // routing
  bookRouter.route('/')
    .get((req, res) => {
      getIndex(req, res);
    });

  bookRouter.route('/:id')
    .all((req, res, next) => {
      // middleware here
      // do processing
      // add values needed in get to req object.  e.g. rec.book = recordset
      next();
    })
    .get((req, res) => {
      getById(req, res);
    });

  return bookRouter;
}

module.exports = router;
