const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI, {
});
// Define the schema
const logSchema = new mongoose.Schema(
    {
      method: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      status: {
        type: Number,
        required: true,
      },
      responseTime: {
        type: Number,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      headers: {
        type: Map,
        of: String,
      },
      body: {
        type: mongoose.Schema.Types.Mixed,
      },
    },
    { versionKey: false }
  );
  
  // Create and export the model
  const Log = mongoose.model("Log", logSchema);
  module.exports = Log;
