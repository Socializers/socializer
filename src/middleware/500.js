/* eslint-disable no-unused-vars */
/* eslint-disable strict */
'use strict';

module.exports = (err, req, res, next) => {
  res.status(500);
  res.statusMessage = 'Generic Server Erorr!';
  res.json({ erorr: err });
};
/**
   * modified res
   * res.status to 500
   * res.statusMessage to Generic Server Erorr
   * res.json with err
   */