let database = require("../models/userModel").database;

let remindersController = {
  list: (req, res) => {
    // console.log(req.user)
    if (req.user && req.user.role === "admin") {
        res.redirect('/admin');
    } else if (req.user && req.user.role === "regular") {
      res.render("reminder/index", { reminders: req.user.reminders });
    } else {
      // Handle the case where req.user is undefined
      // Maybe redirect to login page or show an error message
      res.redirect("/login");
    }
  },
  // rest of the code

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: req.user.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    req.user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    req.user.reminders.find(function (reminder) {
      if (reminder.id == reminderToFind) {
        reminder.title = req.body.title;
        reminder.description = req.body.description;
        reminder.completed = true ? req.body.completed === "true" : false;
        return reminder.id
      }
    });
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    })
    req.user.reminders.splice(req.user.reminders.indexOf(searchResult), 1);
    res.redirect("/reminders");

  },
  admin: (req, res) => {
  
    req.sessionStore.all((err, sessions) => {
      if (err) {
        console.log(err);
        return res.redirect("/auth/login");
      }
  
      // console.log(sessions);
  
      let sessionList = [];
      for (let key in sessions) {
        if (req.user.id != sessions[key].passport.user) {
          sessionList.push({"SessionID":key, "UserID":sessions[key].passport.user})
        }
      }
      //console.log(sessionList);
      res.render("admin", { user: req.user, sessions: sessionList });
    });
  
  },
  destroy: (req, res) => {
    const sessionId = req.params.sessionId;
    console.log(sessionId)
    req.sessionStore.destroy(sessionId, (err) => {
      if (err) {
        console.log(err);
        return res.redirect('/admin');
      }
      res.redirect('/admin');
    });}

};

module.exports = remindersController;