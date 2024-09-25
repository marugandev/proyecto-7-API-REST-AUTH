const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true
    },
    dishes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "dishes",
        required: true
      }
    ],
    total: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["Pending", "In preparation", "Delivered"],
      default: "Pending",
      required: true
    }
  },
  {
    timestamps: true,
    collection: "orders"
  }
);

const Order = mongoose.model("orders", orderSchema, "orders");

module.exports = Order;
