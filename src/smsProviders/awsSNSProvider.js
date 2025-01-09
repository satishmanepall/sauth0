const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');

const createAWSSNSProvider = (region, accessKeyId, secretAccessKey) => {
  // Initialize SNS client with v3 SDK
  const snsClient = new SNSClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const sendSMS = async (to, message) => {
    try {
      const params = {
        Message: message,
        PhoneNumber: to,
      };

      const command = new PublishCommand(params);
      const result = await snsClient.send(command);

      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return { sendSMS };
};

module.exports = createAWSSNSProvider;
