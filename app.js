const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();

// morgan config - request logging
app.use(morgan('tiny'));
// set up static directory - css and js
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
// templating config
app.set('views', './src/views');
app.set('view engine', 'ejs');

// routing
bookRouter.route('/')
  .get((req, res) => {
    res.render('books');
  });

bookRouter.route('/single')
  .get((req, res) => {
    res.send('hello single book');
  });

app.use('/books', bookRouter);
// get requests
app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, '/views/index.html'));
  res.render(
    'index',
    {
      title: 'Library',
      nav: [{ link: '/books', title: 'Books' }, { link: '/authors', title: 'Authors' }]
    }
  );
});

app.listen(port, () => {
  debug(`Express listening at port ${chalk.green(port)}`);
});
