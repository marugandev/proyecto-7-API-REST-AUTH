const userRoutes = require("express").Router();
const { isAdmin, isAuth } = require("../../middlewares/auth");
const {
  getUsers,
  getUserById,
  register,
  login,
  updateUser,
  deleteUser
} = require("../controllers/user");

userRoutes.get("/", [isAdmin], getUsers);
userRoutes.get("/:id", [isAdmin], getUserById);
userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.put("/:id", [isAdmin], updateUser);
userRoutes.delete("/:id", [isAuth], deleteUser);
//dar de baja un client a si mismo

module.exports = userRoutes;
