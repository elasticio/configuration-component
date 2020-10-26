/**
 * This function will be called by the platform to verify credentials
 *
 * @param credentials - input credentials
 * @callback cb  - callback function
 */
module.exports = async function verify(credentials) {
  this.logger.info('Starting credentials verification');
  const configData = credentials.configData;
  try {
    JSON.parse(configData);
    return { verified: true };
  }
  catch (err) {
    this.logger.error('Credentials verification failed. Input object must be a valid JSON');
    return { verified: false };
  }
};
