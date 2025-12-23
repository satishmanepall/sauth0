const User = require("../dbModel/userModel/schema");
const crypto = require('crypto');
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const emailService = require("./email_service"); // Your existing email utility function
const RESET_TOKEN_EXPIRATION = 1000 * 60 * 1000; // 10 minutes in milliseconds
const SECRET_KEY = 'bsxasjbcsabc'; // Replace with environment variable in production
// Function to create a new user if the email does not exist
const createUser = async (userObj) => {
  try {
    const newUser = new User(userObj);
    await newUser.save();
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
const loginUser = async (email) => {
  try {
    const getUser = User.findOne({ email })
    return getUser
  }
  catch (error) {
    console.error('Error get user:', error);
    throw error;
  }
}
//update UserUser
const updateUser = async (userData, id) => {
  try {
    const user = await User.findByIdAndUpdate({ _id: id }, { $set: userData });
    return { status: 1, result: user };
  } catch (error) {
    console.log("updateUser error", error);
    throw error;
  }
};
// Step 1: Generate a password reset link and send it via email
const sendPasswordResetLink = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('No user found with that email.');
  }

  // Generate a JWT reset token with a short expiration time
  const resetToken = jwt.sign(
    { userId: user._id }, 
    "bsxasjbcsabc",  // Secret key for signing the token
    { expiresIn: '60m' }  // Set the expiration to 10 minutes
  );

  // Store the token expiration date in the database for additional validation
  const resetTokenExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes from now
  user.passwordResetExpiresAt = resetTokenExpiresAt;
  await user.save();
  const Admin_URL=process.env.ADMIN_APP_URI || "https://dev-admin.sriramanavami.com"
  // Construct the reset link including the JWT token
  const resetLink = `${Admin_URL}/#/forgotpwd?token=${resetToken}&id=${user._id}`;
  // Send reset link via email
  await emailService.sendResetList(
    user.name,
    user.email,
    'Password Reset Request',
    resetLink,
    "forgot_password"
  );

  return resetLink;
};

// Step 2: Verify the reset token
const verifyPasswordResetToken = async (userId, token) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('Reset token is invalid or has expired.');
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, "bsxasjbcsabc");

    // Ensure the token matches the correct user
    if (decoded.userId !== user._id.toString()) {
      throw new Error('Invalid token for user.');
    }

    // If valid, return the user object
    return user;
  } catch (error) {
    throw new Error('Reset token is invalid or has expired.');
  }
};
// 3. Change password after verifying reset token
const resetPassword = async (userId, token, newPassword) => {
  const user = await verifyPasswordResetToken(userId, token);
  
  // Hash the new password and update the user's password
  //user.password = await bcrypt.hash(newPassword, 10);
  user.password=newPassword
  user.passwordResetToken = undefined;
  user.passwordResetExpiresAt = undefined;
  await user.save();

  return user;
};
// 4. Update password for a logged-in user
const updatePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found.');
  }

  // Verify the old password
 // const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (oldPassword !== user.password) {
    throw new Error('Old password is incorrect.');
  }

  // Hash the new password and save it
  //user.password = await bcrypt.hash(newPassword, 10);
  user.password =newPassword
  await user.save();
  return user;
};
module.exports = {
  createUser,
  loginUser,
  updateUser,
  sendPasswordResetLink,
  verifyPasswordResetToken,
  resetPassword,
  updatePassword
};
