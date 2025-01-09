const twilio = require('twilio');

const createTwilioProvider = (accountSid, authToken, sender) => {
  const client = twilio(accountSid, authToken);

  const sendSMS = async (to, message) => {
    try {
      const result = await client.messages.create({
        body: message,
        from: sender,
        to,
      });
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return { sendSMS };
};

module.exports = createTwilioProvider;
