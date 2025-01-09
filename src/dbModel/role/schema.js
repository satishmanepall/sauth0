const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI, {
});
const Role = mongoose.model(
  "tbl_role",
  new mongoose.Schema(
    {
      role_name: { type: String },
      role_type: { type: String },
      role_descr: { type: String },
      scope: {
        facility_id: { type: String },
        society_id: { type: String },
        unit_id: { type: String },
        location_id: { type: String },
      },
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

exports.Role = Role;
