const { sendSMS } = require('../../service/smsService');
const otpService = require('../../service/otpService');
const jwtUtils = require('../../_utils/jwtUtils');
const User = require('../../dbModel/userModel/schema');
const jwt = require('jsonwebtoken');


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

  // if (!user || user.otp !== otp || user.otpExpiresAt < Date.now()) {
  //   return res.status(200).json({status_code:0, error: 'Invalid or expired OTP' });
  // }

  const accessToken = jwtUtils.generateAccessToken({ mobileNumber });
  const refreshToken = jwtUtils.generateRefreshToken({ mobileNumber });
  user.newRefreshToken = refreshToken;
  user.oldRefreshToken = "";
  user.accessToken = accessToken;
  //user.otp = null; // Clear OTP after verification
  await user.save();

  res.json({ "success": true, accessToken, refreshToken ,userId:user?._id});
}
async function refreshToken(req, res) {
  const { token } = req.body; // Refresh token from the request
  try {
    // Find user by refresh token
    const user = await User.findOne({
      $or: [{ newRefreshToken: token }, { oldRefreshToken: token }]
    });

    if (!user) {
      return res.status(403).json({ error: 'Invalid refresh token' });
    }

    // Check if the token is `newRefreshToken` or `oldRefreshToken`
    const isOldToken = user.oldRefreshToken === token;

    // Decode refresh token

   // Decode refresh token and handle expiration
   let decodedRefreshToken;
   let tokenOld=false
   try {
     decodedRefreshToken = jwtUtils.verifyRefreshToken(token, "bsxasjbcsabc");
     if (isOldToken) {
      const expiredAt = jwt.decode(token)?.exp * 1000; // Decode the token to get expiry time
      if (!expiredAt) {
        return res.status(403).json({ error: 'Invalid refresh token' });
      }

      const gracePeriodEnds = expiredAt + 2 * 60 * 1000; // Add 2-minute grace period
      const currentTime = Date.now();

      if (currentTime > gracePeriodEnds) {
        return res.status(403).json({ error: 'Expired refresh token (grace period exceeded)' });
      }
      tokenOld=true
    }
   } catch (err) {
     // If token verification fails, check for grace period (only for `oldRefreshToken`)
     if (isOldToken) {
       const expiredAt = jwt.decode(token)?.exp * 1000; // Decode the token to get expiry time
       if (!expiredAt) {
         return res.status(403).json({ error: 'Invalid refresh token' });
       }

       const gracePeriodEnds = expiredAt + 180 * 60 * 1000; // Add 2-minute grace period
       const currentTime = Date.now();

       if (currentTime > gracePeriodEnds) {
         return res.status(403).json({ error: 'Expired refresh token (grace period exceeded)' });
       }
       tokenOld=true
     } else {
       return res.status(403).json({ error: 'Expired refresh token' });
     }
   }


    // Check if access token is valid or expired
    jwtUtils.verifyToken(user.accessToken, "bsxasjbcsabc", async (err, decoded) => {
      // Access token expired; generate a new one
      const userObj = {
        userId: user._id.toString(),
        email: user.email,
        mobileNumber: user.mobileNumber
      };
      const newAccessToken = jwtUtils.generateAccessToken(userObj);
      user.accessToken = newAccessToken;

      // Check if the refresh token is still valid (i.e., before the expiry time)
      const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Current time in seconds
      const timeRemaining = decodedRefreshToken.exp - currentTimeInSeconds; // Remaining time in seconds

      console.log("timeRemaining:", timeRemaining);

      if (timeRemaining > 120 * 60 || tokenOld) {
        // If the token is still valid (new token), return the same refresh token
        await user.save();
        return res.json({
          message: "Refresh token is still valid.",
          accessToken: newAccessToken,
          refreshToken: user.newRefreshToken
        });
      }

      // Generate a new refresh token
      const newRefreshToken = jwtUtils.generateRefreshToken(userObj);
      user.oldRefreshToken = user.newRefreshToken; // Move current refresh token to old
      user.newRefreshToken = newRefreshToken; // Save the new refresh token
      await user.save();

      res.json({
        message: "Tokens refreshed successfully.",
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      });
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
}





// // Refresh access token
// async function refreshToken(req, res) {
//   const { token } = req.body;
//   console.log(token)

//   try {
//     // Find user by refresh token
//     let user = await User.findOne({ refreshToken: token });
//     if (!user) return res.status(403).json({ error: 'Invalid refresh token' });
//     //user = JSON.parse(JSON.stringify(user)); // Convert to plain JS objects if needed

//     // Verify refresh token
//     const isTokenValid = jwtUtils.verifyRefreshToken(token, "bsxasjbcsabc");
//     console.log(isTokenValid)
//     if (!isTokenValid) return res.status(403).json({ error: 'Expired refresh token' });

//     // Generate new tokens
//     var userObj={}
//     if(user?.email){
//       userObj.email=user?.email
//       userObj.userId=user?._id.toString()
//     }
//     if(user?.mobileNumber){
//       userObj.mobileNumber=user?.mobileNumber
//       userObj.userId=user?._id.toString()
//     }
//     const newAccessToken = jwtUtils.generateAccessToken(userObj);
//     const newRefreshToken = jwtUtils.generateRefreshToken(userObj);

//     // Update the user's refresh token in the database
//     user.refreshToken = newRefreshToken;
//     await user.save();

//     res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to refresh token' });
//   }
// }

// Validate Access Token and Return User Data
async function validateToken(req, res) {
  try {
    // let userBytoken = await User.findOne({mobileNumber: req.user.mobileNumber, refreshToken: req.body.refresh_token });
    // if (!userBytoken) return res.status(403).json({ message: 'User not found',logout_user:true });

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
