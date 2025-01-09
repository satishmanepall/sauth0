const mongoose = require('mongoose');

const User = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password :{type: String},
  role:{type:[String]},
  message :{type:String},
  messageId :{type:String},
  mobileNumber: { type: String },
  refreshToken: { type: String },
  passwordResetToken: { type: String },
  passwordResetExpiresAt: { type: String },
  otp: { type: String },
  otpExpiresAt: { type: Date },
  otpSentTime: { type: Date ,default:Date.now},
  smsStatus:{ type: String },
  error:{type:Object}
});

module.exports = mongoose.model('User', User);
