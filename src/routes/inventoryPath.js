const { Router } = require("express");

const {
  getInventory,
  getLastInventory,
  getInventoryById,
  createInventory,
} = require("../controllers/inventory.js");
const validateToken = require("../middlewares/validateToken.js");

const router = Router();

//? Api path: /inventory/

// Obtener el inventario reciente
router.get("/last", validateToken, getLastInventory);

// Obtener todo el inventario
router.get("/", validateToken, getInventory);

// Obtener un inventario por id
router.get("/:id", validateToken, getInventoryById);

// Crear un inventario
router.post("/", validateToken, createInventory);

module.exports = router;
