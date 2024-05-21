import { Router } from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  updateMinStock,
  getProductsLowStock,
  updateImage,
} from "../controllers/products.js";
import validateToken from "../middlewares/validateToken.js";

const router = Router();

//? Api path: /products/

// Obtener los productos que están por debajo del stock mínimo
router.get("/low", validateToken, getProductsLowStock);

// Obtener un producto por id
router.get("/:id", validateToken, getProductById);

// Obtener todos los productos
router.get("/", validateToken, getProducts);

// Crear un producto
router.post("/", validateToken, createProduct);

// Actualizar un producto
router.put("/:id", validateToken, updateProduct);

// Eliminar un producto
router.delete("/:id", validateToken, deleteProduct);

// Actualizar el stock de un producto
router.patch("/:id/stock", validateToken, updateStock);

// Actualizar el stock mínimo de un producto
router.patch("/:id/minStock", validateToken, updateMinStock);

// Actualizar la imagen de un producto
router.patch("/:id/image", validateToken, updateImage);

export default router;
