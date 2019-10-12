var express = require('express');

var app = express();

//get requests / routing
app.get('/', function (req, res) {
    res.send('Hello from my library app');
});