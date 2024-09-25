const mongoose = require("mongoose");
const User = require("../../api/models/user");
const users = require("../../data/users");
const Menu = require("../../api/models/menu");
const menus = require("../../data/menus");
const Dish = require("../../api/models/dish");
const dishes = require("../../data/dishes");

const mainSeed = async (model, modelName, data) => {
  try {
    await mongoose.connect(
      "mongodb+srv://DB_USER:0EM8WHhrZD7WC5HU@cluster0.0nacd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to the BBDD 😜");

    await model.collection.drop();
    console.log(`"${modelName} deleted from the BBDD 🔥🔥"`);

    await model.insertMany(data);
    console.log(`"${modelName} added to the BBDD ⚡️⚡️"`);

    await mongoose.disconnect();
    console.log("Disconnected to the BBDD 😜");
  } catch (error) {
    console.log("The seed could not be implanted 😪");
  }
};

const runMainSeed = async () => {
  await mainSeed(User, "users", users);
  await mainSeed(Menu, "menus", menus);
  await mainSeed(Dish, "dishes", dishes);
};

runMainSeed();
