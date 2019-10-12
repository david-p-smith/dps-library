const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// morgan config - request logging
app.use(morgan('tiny'));
// set up static directory - css and js
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
// templating config
app.set('views', './src/views');
app.set('view engine', 'pug');

// get requests / routing
app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, '/views/index.html'));
  res.render('index', { title: 'MyLibrary', list: ['a', 'b'] });
});

app.listen(port, () => {
  debug(`Express listening at port ${chalk.green(port)}`);
});
