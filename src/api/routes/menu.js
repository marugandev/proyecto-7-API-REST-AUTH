const menuRoutes = require("express").Router();
const { isAdmin } = require("../../middlewares/auth");
const {
  getMenus,
  getMenuById,
  postMenu,
  updateMenu,
  deleteMenu
} = require("../controllers/menu");

menuRoutes.get("/", getMenus);
menuRoutes.get("/:id", getMenuById);
menuRoutes.post("/", [isAdmin], postMenu);
menuRoutes.put("/:id", [isAdmin], updateMenu);
menuRoutes.delete("/:id", [isAdmin], deleteMenu);

module.exports = menuRoutes;

/* Menús:
GET /menus: Obtener la lista de menús disponibles.
GET /menus/:id: Obtener detalles de un menú específico.
POST /menus: (Solo administradores) Crear un nuevo menú.
PUT /menus/:id: (Solo administradores) Actualizar el menú.
DELETE /menus/:id: (Solo administradores) Eliminar un menú. */
