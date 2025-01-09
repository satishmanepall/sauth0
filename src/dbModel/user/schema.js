const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI, {
});
const User = mongoose.model(
  "tbl_user",
  new mongoose.Schema(
    {
      name: {
          type: String
      },
      email: {
          type: String,
          lowercase: true, // Ensure emails are stored in lowercase
          trim: true,
          match: [/^\S+@\S+\.\S+$/, 'Invalid email address'], // Basic email validation
      },
      mobile_number: {
          type: String,
      },
      firebase_id: {
          type: String
      },
      role: {
          type: [String], 
          enum: ['Super Admin', 'Admin', 'Developer',  'Support', 'Product','Player'], // Define possible roles
          required: true,
      },
      created_by_user: {
          type: String,
      },
      created_time: {
          type: Date,
          default: Date.now, // Default to current time if updated
      },
      created_by_ip: {
          type: String,
      },
      created_by_user_agent: {
          type: String,
      },
      updated_by_user: {
          type: String,
      },
      updated_time: {
          type: Date,
          default: Date.now, // Default to current time if updated
      },
      updated_by_ip: {
          type: String,
      },
      updated_by_user_agent: {
          type: String,
      },
  },
    { versionKey: false }
  )
);

exports.User = User;
