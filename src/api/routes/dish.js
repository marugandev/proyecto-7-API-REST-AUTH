const dishRoutes = require("express").Router();
const {
  getDishes,
  getDishById,
  getDishesByPrice,
  postDish,
  updateDish,
  deleteDish
} = require("../controllers/dish");
const { isAdmin } = require("../../middlewares/auth");

dishRoutes.get("/", getDishes);
dishRoutes.get("/:id", getDishById);
dishRoutes.get("/price/:price", getDishesByPrice);
dishRoutes.post("/", [isAdmin], postDish);
dishRoutes.put("/:id", [isAdmin], updateDish);
dishRoutes.delete("/:id", [isAdmin], deleteDish);

module.exports = dishRoutes;
