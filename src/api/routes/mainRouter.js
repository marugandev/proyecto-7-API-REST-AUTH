const mainRouter = require("express").Router();
const dishRoutes = require("./dish");
const menuRoutes = require("./menu");
const orderRoutes = require("./order");
const userRoutes = require("./user");

mainRouter.use("/users", userRoutes);
mainRouter.use("/menus", menuRoutes);
mainRouter.use("/dishes", dishRoutes);
mainRouter.use("/orders", orderRoutes);

module.exports = mainRouter;
