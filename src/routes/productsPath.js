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
const { productValidate } = require("../middlewares/productValidate.js");
const { validateID } = require("../middlewares/validateID.js");

const router = Router();

//? Api path: /products/

// Buscar un producto
router.get("/search", [validateToken], searchProduct);

// Obtener los productos que están por debajo del stock mínimo
router.get("/low", [validateToken], getProductsLowStock);

// Obtener un producto por id
router.get("/:id", [validateToken, validateID], getProductById);

// Obtener todos los productos
router.get("/", [validateToken], getListProducts);

// Crear un producto
router.post("/", [validateToken, productValidate], createProduct);

// Actualizar un producto
router.put("/:id", [validateToken, productValidate], updateProduct);

// Eliminar un producto
router.delete("/:id", [validateToken, validateID], deleteProduct);

module.exports = router;
