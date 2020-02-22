/* eslint-disable strict */
/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
'use strict';

const express = require('express');
const methodOverride = require('method-override');
const router = express.Router();

const User = require('../auth/user.js');
const authMiddlware = require('../auth/auth-middleware.js');
const authMiddlwareV2 = require('../auth/auth-middleware-v2.js');
const githunOauthmiddleware = require('../auth/oauth/github.js');
const googleOauthMiddleware = require('../auth/oauth/google.js');
const facebookOauthMiddleware = require('../auth/oauth/facebook.js');
const bearerMiddleware = require('../auth/bearer/bearer-middleware.js');
const modelFinder = require('../middleware/model-finder.js');
const modelCreator = require('../middleware/model-creator.js');

router.use(methodOverride(middleware));

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
router.get('/', mainPage);
router.get('/main', formPage);
router.post('/schemas', showSchema);
router.get('/api/v1/test', googleTokenHandler);
router.get('/api/v1/:model', getModelHandler);
router.get('/api/v1/:model/:_id', getOneModelHandler);
router.post('/api/v1/:model', creatModelHandler);
router.put('/api/v1/:model/:_id', updateModelHandler);
router.delete('/api/v1/:model/:_id', deleteModelHandler);

/// User Route
router.post('/signup', signup);
router.post('/signin', authMiddlware, signin);
router.post('/signinV2', authMiddlwareV2, signin);
router.get('/google', googleOauthMiddleware, googleTokenHandler);
router.get('/github', githunOauthmiddleware, githubTokenHandler);
router.get('/oauth', oauthfun);
router.get('/user', bearerMiddleware, bearer);

///// Functions

function formPage(req, res) {
  res.status(200).render('pages/main');
}

function showSchema(req, res) {
  let newModel = req.body.name;
  modelCreator(newModel);
  res.status(200).render('pages/crud', { model: req.body.name });
}

function googleTokenHandler(req, res, next) {
  console.log('user', req.user);
  res.status(200).render('signing-pages/google', { googleEmail: req.user.validUser.username });
}

function githubTokenHandler(req, res, next) {
  console.log('user', req.user.username);
  res.status(200).render('signing-pages/github', { githubEmail: req.user.username });
}

function mainPage(req, res) {
  res.status(200).render('index');
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
  let _id = req.params._id;
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
  let _id = req.params._id;
  req.model.update(_id, record)
    .then(data => {
      res.json(data);
    })
    .catch();
}

/**
 * @param {string}
 * @method DELETE
 * @returns {object}
 */
function deleteModelHandler(req, res, next) {
  let _id = req.params._id;
  req.model.delete(_id)
    .then(() => {
      let message = 'deleted';
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
  let validUser = req.body.username;
  User.findOne({ 'username': `${validUser}` })
    .then(existUser => {
      if (validUser === existUser.username) {
        res.status(200).render('signing-pages/already');
      }
    })
    .catch(() => {
      let user = new User(req.body);
      user.save()
        .then(oneUser => {
          req.token = oneUser.signupTokenGenerator(oneUser);
          req.user = oneUser;
          res.status(200).render('signing-pages/basic', { name: req.user.username });
        });
    });
}

/**
 * @param {string}
 * @method GET
 * @returns {object}
 */
function signin(req, res, next) {
  console.log('ww', req.user);
  res.status(200).render('signing-pages/basic', { name: req.user });
}
/**
 * @param {string}
 * @method GET
 * @returns {object}
 */
function oauthfun(req, res, next) {
  githunOauthmiddleware.authorize(req)
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
  res.status(200).json(req.user);
}


function middleware(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}

module.exports = router;