const mongoose = require("mongoose");
const User = require("../../api/models/user");
const users = require("../../data/users");

const throwUsersSeeds = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://DB_USER:0EM8WHhrZD7WC5HU@cluster0.0nacd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to the BBDD 😜");

    await User.collection.drop();
    console.log("Users deleted from the BBDD 🔥🔥");

    await User.insertMany(users);
    console.log("Users added to the BBDD ⚡️⚡️");

    await mongoose.disconnect();
    console.log("Disconnected to the BBDD 😜");
  } catch (error) {
    console.log("The seed could not be implanted 😪");
  }
};

throwUsersSeeds();
