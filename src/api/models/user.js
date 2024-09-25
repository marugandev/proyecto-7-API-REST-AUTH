const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 20
    },
    email: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
      match: [/.+\@.+\..+/, "Please fill a valid email address"]
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 100
    },
    role: {
      type: String,
      trim: true,
      enum: ["user", "admin"],
      default: "user"
    }
  },
  {
    timestamps: true,
    collection: "users"
  }
);

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model("users", userSchema, "users");

module.exports = User;
