const otpService = require('../../service/otpService');
const userService = require("../../service/userService");
const emailService = require("../../service/email_service");
const jwtUtils = require('../../_utils/jwtUtils');
const User = require('../../dbModel/userModel/schema');
const rolePermissionService = require("../../service/role_permission_service");

const bcrypt = require('bcryptjs');

// Register or login user with OTP
async function requestOTP(req, res) {
  try {
    const { mobileNumber } = req.body;

    const otp = otpService.generateOTP();
    await otpService.setOTPForUser(mobileNumber, otp);
    await otpService.sendOTPSMS(mobileNumber, `Your OTP is ${otp.otp}`);

    res.json({ "success": true, message: 'OTP has been sent to the provided mobile number.' });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Verify OTP
async function verifyOTP(req, res) {
  const { mobileNumber, otp } = req.body;
  const user = await User.findOne({ mobileNumber });

  if (!user || user.otp !== otp || user.otpExpiresAt < Date.now()) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }

  const accessToken = jwtUtils.generateAccessToken({ mobileNumber });
  const refreshToken = jwtUtils.generateRefreshToken({ mobileNumber });
  user.refreshToken = refreshToken;
  user.otp = null; // Clear OTP after verification
  await user.save();

  res.json({ "success": true, accessToken, refreshToken });
}

// Refresh access token
async function refreshToken(req, res) {
  const { token } = req.body;

  try {
    // Find user by refresh token
    const user = await User.findOne({ refreshToken: token });
    if (!user) return res.status(403).json({ error: 'Invalid refresh token' });

    // Verify refresh token
    const isTokenValid = jwtUtils.verifyRefreshToken(token, "bsxasjbcsabc");
    console.log(isTokenValid)
    if (!isTokenValid) return res.status(403).json({ error: 'Expired refresh token' });

    // Generate new tokens
    var userObj={}
    if(user?.email){
      userObj.email=user?.email
    }else{
      userObj.mobileNumber=user?.mobileNumber
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
const signUpWithEmailandPassword = async (req, res) => {
  try {
    const randomPassword = await generateRandomPassword();
    const randomDisplayName = generateRandomDisplayName(8);
    // Step 2: Hash the password
   // Hash the password
    //const hashedPassword = await bcrypt.hash(randomPassword, 10);
    // create user
    var obj = {
      email: req.body.email,
      name: req.body?.name ? req.body.name : randomDisplayName,
      password: randomPassword,
      role: req.body.role
    }
    const user = await userService.createUser(obj)
    const passwordEmail = await emailService.sendEmailCreate(obj?.name, obj.email, "Your Sri Rama Navami Login Details", randomPassword,"welcome_email");
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error("signUpWithEmailandPassword error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
// Login controller function
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("loginUser",email, password)
  try {
    // Step 2: Call the login service
    var result = await userService.loginUser(email);
    result = JSON.parse(JSON.stringify(result))
    if (!result) {
      throw new Error('Invalid email or password.');
    }
// Compare the password
//const isPasswordValid = await bcrypt.compare(password, result.password);
    if (result.password !== password) {
      throw new Error('Invalid email or password.');
    }
    const accessToken = jwtUtils.generateAccessToken({ email,userId:result._id });
    const refreshToken = jwtUtils.generateRefreshToken({ email });
    var obj = {
      newRefreshToken: refreshToken
    }
    delete result.password
    delete result.newRefreshToken
    await userService.updateUser(obj, result._id)
    // Step 3: Send a successful response with the token and user info
    let getRolePermission = await rolePermissionService.getRolePermissionByRole(result?.role[0])
    getRolePermission = JSON.parse(JSON.stringify(getRolePermission));
    res.status(200).json({
      message: 'Login successful',
      refreshToken: refreshToken,
      accessToken:accessToken,
      permission:getRolePermission,
      user: result,
    });
  } catch (err) {
    // Step 4: Handle errors
    res.status(401).json({ error: err.message });
  }
};
// Send password reset link
const sendPasswordResetLink = async (req, res) => {
  const { email } = req.body;

  try {
    const resetLink = await userService.sendPasswordResetLink(email);
    res.status(200).json({ message: 'Password reset link sent to your email.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// 2. Verify reset token (optional controller to check validity before reset)
const verifyResetToken = async (req, res) => {
  const { userId, token } = req.body;
  try {
    const verifyToken = await userService.verifyPasswordResetToken(userId, token);
    res.status(200).json({ message: 'Reset token is valid.' ,data:verifyToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// 3. Reset password
const resetPassword = async (req, res) => {
  const { userId, token , newPassword } = req.body;

  try {
    await userService.resetPassword(userId, token, newPassword);
    res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// 4. Update password (for logged-in users)
const updatePassword = async (req, res) => {
  const {userId, oldPassword, newPassword } = req.body;
  try {
    await userService.updatePassword(userId, oldPassword, newPassword);
    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Function to generate a random password
async function generateRandomPassword() {
  // Define character sets
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  // Function to get a random character from a given set
  const getRandomChar = (charset) => charset[Math.floor(Math.random() * charset.length)];

  // Ensure the password has at least one of each type
  let password = [
    getRandomChar(uppercase),    // 1 Uppercase
    getRandomChar(lowercase),    // 1 Lowercase
    getRandomChar(numbers),      // 1 Number
    getRandomChar(specialChars), // 1 Special character
  ];

  // Fill the rest of the password with random characters from all sets
  const allChars = uppercase + lowercase + numbers + specialChars;
  for (let i = 4; i < 10; i++) {
    password.push(getRandomChar(allChars));
  }

  // Shuffle the password array to ensure random order
  password = password.sort(() => Math.random() - 0.5);

  // Join the array into a string and return
  return password.join('');
}
// Function to generate a 24-character hexadecimal UID
const generateUID = () => {
  return crypto.randomBytes(12).toString('hex'); // 12 bytes * 2 = 24 characters
};
// Function to generate a random display name
function generateRandomDisplayName(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
module.exports = {sendPasswordResetLink,verifyResetToken,resetPassword,updatePassword, loginUser, requestOTP, verifyOTP, refreshToken, validateToken, signUpWithEmailandPassword };
