const { Router } = require("express");

const {
  getInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
} = require("../controllers/inventory.js");
const validateToken = require("../middlewares/validateToken.js");

const router = Router();

//? Api path: /inventory/

// Obtener todo el inventario
router.get("/", validateToken, getInventory);

// Obtener un inventario por id
router.get("/:id", validateToken, getInventoryById);

// Crear un inventario
router.post("/", validateToken, createInventory);

// Actualizar un inventario
router.put("/:id", validateToken, updateInventory);

// Eliminar un inventario
router.delete("/:id", validateToken, deleteInventory);

module.exports = router;
