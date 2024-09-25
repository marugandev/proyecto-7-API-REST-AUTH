const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateSign } = require("../../config/jwt");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json("Error displaying to users 😪");
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json("Error displaying to user 😪");
  }
};

const register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    const userNameDuplicated = await User.findOne({ userName });
    if (userNameDuplicated) {
      return res
        .status(400)
        .json("Failed to register, username already exists 😪");
    }

    const emailDuplicated = await User.findOne({
      email
    });
    if (emailDuplicated) {
      return res
        .status(400)
        .json("Failed to register, email already exists 😪");
    }

    const newUser = new User({
      userName,
      email,
      password
    });

    const userSaved = await newUser.save();

    console.log("Register completed ⚡️⚡️");
    return res.status(201).json(userSaved);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json("The email or password is not correct 😪");
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = generateSign(user._id);
      console.log("Login completed ⚡️⚡️");
      return res.status(201).json({ user, token });
    } else {
      return res.status(200).json("The email or password is not correct 😪");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userName, email, password } = req.body;

    const newUser = new User({
      userName,
      email,
      password
    });
    newUser._id = id;
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const userUpdated = await User.findByIdAndUpdate(id, newUser, {
      new: true,
      runValidators: true
    });

    if (!userUpdated) {
      return res.status(404).json("User not found 😪");
    }

    console.log("User updated ⚡️⚡️");
    return res.status(200).json(userUpdated);
  } catch (error) {
    console.error(error);
    return res.status(400).json("Failed to update user 😪");
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userIdFromToken = req.user.id;

    if (req.user.role === "admin") {
      const userDeleted = await User.findByIdAndDelete(id);
      console.log("User deleted by admin 🔥🔥");
      return res.status(200).json(userDeleted);
    }

    if (id !== userIdFromToken) {
      return res.status(400).json("You can only delete your own account 😪");
    }

    const userDeleted = await User.findByIdAndDelete(userIdFromToken);
    console.log("User deleted by self 🔥🔥");

    return res.status(200).json(userDeleted);
  } catch (error) {
    return res.status(400).json("Error deleting users 😪");
  }
};

module.exports = {
  getUsers,
  getUserById,
  register,
  login,
  updateUser,
  deleteUser
};
