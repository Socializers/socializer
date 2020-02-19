/* eslint-disable no-unused-vars */
/* eslint-disable strict */
'use strict';

module.exports = (req, res, next) => {
  res.status(404);
  res.statusMessage = 'Not Found';
  res.json({ erorr: 'Not Found' });

};
/**
   * modified res
   * res.status to 404
   * res.statusMessage to Not Found
   * res.json with erorr Not Found
   */