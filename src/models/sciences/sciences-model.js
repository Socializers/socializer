/* eskint-disable strict */

'use strict';

const schema = require('./sciences-schema.js');
const Model = require('../mongo.js');

class Sciences extends Model{
  constructor(){
    super(schema);
  }
}

module.exports = Sciences;