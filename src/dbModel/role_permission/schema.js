const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI, {
});
const RolePermission = mongoose.model(
  "tbl_role_permissions",
  new mongoose.Schema(
    {
      role: { type: String },
      permissions: { type: Object },
      is_active: { type: Boolean },
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

exports.RolePermission = RolePermission;
