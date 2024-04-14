let database = require("../models/userModel").database;

let remindersController = {
  list: (req, res) => {
    // console.log(req.user)
    if (req.user && req.user.role === "admin") {
        res.redirect('/admin');
    } else if (req.user && req.user.role === "regular") {
      res.render("reminder/index", { reminders: req.user.reminders });
    } else {
      res.redirect("/login");
    }
  },

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


  create: async (req, res) => {
    let reminder = {
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
      bannerImage: await keywordToimage(req.body.title),
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
/*
  update: async (req, res) => {
    let reminderToFind = req.params.id; 
    req.user.reminders.find(function (reminder) {
      if (reminder.id == reminderToFind) {
        reminder.title = req.body.title;
        const imageUrl = await keywordToimage(req.body.title);
        reminder.bannerImage = imageUrl;
        reminder.description = req.body.description;
        reminder.completed = true ? req.body.completed === "true" : false;
        return reminder.id
      }
    });
    res.redirect("/reminders");
  },
*/
update: async (req, res) => {
  try {
      let reminderToFind = req.params.id;
      let reminder = req.user.reminders.find(reminder => reminder.id == reminderToFind);

      if (!reminder) {
          return res.status(404).send("Reminder not found");
      }

      reminder.title = req.body.title;
      reminder.description = req.body.description;
      reminder.completed = req.body.completed === "true";

      // Update the banner image
      const imageUrl = await keywordToimage(req.body.title);
      reminder.bannerImage = imageUrl;

      res.redirect("/reminders");
  } catch (error) {
      console.error("Error updating reminder:", error);
      res.status(500).send("Server Error");
  }
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
        return res.redirect("/login");
      }
  
      console.log(sessions);
  
      let sessionList = [];
      for (let key in sessions) {
        if (req.user.id != sessions[key].passport.user) {
          console.log(key)
          sessionList.push({"SessionID":key, "UserID":sessions[key].passport.user})
        }
      }
      // console.log(sessionList);
      res.render("admin", { user: req.user, sessions: sessionList });
    });
  
  },
  destroy: (req, res) => {
    const sessionId = req.params.sessionId;
    req.sessionStore.destroy(sessionId, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ error: 'Failed to destroy session' });
      } else {
        console.log('Session destroyed successfully');
        res.redirect('/admin');
      }
    });
  },

  logout: (req, res) => {
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
        }
        res.redirect('/login'); 
      });
    }

};

async function keywordToimage(keyword) {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${keyword}&client_id=f1JxwA3wa9KLQchV8RXeo46tX1pyA_79vya7FsAoJrA`);
    const data = await response.json();

    if (data.results.length === 0) {
      console.log("No images found for keyword:", keyword);
      return null;
    }

    const photoUrl = data.results[0].urls.regular;
    console.log(photoUrl)
    return photoUrl;
  } catch (error) {
    console.log('Error fetching photo:', error);
    return null;
  }
}


module.exports = remindersController;