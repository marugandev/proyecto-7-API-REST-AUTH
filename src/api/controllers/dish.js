const Dish = require("../models/dish");
const { checkDuplicates } = require("../../utils/functions/checkDuplicates");

const getDishes = async (req, res, next) => {
  try {
    const dishes = await Dish.find(); /* .populate("menus") */
    return res.status(200).json(dishes);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getDishById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dish = await Dish.findById(id); /* .populate("menus") */
    return res.status(200).json(dish);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getDishesByPrice = async (req, res, next) => {
  try {
    const { price } = req.params;
    const PriceNumber = parseFloat(price);

    const dishByPrice = await Dish.find({
      price: { $lte: PriceNumber }
    });
    return res.status(200).json(dishByPrice);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const postDish = async (req, res, next) => {
  try {
    const { name, description, price } = req.body;

    const existingDish = await checkDuplicates(name, description, Dish);
    if (existingDish) {
      return res
        .status(200)
        .json("A dish with the same name or description already exists 😪");
    }
    const newDish = new Dish({
      name,
      description,
      price
    });
    const newDishSaved = await newDish.save();
    return res.status(201).json({
      message: "New dish created 🍴😋",
      elemento: newDishSaved
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateDish = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const existingDish = await checkDuplicates(name, description, Dish, id);
    if (existingDish) {
      return res
        .status(400)
        .json("A dish with the same name or description already exists 😪");
    }

    const newDish = new Dish({
      name,
      description,
      price
    });
    newDish._id = id;

    const dishUpdated = await Dish.findByIdAndUpdate(id, newDish, {
      new: true,
      runValidators: true
    });
    console.log("Dish updated ⚡️⚡️");
    return res.status(200).json(dishUpdated);
  } catch (error) {
    return res.status(400).json("Failed to update dish 😪");
  }
};

const deleteDish = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dishDeleted = await Dish.findByIdAndDelete(id);
    console.log("Dish deleted 🔥🔥");

    return res.status(200).json(dishDeleted);
  } catch (error) {
    return res.status(400).json("Error deleting dish 😪");
  }
};

module.exports = {
  getDishes,
  getDishById,
  getDishesByPrice,
  postDish,
  updateDish,
  deleteDish
};
