const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");
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

// create a session middleware with the given options
passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

// Keeps session up to date 
passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    return done(null, user);
  } else {
    return done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin);