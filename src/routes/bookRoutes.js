const express = require('express');
const bookController = require('../controllers/bookController');
const bookService = require('../services/goodreadsService');

const bookRouter = express.Router();

function router(nav) {
  const { getIndex, getById, middleware } = bookController(bookService, nav);
  bookRouter.use(middleware);
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
