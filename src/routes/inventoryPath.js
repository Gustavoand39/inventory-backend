const { Router } = require("express");

const {
  getLastInventory,
  getInventoryById,
} = require("../controllers/inventory.js");
const validateToken = require("../middlewares/validateToken.js");

const router = Router();

//? Api path: /inventory/

// Obtener el inventario reciente
router.get("/last", validateToken, getLastInventory);

// Obtener un inventario por id
router.get("/:id", validateToken, getInventoryById);

module.exports = router;
