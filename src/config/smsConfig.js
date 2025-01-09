// Load environment variables
require('dotenv').config();
module.exports = {
  provider: process.env.PROVIDER || 'textlocal', // Change provider name here to switch
  textlocal: {
    apiKey: process.env.TEXTLOCAL_API_KEY || 'NTY1YTZkNDgzODZmNGU2NTZkNzIzODRlNjQzOTMzNDc=',
    sender: process.env.TEXTLOCAL_SENDER || 'LTCLAW',
  },
  twilio: {
    accountSid: 'your_twilio_account_sid',
    authToken: 'your_twilio_auth_token',
    sender: '+1234567890',
  },
  awsSNS: {
    region: process.env.AWS_REGION || 'ap-south-1', // e.g., 'us-east-1'
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'AKIAWN4DB66ML62EWY7J',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'nBqC2zcV2vme/PDgCy6soPKAXOZ+9jJ50yt9pJav',
  },
};
