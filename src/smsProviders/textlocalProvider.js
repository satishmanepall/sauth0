const axios = require('axios');

const createTextlocalProvider = (apiKey, sender) => {
  const apiUrl = 'https://api.textlocal.in/send/';

  const sendSMS = async (to, message) => {
    try {
      const params = {
        apiKey,
        numbers: to,
        message,
        sender,
      };

      const response = await axios.post(apiUrl, null, { params });
      if (response.data.status === 'success') {
        return { success: true, data: response.data };
      }
      return { success: false, error: response.data.errors };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return { sendSMS };
};

module.exports = createTextlocalProvider;
