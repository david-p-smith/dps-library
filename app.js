var express = require('express');
var chalk = require('chalk');
var debug = require('debug')('app');

var app = express();

//get requests / routing
app.get('/', function (req, res) {
    res.send('Hello from my library app');
});

app.listen(3000, function () {
    debug(`Express listening on port ${chalk.green('3000')}`);
});