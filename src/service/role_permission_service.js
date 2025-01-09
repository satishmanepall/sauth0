const { RolePermission } = require("../dbModel/role_permission/schema");

//create rolePermission
const insertRolePermission = async (rolePermissionData) => {
  try {
    const newRolePermission = await new RolePermission(rolePermissionData).save();
    return { status: 1, result: newRolePermission };
  } catch (error) {
    console.log("newRolePermission error", error);
    throw error;
  }
};

//list rolePermission
const getRolePermission = async () => {
  try {
    const rolePermissions = await RolePermission.find({});
    return { status: 1, result: rolePermissions };
  } catch (error) {
    console.log("rolePermissions error", error);
    throw error;
  }
};
//get rolePermission by role
const getRolePermissionByRole = async (role) => {
  try {
    const rolePermissions = await RolePermission.findOne({ role: role });
    return rolePermissions;
  } catch (error) {
    console.log("rolePermissions error", error);
    throw error;
  }
};

// Update Role Permission information
const updateRolePermission = async (rolePermissionObj, id) => {
  try {
    const rolePermissions = await RolePermission.findByIdAndUpdate({ _id: id }, { $set: rolePermissionObj });
    return { status: 1, result: rolePermissions };
  } catch (error) {
    console.log("updateRolePermission error", error);
    throw error;
  }
};
// remove RolePermission information
const removeRolePermission = async (roleId) => {
  try {
    const role = await RolePermission.remove({
      role_id: roleId,
    });
    return { status: 1, result: role };
  } catch (error) {
    console.log("removePermission error", error);
    throw error;
  }
};
module.exports = {
  removeRolePermission,
  insertRolePermission,
  getRolePermission,
  getRolePermissionByRole,
  updateRolePermission,
};
