/* eslint-disable strict */

'use strict';

const fs = require('fs');

function modelReader(modelName) {
  let content =
`/* eslint-disable strict */

'use strict';

const schema = require('./${modelName}-schema.js');
const Model = require('../mongo.js');

class ${capitalizeFirstLetter(modelName)} extends Model{
  constructor(){
    super(schema);
  }
}

module.exports = ${capitalizeFirstLetter(modelName)};`;
  return content;
}

function schemaReader(modelName) {
  let content =
`/* eslint-disable new-cap */
/* eslint-disable strict */

'use strict';

const mongoose = require('mongoose');

const ${modelName} = mongoose.Schema({
  name: { type: String, required: true },
  des: { type: String, required: true },
}, { strict:false });

module.exports = mongoose.model('${modelName}', ${modelName});`;
  return content;
}

function modelCreator(modelName) {

  if (!fs.existsSync(`./src/models/${modelName}`)) {
    fs.mkdirSync(`./src/models/${modelName}`);
    console.log('folder created');
  }

  if (!fs.existsSync(`./src/models/${modelName}/${modelName}.js`)) {
    fs.writeFile(`./src/models/${modelName}/${modelName}-model.js`, modelReader(modelName), 'utf8', function (err) {
      if (err) {
        throw err;
      }
      console.log('written');
    });
    fs.writeFile(`./src/models/${modelName}/${modelName}-schema.js`, schemaReader(modelName), 'utf8', function (err) {
      if (err) {
        throw err;
      }
      console.log('written');
    });
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = modelCreator;