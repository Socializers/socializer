/* eslint-disable strict */
'use strict';


// 3rd party dependencies
const express = require('express');
const morgan = require('morgan');

// Middleware
const notFoundHandler = require('./src/middleware/404.js');
const errorHandler = require('./src/middleware/500.js');

// Routes Section
const apiRouter = require('./src/routes/route.js');

// app constant
const app = express();


app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('./public'))
app.use(apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);


module.exports = {
  server:app,
  start: port =>{
    let PORT = port || process.env.PORT || 9797;
    app.listen(PORT, () => console.log(`My name is ${PORT}`));
  },
};