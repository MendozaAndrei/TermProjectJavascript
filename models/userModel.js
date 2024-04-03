
let database = [
  {
    id: 1,
    name: "Jimmy Doe",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "regular",
    reminders: [
      {
        id: 1,
        title: "Grocery shopping",
        description: "Buy milk and bread from safeway",
        completed: false,
      },
    ],
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "admin",
    reminders: [
      {
        id: 1,
        title: "biking",
        description: "stanley park",
        completed: false,
      },
    ],
  }
]



const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
};



module.exports = { database, userModel };
