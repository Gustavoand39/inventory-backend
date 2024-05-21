const { Router } = require("express");
const {
  getMovements,
  getMovementById,
  createMovement,
  updateMovement,
  deleteMovement,
} = require("../controllers/movements.js");

const router = Router();

//? Api path: /movements/

// Obtener todas las categorías
router.get("/", getMovements);

// Obtener una categoría por id
router.get("/:id", getMovementById);

// Crear una categoría
router.post("/", createMovement);

// Actualizar una categoría
router.put("/:id", updateMovement);

// Eliminar una categoría
router.delete("/:id", deleteMovement);

module.exports = router;
