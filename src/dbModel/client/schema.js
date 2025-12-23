const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema({
  apikey: { type: String, required: true, unique: true }, // the API key itself
  owner: { type: String, required: true },                // account/user id
  status: { type: String, enum: ["active", "revoked"], default: "active" },
  createdAt: { type: Date, default: Date.now }
});

// Export the model (use this model for DB operations)
module.exports = mongoose.model('tbl_apikey', apiKeySchema);
