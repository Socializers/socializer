/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
/* eslint-disable strict*/

'use strict';

const express = require('express');

const router = express.Router();

const User = require('../auth/user.js');
const authMiddlware = require('../auth/auth-middleware.js');
const oauthMiddleware = require('../auth/oauth-middleware.js');
const bearerMiddleware = require('../auth/bearer/bearer-middleware.js');
const modelFinder = require('../middleware/model-finder.js');

/**
 * @param {string}
 * @route model
 * @returns {object}
 */
router.param('model', modelFinder.loadFile);

/**
 * @param {string}
 * @route /api/v1/models
 * @returns {object}
 */

router.get('/api/v1/:model/schema', (req, res, next) => {
  res.status(200).json(req.model.jsonSchema());
});

/***** Routes *****/
/// Main Routes
router.get('/api/v1/test', googleTokenHandler);
router.get('/api/v1/:model', getModelHandler);
router.get('/api/v1/:model:_id', getOneModelHandler);
router.post('/api/v1/:model', creatModelHandler);
router.put('/api/v1/:model/:_id', updateModelHandler);
router.delete('/api/v1/:model/:_id', deleteModelHandler);

/// User Route
router.post('/signup', signup);
router.post('/signin', authMiddlware, signin);
router.get('/google', oauthMiddleware , googleTokenHandler);
router.get('/oauth', oauthfun);
router.get('/user',bearerMiddleware,bearer);

///// Functions

function googleTokenHandler(req, res, next) {
  res.status(200).send(req.user.validToken);
}


/**
 * @param {string}
 * @method GET
 * @returns {object}
 */
function getModelHandler(req, res, next) {
  req.model.get()
    .then(data => {
      let count = data.length;
      res.json({ count, data });
    })
    .catch(next);
}

/**
 * @param {string}
 * @method GET
 * @returns {object}
 */
function getOneModelHandler(req, res, next) {
  let _id = req.param.id;
  req.model.get(_id)
    .then(data => {
      res.json(data);
    })
    .catch(next);
}

/**
 * @param {string}
 * @method POST
 * @returns {object}
 */
function creatModelHandler(req, res, next) {
  let record = req.body;
  req.model.create(record)
    .then(data => {
      res.json(data);
    })
    .catch(next);
}

/**
 * @param {string}
 * @method PUT
 * @returns {object}
 */
function updateModelHandler(req, res, next) {
  let record = req.body;
  let _id = req.param.id;
  req.model.update(_id, record)
    .then(data => {
      res.json(data);
    })
    .catch(next);
}

/**
 * @param {string}
 * @method DELETE
 * @returns {object}
 */
function deleteModelHandler(req, res, next) {
  let _id = req.param.id;
  req.model.delete(_id)
    .then(() => {
      let message = `${req.model}`;
      res.send(message);
    })
    .catch(next);
}

/**
 * @param {string}
 * @method POST
 * @returns {object}
 */
function signup(req, res, next) {
  console.log('here signup route');
  let user = new User(req.body);
  user.save()
    .then(oneUser => {
      req.token = oneUser.signupTokenGenerator(oneUser);
      req.user = oneUser;
      res.status(200).send(req.token);
    })
    .catch(next);
}

/**
 * @param {string}
 * @method GET
 * @returns {object}
 */
function signin(req, res, next) {
  res.send(req.token);
}
/**
 * @param {string}
 * @method GET
 * @returns {object}
 */
function oauthfun(req, res, next) {
  oauthMiddleware.authorize(req)
    .then(token => {
      res.status(200).send(token);
    })
    .catch(next);
}

/**
 * @param {string}
 * @method GET
 * @returns {object}
 */
function bearer(req, res, next) {
  console.log('route',req.user);
  res.status(200).json(req.user);
}

module.exports = router;