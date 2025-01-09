const createTextlocalProvider = require('./textlocalProvider');
const createTwilioProvider = require('./twilioProvider');
const createAWSSNSProvider = require('./awsSNSProvider');
const config = require('../config/smsConfig');

const getSMSProvider = () => {
  const { provider } = config;

  if (provider === 'textlocal') {
    return createTextlocalProvider(config.textlocal.apiKey, config.textlocal.sender);
  }

  if (provider === 'twilio') {
    return createTwilioProvider(
      config.twilio.accountSid,
      config.twilio.authToken,
      config.twilio.sender
    );
  }
  if (provider === 'awsSNS') {
    return createAWSSNSProvider(
      config.awsSNS.region,
      config.awsSNS.accessKeyId,
      config.awsSNS.secretAccessKey
    );
  }

  throw new Error(`Unsupported SMS provider: ${provider}`);
};

module.exports = getSMSProvider;
