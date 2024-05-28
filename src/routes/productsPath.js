const { Router } = require("express");

const {
  getListProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsLowStock,
  searchProduct,
} = require("../controllers/products.js");
const validateToken = require("../middlewares/validateToken.js");

const router = Router();

//? Api path: /products/

// Buscar un producto
router.get("/search", validateToken, searchProduct);

// Obtener los productos que están por debajo del stock mínimo
router.get("/low", validateToken, getProductsLowStock);

// Obtener un producto por id
router.get("/:id", validateToken, getProductById);

// Obtener todos los productos
router.get("/", validateToken, getListProducts);

// Crear un producto
router.post("/", validateToken, createProduct);

// Actualizar un producto
router.put("/:id", validateToken, updateProduct);

// Eliminar un producto
router.delete("/:id", validateToken, deleteProduct);

module.exports = router;
