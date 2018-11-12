"use strict";
const debug = require('debug')('Credentials');

/**
 * This function will be called by the platform to verify credentials
 *
 * @param credentials - input credentials
 * @callback cb  - callback function
 */
module.exports = function verifyCredentials(credentials, cb) {
  debug('Credentials configuration: %o', credentials);

  const configData = credentials.configData;

  try {
    JSON.parse(configData);
    return cb(null, {verified: true});
  }
  catch (err) {
    console.error('Error occurred. Input object must be a valid JSON.');
    return cb(null, {verified: false});
  }
};
