
let database = require("../database");

let remindersController = {
  list: (req, res) => {
    console.log(req.users.reminders)
    res.render("reminder/index", { reminders: req.users.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.users.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: req.users.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: req.users.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    req.users.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.users.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.users.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    searchResult.title = req.body.title;
    searchResult.description = req.body.description;
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.users.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    let index = req.users.reminders.indexOf(searchResult);
    req.users.reminders.splice(index, 1);
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
