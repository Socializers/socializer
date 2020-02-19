/* eslint-disable strict */

'use strict';

const schema = require('./science-schema.js');
const Model = require('../mongo.js');

class Science extends Model{
  constructor(){
    super(schema);
  }
}

module.exports = Science;