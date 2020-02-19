/* eslint-disable no-unused-vars */
/* eslint-disable strict */
'use strict';

const base64 = require('base-64');
const User = require('./user.js');

module.exports = (req, res, next) => {
  console.log('req', req.body);
  let user = req.body.username;
  User.find({ 'username': user })
    .then(validUser => {
      console.log('ssssssss', validUser);
      req.user = validUser[0].username;
      next();
    });
};