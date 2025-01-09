

const { SNSClient } = require('@aws-sdk/client-sns');

const snsClient = new SNSClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIAWN4DB66ML62EWY7J",
    secretAccessKey: "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",
  },
});

module.exports = snsClient;
