const { PublishCommand } = require('@aws-sdk/client-sns');
const snsClient = require('../config/awsConfig');
const MobileNumber = require('../dbModel/test_mobile/schema');
const User = require('../dbModel/userModel/schema');
const crypto = require('crypto');

// Generate OTP and expiry time
function generateOTP() {
  return {
    otp: crypto.randomInt(100000, 999999).toString(),
    expiresAt: new Date(Date.now() + 60 * 1000), // 30 seconds expiry
  };
}

async function sendOTPSMS(mobileNumber, message) {
  try {
    const params = {
      Message: message,
      PhoneNumber: mobileNumber,
    };
    const command = new PublishCommand(params);
    await snsClient.send(command);
    console.log('OTP sent via SMS');
  } catch (error) {
    console.error('Error sending OTP via SMS:', error);
    throw error;
  }
}
// Utility function to normalize mobile numbers
function normalizeMobileNumber(mobileNumber) {
  // Remove country code if present (e.g., +91)
  return mobileNumber.startsWith("+91") ? mobileNumber.slice(3) : mobileNumber;
}
// Store OTP in database
async function setOTPForUser(mobileNumber, otp,message,name) {
    // Fetch all mobile numbers from the MobileNumber collection
    let getMobileNumbers = await MobileNumber.find();
    getMobileNumbers = JSON.parse(JSON.stringify(getMobileNumbers)); // Convert to plain JS objects if needed
    // Check if the input mobile number exists in the getMobileNumbers list
    const normalizedMobileNumber = normalizeMobileNumber(mobileNumber);
    console.log(normalizedMobileNumber)
    const staticMobile = getMobileNumbers.find((item) => item.mobileNumber === normalizedMobileNumber);
       console.log("---@ "+staticMobile)
    if(staticMobile){
      console.log("---> "+staticMobile)
      await User.updateOne(
        { mobileNumber:normalizedMobileNumber },
        { otp: staticMobile.otp, otpExpiresAt: new Date("12-12-2026") ,message:message,name:name},
        { upsert: true }
      );
      return false
    }else{
      print("Here")
      await User.updateOne(
        { mobileNumber:normalizedMobileNumber },
        { otp: otp.otp, otpExpiresAt: otp.expiresAt ,message:message,name:name},
        { upsert: true }
      );
       print("Here 000 111")
      return true
    }
  
}

async function updateUserStatus(mobileNumber, success, messageId = null, error = null) {
  await User.updateOne(
    { mobileNumber },
    { smsStatus: success ? 'success' : 'failure', messageId, error },
    { upsert: true }
  );
}


module.exports = { generateOTP, sendOTPSMS, setOTPForUser,updateUserStatus };
