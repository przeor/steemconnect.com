const express = require('express');
const _ = require('lodash');
const steem = require('steem');
const steemAuth = require('steemauth');
const createECDH = require('create-ecdh');
const jwt = require('jsonwebtoken');
const { verifyAuth } = require('./middleware');
const { getSecretKeyForClientId, getJSONMetadata, decryptMessage, encryptMessage } = require('../lib/utils');

const router = new express.Router();

router.get('/auth/login', (req, res) => {
  const { encryptedData } = req.query;
  const data = decryptMessage(encryptedData, req.cookies._csrf); // eslint-disable-line
  const { username, wif } = JSON.parse(data);
  const computeSecret = getSecretKeyForClientId(process.env.PUBLIC_KEY);
  steem.api.getAccounts([username], (err, result) => {
    if (err) {
      res.status(500).send({ error: JSON.stringify(err) });
    } else if (result.length === 0) {
      res.status(500).send({ error: 'Incorrect Username' });
    } else if (result[0] && steemAuth.wifIsValid(wif, result[0].posting.key_auths[0][0])) {
      const secret = encryptMessage(JSON.stringify({ username, wif }), computeSecret);
      const auth = jwt.sign({ username, secret }, process.env.JWT_SECRET, { expiresIn: '36h' });
      res.send({ userAccount: result[0], auth });
    } else {
      res.status(500).send({ error: 'Incorrect Password' });
    }
  });
});

router.post('/auth/create', verifyAuth, (req, res) => {
  const { appOwnerWif, appName, author, origins, redirect_urls, permissions } = req.body; // eslint-disable-line
  const appUserName = req.username;
  const newApp = createECDH(process.env.CRYPTO_MOD);
  newApp.generateKeys();
  const clientId = newApp.getPublicKey('hex');
  const clientSecret = newApp.computeSecret(process.env.PUBLIC_KEY, 'hex', 'hex');

  steem.api.getAccounts([appUserName], (err, result) => {
    const isWif = steemAuth.isWif(appOwnerWif);
    const ownerKey = (isWif) ? appOwnerWif : steemAuth.toWif(appUserName, appOwnerWif, 'owner');
    if (err) {
      res.status(500).send({ error: JSON.stringify(err) });
    } else {
      try {
        const user = result[0];
        const jsonMetadata = getJSONMetadata(user);
        const private_metadata = encryptMessage(JSON.stringify({ origins, redirect_urls }), clientSecret); // eslint-disable-line
        jsonMetadata.app = { name: appName, author, permissions, private_metadata };
        steem.broadcast.accountUpdate(ownerKey, appUserName, undefined, undefined, undefined,
          user.memo_key, jsonMetadata, (accountUpdateErr) => {
            if (accountUpdateErr) {
              res.status(500).send({ error: JSON.stringify(accountUpdateErr) });
            } else {
              res.json({ clientId, clientSecret });
            }
          });
      } catch (e) {
        res.status(500).send({ error: JSON.stringify(e) });
      }
    }
  });
});

router.get('/auth/authorize', verifyAuth, (req, res) => {
  const { appUserName, clientId, redirect_url, scope } = req.query;
  steem.api.getAccounts([appUserName], (err, result) => {
    if (err) {
      res.status(500).send({ error: JSON.stringify(err) });
    } else {
      try {
        const clientSecret = getSecretKeyForClientId(clientId);
        const jsonMetadata = getJSONMetadata(result[0]);
        if (typeof jsonMetadata.app === 'object' && jsonMetadata.app) {
          let privateMetadata = decryptMessage(jsonMetadata.app.private_metadata, clientSecret);
          privateMetadata = JSON.parse(privateMetadata);
          if (_.indexOf(privateMetadata.redirect_urls, redirect_url) === -1) { // eslint-disable-line
            throw new Error('Redirect uri mismatch');
          }
          const token = jwt.sign({
            username: req.username,
            allowedOrigin: privateMetadata.origins,
            scope,
            clientId,
            appUserName,
          }, process.env.JWT_SECRET, { expiresIn: '36h' });
          res.redirect(`${redirect_url}?token=${token}`); // eslint-disable-line
        } else {
          throw new Error('Invalid appName. App not found');
        }
      } catch (e) {
        let message = e.message;
        if (e.message.search('decrypt') >= 0) {
          message = 'Invalid clientId';
        } else if (e.message.search('json_metadata') >= 0) {
          message = 'Invalid appName';
        }
        res.status(500).send({ error: message });
      }
    }
  });
});

router.get('/auth/permissionList', verifyAuth, (req, res) => {
  res.send([
    { name: 'Verify Identity', api: 'verify_identity' },
    { name: 'Vote/Downvote', api: 'vote' },
    { name: 'Comment', api: 'comment' },
    { name: 'Post', api: 'post' },
    { name: 'Reblog', api: 'reblog' },
    { name: 'Follow/Mute', api: 'follow/mute' },
  ]);
});

module.exports = router;
