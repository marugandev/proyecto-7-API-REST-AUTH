const Order = require("../models/order");
const Dish = require("../models/dish");

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate({
        path: "dishes",
        select: "name description price"
      });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("userId", "name email")
      .populate("dishes", "name price");

    return res.status(200).json(order);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const postOrder = async (req, res, next) => {
  try {
    const { userId, dishes } = req.body;

    const dishDetails = await Dish.find({ _id: { $in: dishes } });
    const total = dishDetails.reduce((acc, dish) => acc + dish.price, 0);

    const newOrder = new Order({
      userId,
      dishes,
      total,
      status: "Pending"
    });

    const savedOrder = await newOrder.save();

    return res.status(201).json({
      message: "Order created successfully 🛒✌️",
      order: savedOrder
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error creating order 😪",
      error
    });
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { dishes, status } = req.body;

    const updateOrder = { dishes, status };
    const orderUpdated = await Order.findByIdAndUpdate(id, updateOrder, {
      new: true,
      runValidators: true
    });

    return res.status(200).json(orderUpdated);
  } catch (error) {
    return res.status(400).json({
      message: "Error updating order 😪",
      error
    });
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderDeleted = await Order.findByIdAndDelete(id);
    console.log("Order deleted 🔥🔥");

    return res.status(200).json(orderDeleted);
  } catch (error) {
    return res.status(400).json({
      message: "Error deleting order 😪",
      error
    });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  postOrder,
  updateOrder,
  deleteOrder
};
