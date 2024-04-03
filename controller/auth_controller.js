let database = require("../models/userModel");

let authController = {
  login: (req, res) => {
    res.render("login", { user: req.user });
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    let { username, password } = req.body;
    console.log(username, password)
    let user = database.users.find(user => {
      return user.username === username && user.password === password;
    });

    if (user) {
      // User found and password correct
      req.session.user = user;
      res.redirect('/reminder');
    } else {
      // User not found or password incorrect
      res.redirect('/login');
    }
  },

  registerSubmit: (req, res) => {
    // implement later
  },
};

module.exports = authController;
