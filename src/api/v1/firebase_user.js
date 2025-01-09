const firebaseService = require("../../service/firebase_user_service");
const userService = require("../../service/user_service");
const emailService = require("../../service/email_service");
const rolePermissionService = require("../../service/role_permission_service");
const crypto = require('crypto');

const sendTestEmailApi = async (req, res) => {
  try {
    const email = await firebaseService.sendTestEmail();
    res.status(200).json({ success: true, message });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const signUpWithEmailandPassword = async (req, res) => {
  try {
    const randomPassword =await  generateRandomPassword();
    const randomUID = generateUID(); // Adjust length as needed
    const randomDisplayName = generateRandomDisplayName(8);

    const userObj = {
      uid: randomUID,
      displayName:req.body?.name?req.body.name: randomDisplayName,
      email: req.body.email,
      password: randomPassword, // Assign generated password
      emailVerified: false,
      disabled: false,
    };

    // Create the user with Firebase
    const firebaseUser = await firebaseService.createUserWithEmailandPassword(userObj);
    // Send email verification
    const emailVerification = await firebaseService.sendEmailVerification(userObj.email);
    // create user
    var obj={
      email:userObj.email,
      firebase_id: userObj.uid,
      name:userObj.displayName,
      role:req.body.role
    }
    const user = await userService.createUser(obj)
    const passwordEmail = await emailService.sendEmailCreate(userObj.email, "Your Claw King Account Login Details" ,userObj?.displayName,userObj?.password );
    res.status(200).json({ success: true,data:firebaseUser, message: emailVerification });
  } catch (err) {
    console.error("signUpWithEmailandPassword error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

// Checking the authentication of the user logged in
const checkAuth = async (req, res) => {
  /* #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Verify the token',
      schema: {
        $auth_token: 'Email',
      }
} */
  try {
    //const uid = await firebaseService.verifyAuthToken(req.body.auth_token);
    //const firebaseId=uid
    let getUser = await userService.getUserById(req.user.userId)
    getUser = JSON.parse(JSON.stringify(getUser));
    const role=getUser.role[0]
    const operation =req.body.operation
    let getRolePermission = await rolePermissionService.getRolePermissionByRole(role)
    getRolePermission = JSON.parse(JSON.stringify(getRolePermission));
    var isauthorized =false
    if (getRolePermission.permissions && getRolePermission.permissions[operation] === true) {
      isauthorized=true
    }
    message = { isauthorized: isauthorized, user_id:req.user.userId ,permission:getRolePermission};
    res.status(200).json({ success: true, message });
  } catch (err) {
    console.log("checkAuth error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

// Checking the authentication of the user logged in
const mobileCheckAuth = async (req, res) => {
  /* #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Verify the token',
      schema: {
        $auth_token: 'Email',
      }
} */
  try {
    console.log("mobileCheckAuth")
    const uid = await firebaseService.verifyAuthToken(req.body.auth_token);
    console.log("mobileCheckAuth",uid)
    const firebaseId=uid
    let getUser = await userService.getUser(firebaseId)
    if(getUser){
      getUser = JSON.parse(JSON.stringify(getUser));
      message = {uid: firebaseId ,userData:getUser};
      return res.status(200).json({ success: true, message });
    }
    const randomNumber = generateRandomNumber(6);
    var obj={
      firebase_id: firebaseId,
      name:"Player"+randomNumber,
      role:["Player"],
      mobile_number:req.body.mobile_number
    }
    let user = await userService.createUser(obj)
    user = JSON.parse(JSON.stringify(user));
    message = { uid: firebaseId ,userData:user};
    res.status(200).json({ success: true, message });
  } catch (err) {
    console.log("checkAuth error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
// Signup the user with Mobile Number
const signUpWithMobile = async (req, res) => {
  /*    #swagger.parameters['obj'] = {
                  in: 'body',
                  description: 'Creating new Firebase user with Mobile',
                  schema: {
                    $uid: 'uid string'
                    $phoneNumber: 'Buchibabu Tungam',
                  }
          } */
  try {
    var userObj = {};
    userObj.uid = req.body.uid;
    userObj.displayName = req.body.displayName;
    userObj.phoneNumber = req.body.phoneNumber;
    userObj.disabled = false;
    const user = await firebaseService.createUserWithEmailandPassword(userObj);
    const email = await firebaseService.sendEmailVerification(
      userObj.displayName,
      userObj.email
    );
    res.status(200).json({ success: true, message });
  } catch (err) {
    console.log("signUpWithMobile error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};



// Reset the Password
const resetPassword = async (req, res) => {
  /* #swagger.parameters['obj'] = {
       in: 'body',
       description: 'Reset user password with email and password',
       schema: {
         $auth_token: 'Token',
       }
 } */
  try {
    var userObj = {};
    userObj.email = req.body.email;
    const email = await firebaseService.sendResetEmailLink(userObj.email);
    const passwordEmail = await emailService.sendEmail(userObj.email, "Reset your password for claw-king-c4fea" ,email );
  
    res.status(200).json({ success: true,status_code:1, message:"Password send to mail" });
  } catch (err) {
    console.log("resetPassword error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

// Change the Password
const changePassword = async (req, res) => {
  /* #swagger.parameters['obj'] = {
       in: 'body',
       description: 'Reset user password with email and password',
       schema: {
         $uid: 'uid string'
         $email: 'buchibabu@samyutha.com',
         $password: 'Random password',
       }
 } */
  try {
    validatePassword(req.body.password);
    var userObj = {};
    userObj.email = req.body.email;
    userObj.password = req.body.password;
    var uid = req.body.uid;
    const user = await firebaseService.changeFBPassword(uid, userObj);
    message = { uid: uid };
    res.status(200).json({ success: true,status_code:1, message });
  } catch (err) {
    console.log("changePassword error", err);
    res.status(err.statusCode || 500).json({status_code:0, message: err.message });
  }
};
// Remove users
const removeUsers = async (req, res) => {
  /* #swagger.parameters['obj'] = {
       in: 'body',
       description: 'Reset user password with email and password',
       schema: {
         $usersIds: '',
       }
 } */
  try {
    const email = await firebaseService.removeUsers(req.body.userIds);
    
    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    console.log("resetPassword error", err);
    res.status(err.statusCode || 500).json({status_code:0, message: err.message });
  }
};


// Function to generate a random password
async function generateRandomPassword() {
  // Define character sets
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  
  // Function to get a random character from a given set
  const getRandomChar = (charset) => charset[Math.floor(Math.random() * charset.length)];
  
  // Ensure the password has at least one of each type
  let password = [
    getRandomChar(uppercase),    // 1 Uppercase
    getRandomChar(lowercase),    // 1 Lowercase
    getRandomChar(numbers),      // 1 Number
    getRandomChar(specialChars), // 1 Special character
  ];
  
  // Fill the rest of the password with random characters from all sets
  const allChars = uppercase + lowercase + numbers + specialChars;
  for (let i = 4; i < 10; i++) {
    password.push(getRandomChar(allChars));
  }
  
  // Shuffle the password array to ensure random order
  password = password.sort(() => Math.random() - 0.5);
  
  // Join the array into a string and return
  return password.join('');
}

// Function to generate a 24-character hexadecimal UID
const generateUID = () => {
  return crypto.randomBytes(12).toString('hex'); // 12 bytes * 2 = 24 characters
};

// Function to generate a random display name
function generateRandomDisplayName(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
// Function to generate a random password
function generateRandomNumber(length) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Function to validate the password
const validatePassword = (password) => {
  const minLength = 10;
  const maxLength = 14;
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  const passwordPattern = new RegExp(
      `^(?=.*[${lowercase}])(?=.*[${uppercase}])(?=.*[${numbers}])(?=.*[${specialChars.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}])[${lowercase}${uppercase}${numbers}${specialChars.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}]{10,14}$`
    );
  // Check if the password matches the pattern
  if (!passwordPattern.test(password)) {
    throw new Error('Password must be between 10 to 14 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
  }

  // Additional checks for length if needed (min/max length check is included in the pattern)
  if (password.length < minLength) {
    throw new Error(`Password must be at least ${minLength} characters long.`);
  }

  if (password.length > maxLength) {
    throw new Error(`Password must not exceed ${maxLength} characters.`);
  }
};

// Controller to enable or disable a user
const userEnableDisable = async (req, res) => {
  try {
      const { uid,is_active } = req.body;
      var obj={
        disabled:is_active
      }
      const result = await firebaseService.userEnableDisable(uid,obj);
      return res.status(200).json({
          status_code: 1
      });
  } catch (error) {
      return res.status(500).json({
          status_code: 0,
          message: error.message,
      });
  }
};
module.exports = {
  signUpWithEmailandPassword,
  signUpWithMobile,
  checkAuth,
  resetPassword,
  changePassword,
  sendTestEmailApi,
  removeUsers,
  mobileCheckAuth,
  userEnableDisable
};