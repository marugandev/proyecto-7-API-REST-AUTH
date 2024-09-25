const orderRoutes = require("express").Router();
const { isAdmin, isAuth } = require("../../middlewares/auth");
const {
  getOrders,
  getOrderById,
  postOrder,
  updateOrder,
  deleteOrder
} = require("../controllers/order");

orderRoutes.get("/", [isAdmin], getOrders);
orderRoutes.get("/:id", [isAuth], getOrderById);
orderRoutes.post("/", [isAuth], postOrder);
orderRoutes.put("/:id", [isAdmin], updateOrder);
orderRoutes.delete("/:id", [isAdmin], deleteOrder);

module.exports = orderRoutes;
