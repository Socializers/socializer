/* eslint-disable no-unused-vars */
/* eslint-disable strict */
'use strict';

// 3rd party dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Middleware
const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');

// Routes Section
const apiRouter = require('./routes/route.js');

// app constant
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(apiRouter);
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(notFoundHandler);
app.use(errorHandler);
app.set('view engine', 'ejs');

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`My name is ${PORT}`));
  },
};