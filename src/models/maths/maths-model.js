/* eskint-disable strict */

'use strict';

const schema = require('./maths-schema.js');
const Model = require('../mongo.js');

class Maths extends Model{
  constructor(){
    super(schema);
  }
}

module.exports = Maths;