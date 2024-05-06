import { Router } from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  updateMinStock,
  updateImage,
} from "../controllers/products.js";

const router = Router();

//? Api path: /products/

// Obtener todos los productos
router.get("/", getProducts);

// Obtener un producto por id
router.get("/:id", getProductById);

// Crear un producto
router.post("/", createProduct);

// Actualizar un producto
router.put("/:id", updateProduct);

// Eliminar un producto
router.delete("/:id", deleteProduct);

// Actualizar el stock de un producto
router.patch("/:id/stock", updateStock);

// Actualizar el stock mínimo de un producto
router.patch("/:id/minStock", updateMinStock);

// Actualizar la imagen de un producto
router.patch("/:id/image", updateImage);

export default router;
