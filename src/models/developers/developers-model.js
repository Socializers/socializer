/* eskint-disable strict */

// eslint-disable-next-line strict
'use strict';

const schema = require('./developers-schema.js');
const Model = require('../mongo.js');

class Developers extends Model{
  constructor(){
    super(schema);
  }
}

module.exports = Developers;