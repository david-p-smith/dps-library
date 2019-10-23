const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');
const bookController = require('../controllers/bookController');

const bookRouter = express.Router();

function router(nav) {
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
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;

        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to Mongo server');

          const db = client.db(dbName);

          const col = await db.collection('books');

          const books = await col.find().toArray();

          res.render(
            'bookListView',
            {
              title: 'Library',
              nav,
              books
            }
          );
        } catch (err) {
          debug(err.stack);
        }

        client.close();
      }());
    });

  bookRouter.route('/:id')
    .all((req, res, next) => {
      // middleware here
      // do processing
      // add values needed in get to req object.  e.g. rec.book = recordset
      next();
    })
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;

        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to Mongo server');

          const db = client.db(dbName);

          const col = await db.collection('books');

          const book = await col.findOne({ _id: new ObjectID(id) });

          debug(book);

          res.render(
            'bookView',
            {
              title: 'Library',
              nav,
              book
            }
          );
        } catch (err) {
          debug(err.stack);
        }
      }());
    });

  return bookRouter;
}

module.exports = router;
