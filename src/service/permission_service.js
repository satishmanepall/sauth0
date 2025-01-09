const { Permission } = require("../dbModel/permission/schema");
const { RolePermission } = require("../dbModel/role_permission/schema");
const { Role } = require("../dbModel/role/schema");

//create permission
const insertPermission = async (permissionData) => {
  try {
    const newPermission = await new Permission(permissionData).save();
    return { status: 1, result: newPermission };
  } catch (error) {
    console.log("newPermission error", error);
    throw error;
  }
};
//create multiple
const insertMultiplePermission = async (permissionData) => {
  try {
    const newPermission = await Permission.insertMany(permissionData);
    return { status: 1, result: newPermission };
  } catch (error) {
    console.log("insertTransaction error", error);
    throw error;
  }
};
//list permission
const getPermission = async () => {
  try {
    const permissions = await Permission.find({});
    return { status: 1, result: permissions };
  } catch (error) {
    console.log("permissions error", error);
    throw error;
  }
};
//list permission by role id
const getPermissionByROleId = async (roleId) => {
  try {
    const permissions = await Permission.find({ role_id: roleId });
    return permissions;
  } catch (error) {
    console.log("permissions error", error);
    throw error;
  }
};
// remove Permission information
const removePermission = async (roleids, permissionName, moduleName) => {
  try {
    const rolePermissions = await Permission.remove({
      _id: { $in: roleids },
    });
    return { status: 1, result: rolePermissions };
  } catch (error) {
    console.log("removePermission error", error);
    throw error;
  }
};

const removeAllPermission = async () => {
  try {
    const droprole = await Role.drop();
    const droppermission = await Permission.drop();
    const droproleperms = await RolePermission.drop();

    return { status: 1, result: droprole };
  } catch (error) {
    console.log("removePermission error", error);
    throw error;
  }
};
//update permission
const updatePermission = async (permissionData, id) => {
  try {
    const permission = await Permission.findByIdAndUpdate({ _id: id }, { $set: permissionData });
    return { status: 1, result: permission };
  } catch (error) {
    console.log("permission error", error);
    throw error;
  }
};
module.exports = {
  insertPermission,
  insertMultiplePermission,
  getPermission,
  getPermissionByROleId,
  removePermission,
  updatePermission,
  removeAllPermission,
};
