/* eslint-disable strict */

'use strict';

const schema = require('./math-schema.js');
const Model = require('../mongo.js');

class Math extends Model{
  constructor(){
    super(schema);
  }
}

module.exports = Math;