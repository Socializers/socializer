/* eslint-disable no-unused-vars */
/* eslint-disable strict */
'use strict';

const base64 = require('base-64');
const user = require('./user.js');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('Ops something went wrong');
    return;
  }

  let basic = req.headers.authorization.split(' ').pop();
  let [username, password] = base64.decode(basic).split(':');
  let auth = { username, password };

  user.authenticator(auth)
    .then(validUser => {
      req.token = user.siginTokenGenerator(validUser);
      next();
    })
    .catch(() => next('Ops'));
};