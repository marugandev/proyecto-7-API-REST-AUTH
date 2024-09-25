const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema(
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
    }
    /* menus: [
      {
        type: mongoose.Types.ObjectId,
        ref: "menus"
      }
    ] */
  },
  {
    timestamps: true,
    collection: "dishes"
  }
);

const Dish = mongoose.model("dishes", dishSchema, "dishes");

module.exports = Dish;
