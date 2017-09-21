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
router.get('/users/:email/:password', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find({ email: req.params.email, password: req.params.password })
            .toArray()
            .then((user) => {
                if (user.length > 0) {
                    var token = jwt.sign({
                        email: user.email
                    }, mySecret);
                    res.cookie('cms_token', token);
                    response.data = [{ email: user[0].email }];
                    res.json(response);
                } else {
                    res.sendStatus(401);
                }
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

require('./page/page.js').pagesRouter(router, connection, response, sendError);

module.exports = router;