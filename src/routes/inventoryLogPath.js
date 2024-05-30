const { Router } = require("express");

const {
  getListInventory,
  getLastInventory,
  getInventoryById,
  searchInventory,
} = require("../controllers/inventoryLog.js");
const validateToken = require("../middlewares/validateToken.js");
const { validateID } = require("../middlewares/validateID.js");

const router = Router();

//? Api path: /inventory/

// Buscar un inventario por nombre de producto
router.get("/search", validateToken, searchInventory);

// Obtener el inventario reciente
router.get("/last", validateToken, getLastInventory);

// Obtener un inventario por id
router.get("/:id", [validateToken, validateID], getInventoryById);

// Obtener todos los inventarios paginados
router.get("/", validateToken, getListInventory);

module.exports = router;
