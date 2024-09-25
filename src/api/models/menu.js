const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    dishes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "dishes"
      }
    ]
  },
  {
    timestamps: true,
    collection: "menus"
  }
);

const Menu = mongoose.model("menus", menuSchema, "menus");

module.exports = Menu;
