const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router() {
    authRouter.route('/signUp')
        .post((req, res) => {

        });
};

module.exports router;