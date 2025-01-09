const User= require("../dbModel/userModel/schema");

// Function to create a new user if the email does not exist
const createUser = async (userObj) => {
  try {
    const newUser = new User(userObj);
    await newUser.save();
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
//login user
const login = async (email, password) => {
  try {
    const user = await User.findOne({ email: email, password: password });
    return user;
  } catch (error) {
    console.log("user error", error);
    throw error;
  }
};
//update UserUser
const updateUser = async (userData, id) => {
  try {
    const user = await User.findByIdAndUpdate({ _id: id }, { $set: userData });
    return { status: 1, result: user };
  } catch (error) {
    console.log("updateUser error", error);
    throw error;
  }
};
//get user
const getUserById = async (id) => {
  console.log(123)
  try {
    const user = await User.findOne({ _id: id });
    return user;
  } catch (error) {
    console.log("getUser error", error);
    throw error;
  }
};
//get user
const getUser = async (id) => {
  console.log(123)
  try {
    const user = await User.findOne({ firebase_id: id });
    return user;
  } catch (error) {
    console.log("getUser error", error);
    throw error;
  }
};
module.exports = {
  login,
  updateUser,
  getUser,
  createUser,
  getUserById
};
