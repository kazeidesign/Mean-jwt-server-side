const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

// API file for interacting with MongoDB
const api = require('./server/routes/api');
const back = require('./server/routes/back');

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const mySecret = 'blablabla';
const auth = expressJwt({
  secret: mySecret
});
const cookies = require('cookies');
const cookieParser = require('cookie-parser');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'admin')));


app.use(cookieParser())

// API location
app.use('/api', api);
app.use('/back', auth, back);

// Send all other requests to the Angular app
app.get('/login', (req, res) => {
  // res.sendFile(path.join(__dirname, 'dist/index.html'));
  var token = req.cookies.cms_token;
  if (token) {
    jwt.verify(token, mySecret, function (err, decoded) {
      res.status(200).redirect('/admin');
    });
  } else {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  }
});

app.get('/admin', (req, res, next) => {
  var token = req.cookies.cms_token;
  if (token) {
    jwt.verify(token, mySecret, function (err, decoded) {
      if (err) {
        console.error('JWT Verification Error ', err);
        return res.status(403).send(err);
      } else {
        req.decoded = decoded;
        res.sendFile(path.join(__dirname, 'dist/index.html'));
        return next();
      }
    });
  } else {
    res.status(200).redirect('/login');
  }
});

app.get('/admin/*', (req, res, next) => {
  var token = req.cookies.cms_token;
  if (token) {
    jwt.verify(token, mySecret, function (err, decoded) {
      if (err) {
        console.error('JWT Verification Error ', err);
        return res.status(403).send(err);
      } else {
        req.decoded = decoded;
        res.sendFile(path.join(__dirname, 'dist/index.html'));
        return next();
      }
    });
  } else {
    res.status(200).redirect('/login');
  }
});

app.get('/logout', (req, res) => {
  res.clearCookie('cms_token');
  res.status(200).redirect('/login');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
