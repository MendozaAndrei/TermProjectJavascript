const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");
const User = require("../models/userModel.js");
const { userModel } = require("../models/userModel.js");
const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
        message: "Your login details are not valid. Please try again",
      });
  }
);

passport.serializeUser(function (user, done) {
  if (user.login) done(null, user.login);
  else done(null, user);
});

passport.deserializeUser(function (id, done) {
  if (typeof id === "object") {
    done(null, id);
  } else {
    let user = userController.getUserById(id);
    if (user) {
      done(null, user);
    } else {
      done({ message: "User not found" }, null);
    }
  }
});

module.exports = passport.use(localLogin);
