
/* eslint-disable camelcase */
/* eslint-disable strict */
'use strict';

const superagent = require('superagent');

const Users = require('./user.js');

const GTS = 'https://www.googleapis.com/oauth2/v4/token';
const SERVICE = 'https://mail.google.com';

module.exports = async function authorize(req, res, next) {
  try {
    let code = req.query.code;
    let access_token = await codeTokenExchanger(code);
    let remoteUser = await getRemoteUserInfo(access_token);
    let validUser = await getUser(remoteUser);
    let validToken = await getToken(validUser);
    req.user = { validUser, validToken };
    next();
  }
  catch (e) {
    next(e);
  }
};

async function codeTokenExchanger(code) {
  let tokenResponse = await superagent.post(GTS)
    .type('form')
    .send({
      code: code,
      client_id: '1082218993942-1ib34ft542p930gk7ilh8ngf8roopm64.apps.googleusercontent.com',
      client_secret: 'zc8KkzVyO8w-HN2MEPIXg5oq',
      redirect_uri: 'http://localhost:3000/google',
      grant_type: 'authorization_code',
    });
  let access_token = tokenResponse.body.id_token;
  return access_token;
}

async function getRemoteUserInfo(token) {
  return await superagent
    .get(SERVICE)
    .set('Authorization', `Bearer ${token}`)
    .then(() => {
      let user = Users.decode(token);
      user.access_token = token;
      return user;
    });

}
async function getUser(oauthUser) {
  let user = await Users.createFromOauth(oauthUser.email);
  return user;
}

async function getToken(validUser) {
  let token = await Users.siginTokenGenerator(validUser);
  return token;
}