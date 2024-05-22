const fs = require("fs");
const { Op } = require("sequelize");

const sequelize = require("../db/connection.js");
const Product = require("../models/Product.js");

const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Página actual, predeterminada es 1
    const limit = parseInt(req.query.limit) || 10; // Número de productos por página, predeterminado es 10

    const offset = (page - 1) * limit; // Calcular el desplazamiento

    const products = await sequelize.query(
      `SELECT p.id, p.name, p.description, p.stock, p.min_stock as minStock, p.image, c.name as category
      FROM Products p
      LEFT JOIN Categories c
      ON p.category_id = c.id
      LIMIT :limit OFFSET :offset`,
      {
        replacements: { limit, offset },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    // Consulta para obtener el total de productos
    const total = await sequelize.query(
      `SELECT COUNT(*) as total FROM Products`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.json({
      error: false,
      message: "Productos obtenidos",
      products,
      total: total[0].total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await sequelize.query(
      `SELECT p.id, p.name, p.description, p.stock, p.min_stock as minStock, p.image, c.name as category
      FROM Products p
      LEFT JOIN Categories c
      ON p.category_id = c.id
      WHERE p.id = :id`,
      {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!product) {
      return res.status(404).json({
        error: true,
        message: "Producto no encontrado",
      });
    }

    res.json({
      error: false,
      message: "Producto encontrado",
      product: product[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const createProduct = async (req, res) => {
  const { name, description, stock, minStock, image, category } = req.body;

  try {
    const product = await Product.create({
      name,
      description,
      stock,
      minStock,
      image,
      categoryId: category,
    });

    res.json({
      error: false,
      message: "Producto creado exitosamente",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, stock, minStock, image } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        error: true,
        message: "Producto no encontrado",
      });
    }

    await product.update({
      name,
      price,
      description,
      stock,
      minStock,
      image,
    });

    res.json({
      error: false,
      message: "Producto actualizado exitosamente",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        error: true,
        message: "Producto no encontrado",
      });
    }

    if (product.image) fs.unlinkSync(`public/${product.image}`);

    await product.destroy();

    res.json({
      error: false,
      message: "Producto eliminado",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const updateStock = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        error: true,
        message: "Producto no encontrado",
      });
    }

    const newStock = product.stock + quantity;

    await product.update({
      stock: newStock,
    });

    res.json({
      error: false,
      message: "Stock actualizado exitosamente",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const updateMinStock = async (req, res) => {
  const { id } = req.params;
  const { minStock } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        error: true,
        message: "Producto no encontrado",
      });
    }

    await product.update({
      minStock,
    });

    res.json({
      error: false,
      message: "Stock mínimo actualizado exitosamente",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

// Obtener los productos que están por debajo del stock mínimo
const getProductsLowStock = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        stock: {
          [Op.lt]: sequelize.col("min_stock"),
        },
      },
    });

    console.log("-->", products);

    res.json({
      error: false,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const updateImage = async (req, res) => {
  const { id } = req.params;
  const { image } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        error: true,
        message: "Producto no encontrado",
      });
    }

    await product.update({
      image,
    });

    res.json({
      error: false,
      message: "Imagen actualizada exitosamente",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  updateMinStock,
  getProductsLowStock,
  updateImage,
};
