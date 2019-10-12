const express = require('express');

const bookRouter = express.Router();

// books
const books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
  },
  {
    title: 'Les Misérables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    read: false
  },
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    read: false
  },
  {
    title: 'A Journey into the Centre of the Earth',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    read: false
  },
  {
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    read: false
  },
  {
    title: 'The Wind in the Willows',
    genre: 'Fantasy',
    author: 'Kenneth Grahame',
    read: false
  },
  {
    title: 'Life of a Development Manager',
    genre: 'Reality',
    author: 'David Smith',
    read: true
  }

];

// routing
bookRouter.route('/')
  .get((req, res) => {
    res.render(
      'books',
      {
        title: 'Library',
        nav: [{ link: '/books', title: 'Books' }, { link: '/authors', title: 'Authors' }],
        books
      }
    );
  });

bookRouter.route('/single')
  .get((req, res) => {
    res.send('hello single book');
  });

module.exports = bookRouter;