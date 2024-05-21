import { Router } from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.js";

const router = Router();

//? Api path: /categories/

// Obtener una categoría por id
router.get("/:id", getCategoryById);

// Obtener todas las categorías
router.get("/", getCategories);

// Crear una categoría
router.post("/", createCategory);

// Actualizar una categoría
router.put("/:id", updateCategory);

// Eliminar una categoría
router.delete("/:id", deleteCategory);

export default router;
