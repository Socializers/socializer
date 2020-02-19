
/* eslint-disable camelcase */
/* eslint-disable strict */

'use strict';

require('dotenv').config();
const superagent = require('superagent');

const Users = require('../user.js');

const GTS = 'https://www.googleapis.com/oauth2/v4/token';

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
  let tokenResponse = await superagent
    .post(GTS)
    .type('form')
    .send({
      code: code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: 'http://localhost:3000/google',
      grant_type: 'authorization_code',
    });
  console.log('tokenObject', tokenResponse.body);
  let access_token = tokenResponse.body.id_token;
  return access_token;
}

async function getRemoteUserInfo(token) {
  return await superagent
    .post(`https://www.googleapis.com/oauth2/v1/tokeninfo?id_token=${token}`)
    .then(data => {
      console.log('data', data.body);
      let user = Users.decode(token) || data.body;
      console.log('user', user);
      return user.email;
    });

}
async function getUser(oauthUser) {
  let user = await Users.createFromOauth(oauthUser);
  return user;
}

async function getToken(validUser) {
  let token = await Users.siginTokenGenerator(validUser);
  return token;
}