const { Router } = require("express");
const {
  getListCategories,
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories.js");

const router = Router();

//? Api path: /categories/

// Obtener todas las categorías
router.get("/all", getCategories);

// Obtener las categorías paginadas
router.get("/", getListCategories);

// Obtener una categoría por id
router.get("/:id", getCategoryById);

// Obtener todas las categorías paginadas
router.get("/", getCategories);

// Crear una categoría
router.post("/", createCategory);

// Actualizar una categoría
router.put("/:id", updateCategory);

// Eliminar una categoría
router.delete("/:id", deleteCategory);

module.exports = router;
