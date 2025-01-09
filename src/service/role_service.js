const { Role } = require("../dbModel/role/schema");

//create role
const insertRole = async (roleData) => {
  try {
    const newRole = await new Role(roleData).save();
    return { status: 1, result: newRole };
  } catch (error) {
    console.log("newRole error", error);
    throw error;
  }
};

//update role
const updateRole = async (roleData, id) => {
  try {
    const role = await Role.findByIdAndUpdate({ _id: id }, { $set: roleData });
    return { status: 1, result: role };
  } catch (error) {
    console.log("updateRole error", error);
    throw error;
  }
};

//list roles
const getROles = async () => {
  try {
    const regex = new RegExp(["^", "Internal", "$"].join(""), "i");
    const roles = await Role.find({ role_type: regex });
    return { status: 1, result: roles };
  } catch (error) {
    console.log("roles error", error);
    throw error;
  }
};
//list roles by id
const getROlesById = async (ids) => {
  try {
    const roles = await Role.find({ _id: { $in: ids } });
    return { status: 1, result: roles };
  } catch (error) {
    console.log("roles error", error);
    throw error;
  }
};
//list roles
const getROle = async (role_name, facility_id) => {
  try {
    const roles = await Role.find({ role_name: role_name, "scope.facility_id": facility_id });
    return roles;
  } catch (error) {
    console.log("roles error", error);
    throw error;
  }
};

// remove Role information
const removeRole = async (roleId) => {
  try {
    const role = await Role.remove({
      _id: roleId,
    });
    return { status: 1, result: role };
  } catch (error) {
    console.log("removePermission error", error);
    throw error;
  }
};
module.exports = { getROlesById, insertRole, getROles, updateRole, removeRole, getROle };
