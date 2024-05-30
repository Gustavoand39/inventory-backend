const { Router } = require("express");
const {
  getListCategories,
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  searchCategories,
} = require("../controllers/categories.js");
const validateToken = require("../middlewares/validateToken.js");
const { categoryValidate } = require("../middlewares/categoryValidate.js");
const { validateID } = require("../middlewares/validateID.js");

const router = Router();

//? Api path: /categories/

// Obtener todas las categorías
router.get("/all", [validateToken], getCategories);

// Buscar una categoría
router.get("/search", [validateToken], searchCategories);

// Obtener las categorías paginadas
router.get("/", [validateToken], getListCategories);

// Obtener una categoría por id
router.get("/:id", [validateToken, validateID], getCategoryById);

// Obtener todas las categorías paginadas
router.get("/", [validateToken], getCategories);

// Crear una categoría
router.post("/", [validateToken, categoryValidate], createCategory);

// Actualizar una categoría
router.put("/:id", [validateToken, categoryValidate], updateCategory);

// Eliminar una categoría
router.delete("/:id", [validateToken, validateID], deleteCategory);

module.exports = router;
