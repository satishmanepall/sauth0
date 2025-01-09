const { sendSMS } = require('../../service/smsService');
const otpService = require('../../service/otpService');
const jwtUtils = require('../../_utils/jwtUtils');
const User = require('../../dbModel/userModel/schema');


const sendSMSHandler = async (req, res) => {
  const { to, message, otp ,name,type} = req.body;
  if (!to || !message || !otp) {
    return res.status(400).json({ success: false, message: 'Missing "to", "message", or "otp" fields' });
  }

  try {
    // Store OTP and other details in the database immediately
    const updateUser = await otpService.setOTPForUser(to, otp, message,name);
    if(updateUser && (type === undefined || type === "internal" || type === "external")){
 // Trigger SMS sending in the background
 sendSMS(to, message)
 .then(async (result) => {
   if (result.success) {
     // Update user status to success and store messageId
     await otpService.updateUserStatus(to, true, result.data.messageId);
   } else {
     // Log or handle SMS failure
     await otpService.updateUserStatus(to, false, null, result.error);
   }
 })
 .catch(async (error) => {
   // Handle unexpected errors during SMS sending
   await otpService.updateUserStatus(to, false, null, error.message);
 });
    }
   

    // Respond immediately
    return res.status(200).json({ success: true, message: 'OTP processing started' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
// Verify OTP
async function verifyOTP(req, res) {
  const { mobileNumber, otp } = req.body;
  const user = await User.findOne({ mobileNumber });

  if (!user || user.otp !== otp || user.otpExpiresAt < Date.now()) {
    return res.status(200).json({status_code:0, error: 'Invalid or expired OTP' });
  }

  const accessToken = jwtUtils.generateAccessToken({ mobileNumber });
  const refreshToken = jwtUtils.generateRefreshToken({ mobileNumber });
  user.refreshToken = refreshToken;
  user.otp = null; // Clear OTP after verification
  await user.save();

  res.json({ "success": true, accessToken, refreshToken ,userId:user?._id});
}
// Refresh access token
async function refreshToken(req, res) {
  const { token } = req.body;
  console.log(token)

  try {
    // Find user by refresh token
    let user = await User.findOne({ refreshToken: token });
    if (!user) return res.status(403).json({ error: 'Invalid refresh token' });
    //user = JSON.parse(JSON.stringify(user)); // Convert to plain JS objects if needed

    // Verify refresh token
    const isTokenValid = jwtUtils.verifyRefreshToken(token, "bsxasjbcsabc");
    console.log(isTokenValid)
    if (!isTokenValid) return res.status(403).json({ error: 'Expired refresh token' });

    // Generate new tokens
    var userObj={}
    if(user?.email){
      userObj.email=user?.email
      userObj.userId=user?._id.toString()
    }
    if(user?.mobileNumber){
      userObj.mobileNumber=user?.mobileNumber
      userObj.userId=user?._id.toString()
    }
    const newAccessToken = jwtUtils.generateAccessToken(userObj);
    const newRefreshToken = jwtUtils.generateRefreshToken(userObj);

    // Update the user's refresh token in the database
    user.refreshToken = newRefreshToken;
    await user.save();

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(500).json({ error: 'Failed to refresh token' });
  }
}

// Validate Access Token and Return User Data
async function validateToken(req, res) {
  try {
    console.log(456)
    // `req.user` is available from the `authMiddleware` if token is valid
    const user = await User.findOne({ mobileNumber: req.user.mobileNumber });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ success: true, user: { mobileNumber: user?.mobileNumber } });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
module.exports = { sendSMSHandler ,verifyOTP,refreshToken, validateToken};
