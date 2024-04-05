// THIS IS A TEST - Andrei Jan Mendoza
const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const session = require("express-session");
const passport = require("./middleware/passport");


// Deals with the sessions
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(ejsLayouts);
app.use(passport.initialize());
app.use(passport.session());
// Routes start here

//Provides a GET Method. This grabs the URL and loads the page.
//An action that is done by a button also requires this along with their path.
app.get("/", reminderController.list); 
app.get("/reminders", reminderController.list);
app.get("/admin", reminderController.admin);
app.get("/destroy/:sessionId", reminderController.destroy); // This is a buttoned action, it needs a get and a post
app.get("/reminder/new", reminderController.new);
app.get("/reminder/:id", reminderController.listOne);
app.get("/reminder/:id/edit", reminderController.edit);
app.post("/reminder/", reminderController.create);
// ⭐ Implement these two routes below!
app.post("/reminder/update/:id", reminderController.update);
// AFter a delete has happened, it'll post it, and the redirects
app.post("/reminder/delete/:id", reminderController.delete);
app.post("/destroy/:sessionId", reminderController.destroy);

app.get("/logout", reminderController.logout);
app.post("/logout", reminderController.logout);
app.get("/register", authController.register);
app.get("/login", authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);




app.listen(3090, function () {
  console.log(passport.session())
  console.log(
    "Server running. Visit: http://localhost:3090/reminders in your browser 🚀"
  );
});
