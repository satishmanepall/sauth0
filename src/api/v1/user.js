const userService = require("../../service/user_service");
const jwt = require("jsonwebtoken");
const roleService = require("../../service/role_service");
const rolePermissionService = require("../../service/role_permission_service");
const fireBaseUserService = require("../../service/firebase_user_service");
const { buildAuditObj } = require("../../_utils/auditObject");
const config = require("../../common/messages");
const { buildUserPropQuery } = require("../../_utils/buildDBQuery");
//var uuid = require("node-uuid");
// Gloabl Variables
let respSuccess = config.API_SUCCESS_OBJ;
let respFailed = config.API_FAILED_OBJ;

// Creating a new user
const login = async (req, res) => {
  const auditObj = await buildAuditObj(req);

  /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Creating a new user',
                schema: {
                    $email: 'Ramu (Mandatory)',
                    $password: 'reddy (Optinal)'
                  
                }
        } */
  try {
    if (req.body.email === undefined) {
      respFailed["message"] = "email name is required";
      return res.status(400).send(respFailed);
    }
    if (req.body.password === undefined) {
      respFailed["message"] = "password is required";
      return res.status(400).send(respFailed);
    }
    const userObjrb = await userService.login(
      req.body.email,
      req.body.password
    );
    if (userObjrb) {
      const token = jwt.sign(
        { user_id: userObjrb["_id"].toString() },
        "GDtfDCFYjD",
        { expiresIn: "365d" },
        { algorithm: "HS256" }
      );
      const rolePermission =
        await rolePermissionService.getRolePermissionByRole([
          userObjrb["role_id"],
        ]);
      userObjrb["_doc"]["role_permissions"] = rolePermission[0];
      userObjrb["_doc"]["jwt_token"] = token;
      var updateUserObj = {
        jwt_token: userObjrb["jwt_token"],
      };
      const updatedUser = await userService.updateUser(
        updateUserObj,
        userObjrb["_id"]
      );

      respSuccess["data"] = userObjrb;
      return res.status(200).send(respSuccess);
    } else {
      delete ["respFailed"];
      respFailed["message"] = "Email or password wrong";
      return res.status(200).send(respFailed);
    }
    // Insert the user into Database
  } catch (error) {
    console.log("Email or password wrong", error);
    respFailed["message"] = "Email or password wrong";

    respFailed["message"] = "Email or password wrong " + error;
    return res.status(500).send(respFailed);
  }
};
// checkauth
const checkAuth = async (req, res) => {
  /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Creating a new user',
                schema: {
                    $token: 'Ramu (Mandatory)'
                }
        } */
  try {
    var decoded = jwt.verify(req.body.token, "GDtfDCFYjD");
    let userdata = await userService.getUser(decoded.sub.id);
    if (userdata === null) {
      return res
        .status(400)
        .send({ user_msg: "user not found", status_code: 0 });
    } else {
      const rolePermission =
        await rolePermissionService.getRolePermissionByRole([
          userdata["role_id"],
        ]);
      userdata["_doc"]["role_permissions"] = rolePermission[0];
      respSuccess["data"] = userObjrb;
      return res.status(200).send(respSuccess);
    }

    // Insert the user into Database
  } catch (error) {
    console.log("verifyToken error", err);
    res
      .status(401)
      .send({ user_msg: "inavlid token", status_code: 0, err: err });
  }
};
module.exports = {
  login,
  checkAuth,
};
