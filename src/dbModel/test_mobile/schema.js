const mongoose = require('mongoose');

const MobileNumber= new mongoose.Schema({
  mobileNumber: { type: String },
  otp: { type: String }
});

module.exports = mongoose.model('MobileNumber', MobileNumber);
