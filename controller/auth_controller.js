const { userModel } = require("../models/userModel");
const passport = require("passport");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/reminders",
      failureRedirect: "/login",
    })(req, res, next);
  },

  registerSubmit: (req, res) => {
    const { name, email, password, re_enter_password } = req.body;
  
    if (!name || !email || !password || !re_enter_password) {
      console.log("sdfsd");
      res.render
      ("auth/register", {
        message: "Please enter all fields",
      });
    } else if (password != re_enter_password) {
      console.log("bad");
      res.render("auth/register", {
        message: "Passwords do not match",
      });
    } else if (userModel.findOne(email)) {
      res.render("auth/register", {
        message: "Email already exists",
      });
    } else {
      const newUser = {
        name,
        email,
        password,
        role: "regular",
        reminders: [],
      };
      userModel.addUser(newUser)
      console.log(userModel.addUser(newUser));
      
      console.log("CHICKEN");
      res.redirect("/login"); 
    }
  },
};

module.exports = authController;