const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const nav = [
  { link: '/books', title: 'Book' },
  { link: '/authors', title: 'Author' }
];
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);

// morgan config - request logging
app.use(morgan('tiny'));

// middleware example
app.use((req, res, next) => {
  debug('my middleware');
  next();
});

// set up static directory - css and js
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
// templating config
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
// get requests
app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, '/views/index.html'));
  res.render(
    'index',
    {
      title: 'Library',
      nav
    }
  );
});

app.listen(port, () => {
  debug(`Express listening at port ${chalk.green(port)}`);
});
