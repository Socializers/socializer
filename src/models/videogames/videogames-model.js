/* eskint-disable strict */

'use strict';

const schema = require('./videogames-schema.js');
const Model = require('../mongo.js');

class Games extends Model{
  constructor(){
    super(schema);
  }
}

module.exports = Games;