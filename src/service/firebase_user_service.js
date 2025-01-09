const admin = require("firebase-admin");
const emailTemplates = require("../common/templates/email");
const emailService = require("./email_service");
const request = require("request");
const { User } = require("../dbModel/user/schema");
//App Initialization
// Initialize the first Firebase Admin instance
const serviceAccount1 = require("../../firebaseServiceAccountKey1.json");
const app1 = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount1),
}, 'app1');

// Initialize the second Firebase Admin instance
const serviceAccount2 = require("../../firebaseServiceAccountKey2.json");
const app2 = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount2),
}, 'app2');

// Create Firebase User with Email and Passowrd
const createUserWithEmailandPassword = async (userData) => {
  try {
    const user = await app2.auth().createUser(userData);
    return user;
  } catch (error) {
    console.log("createUserWithEmailandPassword error", error);
    throw error;
  }
};
// Test Email
const sendTestEmail = async () => {
  try {
    const email = "buchibabu@samyutha.com";
    const emailBody = "Hello, How are you?";
    const bb = await emailService.sendEmail(email, emailBody);
    return bb;
  } catch (error) {
    console.log("sendTest Email error", error);
  }
};
// Send Email Verification Link
const sendEmailVerification = async (email) => {
  try {
    const emailLink = await app2.auth().generatePasswordResetLink(email);
    return emailLink
  } catch (error) {
    console.log("sendEmailVerification error", error);
    throw error;
  }
};

// Send Email Verification Link
const sendResetEmailLink = async (email) => {
  try {

      const emailLink = await app2.auth().generatePasswordResetLink(email);
      console.log(emailLink);
      return emailLink

  } catch (error) {
    console.log("sendResetEmailLink error", error);
    throw error;
  }
};

// Send Change Passowrd Email
const sendChangePasswordEmail = async (id, email, displayName) => {
  try {
    let json = {
      mode: "email",
      code: "N-004",
      receiver_email: email,
      receiver_id: id,
      receiver_token: "",
      variables: {
        display_name: displayName,
      },
    };
    let options = {
      uri: process.env.SNS_API,
      // port:443,
      method: "POST",
      json: json,
    };
    request(options, function (error, response, body) {
      if (error) {
        console.error("httpRequests : error " + error);
      }
      if (response) {
        console.log(body);
        let statusCode = response.status_code;
        return body;
      }
    });
  } catch (error) {
    console.log("sendChangePasswordEmail error", error);
    throw error;
  }
};

// Verify Authentication Token with multiple Firebase projects
const verifyAuthToken = async (tokenId) => {
  try {
    console.log("tokenId",tokenId)
    console.log("Verifying token with Project 1");
    const decodedToken = await app1.auth().verifyIdToken(tokenId);
    const uid = decodedToken.uid;
    return uid;
  } catch (error) {
    console.log("Verification with Project 1 failed, trying Project 2", error);
    try {
      const decodedToken = await app2.auth().verifyIdToken(tokenId);
      const uid = decodedToken.uid;
      return uid;
    } catch (error) {
      console.log("Verification with both projects failed", error);
      throw error;
    }
  }
};

// Change password for Firebase User with Email and Passowrd
const changeFBPassword = async (uid, userData) => {
  try {
    const user = await app2.auth().updateUser(uid, userData);
    return user;
  } catch (error) {
    console.log("changeFBPassword error", error);
    throw error;
  }
};

// Update Firebase User with Email and Passowrd
const updateUserWithEmailandPassword = async (uid, userData) => {
  try {
    const user = await admin.auth().updateUser(uid, userData);
    return user;
  } catch (error) {
    console.log("updateUserWithEmailandPassword error", error);
    throw error;
  }
};
// Remove users
const removeUsers = async (userIds) => {
  try {
    for (let i = 0; i < userIds.length; i++) {
      const removeUser = deleteUser(userIds[i]);
    }
    return { status: 1 };
  } catch (error) {
    console.log("delete user  error", error);
    throw error;
  }
};

// Function to delete a user from Firebase
const deleteUser = async (uid) => {
  try {
    // Delete the user using Firebase Admin SDK
    await app2.auth().deleteUser(uid);
    await User.findOneAndUpdate(
      { firebase_id: uid },  // Find by firebase_id
      { $set: {mobile_number:""} },           // Set the fields to be updated
      { new: true }                 // Return the updated document
    );
    console.log("Successfully deleted user", uid);
  } catch (error) {
    console.log("Error deleting user:", error);
    throw error;
  }
};
// Enable or  Disable a Firebase user
const userEnableDisable = async (uid,obj) => {
  try {
      // Update the user's disabled or Enable property to true/false
      const userRecord = await app2.auth().updateUser(uid, obj);
      const removeToken=await app2.auth().revokeRefreshTokens(uid);
      return userRecord
  } catch (error) {
      throw new Error(`Failed to enable user: ${error.message}`);
  }
};


module.exports = {
  removeUsers,
  createUserWithEmailandPassword,
  sendEmailVerification,
  sendResetEmailLink,
  sendChangePasswordEmail,
  changeFBPassword,
  updateUserWithEmailandPassword,
  verifyAuthToken,
  sendTestEmail,
  userEnableDisable
};
