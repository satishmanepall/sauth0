const getSMSProvider = require('../smsProviders');
const sendSMS = async (to, message) => {
  const provider = getSMSProvider();
  return provider.sendSMS(to, message);
};

module.exports = { sendSMS };
