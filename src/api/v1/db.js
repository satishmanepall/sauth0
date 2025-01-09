const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI, {
});

// Health check route to verify if DB connection is established
const checkDBStatus = async (req, res) => {
    if (mongoose.connection.readyState === 1) {
      // 1 indicates connected
      return res.status(200).json({ success: true, message: 'Database connected' })
    } else {
      return res.status(500).json({ success: false, message: 'Database connection failed' })
    }
  }
  
  module.exports = {
    checkDBStatus
  };