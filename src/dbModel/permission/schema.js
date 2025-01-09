const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI, {
});
const Permission = mongoose.model(
  "tbl_permission",
  new mongoose.Schema(
    {
      role_id: { type: String },
      module_name: { type: String },
      permission_name: { type: String },
      is_active: { type: Boolean, default: true },
      created_by: { id: { type: String }, user_name: { type: String } },
      created_time: { type: Date, default: Date.now },
      create_ip: { type: String },
      create_agent: { type: String },
      updated_by: { id: { type: String }, user_name: { type: String } },
      updated_time: { type: Date, default: Date.now },
      update_ip: { type: String },
      update_agent: { type: String },
    },
    { versionKey: false }
  )
);

exports.Permission = Permission;
