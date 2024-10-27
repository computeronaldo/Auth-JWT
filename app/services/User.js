const User = require("../models/user.models");

const fetchUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (err) {
    throw err;
  }
};

const createUser = async (userData) => {
  try {
    const newUser = await User.NewUser(userData);
    if (!newUser) return null;
    const user = new User(newUser);
    const savedUser = await user.save();
    return savedUser;
  } catch (err) {
    throw err;
  }
};

module.exports = { fetchUserByUsername, createUser };
