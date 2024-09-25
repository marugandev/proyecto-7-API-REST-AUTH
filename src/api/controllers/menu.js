const Menu = require("../models/menu");
const { checkDuplicates } = require("../../utils/functions/checkDuplicates");

const getMenus = async (req, res, next) => {
  try {
    const menus = await Menu.find().populate("dishes");

    return res.status(200).json(menus);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getMenuById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findById(id).populate("dishes");

    return res.status(200).json(menu);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const postMenu = async (req, res, next) => {
  try {
    const { name, description, price, dishes } = req.body;

    const existingMenu = await checkDuplicates(name, description, Menu);
    if (existingMenu) {
      return res
        .status(400)
        .json("A menu with the same name or description already exists 😪");
    }

    const newMenu = new Menu({
      name,
      description,
      price,
      dishes: dishes ? [...new Set(dishes)] : []
    });

    const newMenuSaved = await newMenu.save();
    return res.status(201).json({
      message: "New menu created 🍴😋",
      elemento: newMenuSaved
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, dishes } = req.body;

    const existingMenu = await checkDuplicates(name, description, Menu, id);
    if (existingMenu) {
      return res
        .status(400)
        .json("A menu with the same name or description already exists 😪");
    }

    const updateData = {
      name,
      description,
      price
    };

    const updateQuery = { ...updateData };
    if (dishes && dishes.length > 0) {
      updateQuery.$addToSet = { dishes: { $each: dishes } };
    }

    const menuUpdated = await Menu.findByIdAndUpdate(id, updateQuery, {
      new: true,
      runValidators: true
    });
    console.log("Menu updated ⚡️⚡️");
    return res.status(200).json(menuUpdated);
  } catch (error) {
    return res.status(400).json("Failed to update menu 😪");
  }
};

const deleteMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const menuDeleted = await Menu.findByIdAndDelete(id);
    console.log("Menu deleted 🔥🔥");

    return res.status(200).json(menuDeleted);
  } catch (error) {
    return res.status(400).json("Error deleting menu 😪");
  }
};

module.exports = {
  getMenus,
  getMenuById,
  postMenu,
  updateMenu,
  deleteMenu
};
