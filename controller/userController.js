const userModel = require("../models/userModel").userModel;

function isUserValid(user, password) {
  return user.password === password;
}
const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};


module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
};
