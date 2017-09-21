const express = require('express');
const router = express.Router();
const app = express();
const session = require('express-session');
const cookies = require('cookies');

const jwt = require('jsonwebtoken');
const mySecret = 'blablabla';

// Connection to DB with MongoDB
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/cms', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

require('./page/page-back.js').pagesRouter(router, connection, response, sendError);

module.exports = router;