const User = require("../api/models/user");
const { verifyJwt } = require("../config/jwt");

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json("You are not authorized 😪");
    }

    const parsedToken = token.replace("Bearer ", "");
    const { id } = verifyJwt(parsedToken);

    const user = await User.findById(id);

    if (user.role === "admin") {
      user.password = null;
      req.user = user;
      next();
    }
  } catch (error) {
    return res.status(400).json("You are not authorized 😪");
  }
};

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json("You are not authorized 😪");
    }

    const parsedToken = token.replace("Bearer ", "");
    const { id } = verifyJwt(parsedToken);

    const user = await User.findById(id);

    user.password = null;
    req.user = user;
    /*     console.log(user); */

    next();
  } catch (error) {
    return res.status(400).json("You are not authorized 😪");
  }
};

module.exports = { isAdmin, isAuth };
