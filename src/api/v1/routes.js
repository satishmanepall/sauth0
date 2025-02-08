const express = require("express");

// Mounting routes
const v1Routes = express.Router();


// db status
const dbApi = require("./db");
v1Routes.get("/status", dbApi.checkDBStatus);

// Firenase Users
const fbUserApi = require("./firebase_user");
const user = require("./user");
v1Routes.post(
  "/fb/userwithemailandpassword",
  fbUserApi.signUpWithEmailandPassword
);
v1Routes.post("/fb/userwithmobile", fbUserApi.signUpWithMobile);

v1Routes.post("/fb/enableDisable", fbUserApi.userEnableDisable);
v1Routes.post("/fb/mobileCheckAuth", fbUserApi.mobileCheckAuth);
v1Routes.post("/fb/resetpw", fbUserApi.resetPassword);
v1Routes.post("/fb/changepw", fbUserApi.changePassword);
v1Routes.post("/fb/remove/user", fbUserApi.removeUsers);

//User
//v1Routes.post("/login", user.login);
v1Routes.post("/jwt/checkauth", user.checkAuth);
//v1Routes.patch("/fb/userwithemailandpassword", fbUserApi.updateUserWithEmailandPassword);
//v1Routes.get("/signup", userApi.signUp);
//v1Routes.post("/fb/testemail", fbUserApi.sendTestEmailApi);


//authRoutes API
const authRoutesAPI = require("./authController");
const authenticateToken = require('../../middlewares/authMiddleware');
v1Routes.post("/fb/checkauth",authenticateToken, fbUserApi.checkAuth);
v1Routes.post('/createUser', authRoutesAPI.signUpWithEmailandPassword);
v1Routes.post('/forgot-password', authRoutesAPI.sendPasswordResetLink);
v1Routes.post('/reset-password/verify', authRoutesAPI.verifyResetToken);
v1Routes.post('/reset-password', authRoutesAPI.resetPassword);
v1Routes.post('/update-password', authRoutesAPI.updatePassword);
v1Routes.post('/login', authRoutesAPI.loginUser);
v1Routes.post('/user/update', authRoutesAPI.updateUserData);


//sms routs
const sms = require("./smsController");
v1Routes.post('/request-otp', sms.sendSMSHandler);
v1Routes.post('/verify-otp', sms.verifyOTP);
v1Routes.post('/refresh-token', sms.refreshToken);
v1Routes.post('/validate-token', authenticateToken, sms.validateToken);

module.exports = v1Routes;
