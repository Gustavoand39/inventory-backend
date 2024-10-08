const fs = require("fs");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const sequelize = require("../db/connection.js");
const Product = require("../models/Product.js");
const Category = require("../models/Category.js");
const Inventory = require("../models/InventoryLog.js");

const getListProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const { count, rows: products } = await Product.findAndCountAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
          required: false,
        }, // Left join con la tabla de categorías
      ],
      limit,
      offset,
    });

    const mappedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      stock: product.stock,
      minStock: product.minStock,
      image: product.image,
      category: product.Category.name,
    }));

    // Calcular el número total de páginas
    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      error: false,
      message: "Productos obtenidos",
      data: mappedProducts,
      totalItems: count,
      totalPages,
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
    const product = await Product.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ["name"],
          required: false,
        }, // Left join con la tabla de categorías
      ],
    });

    const mappedProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      stock: product.stock,
      minStock: product.minStock,
      image: product.image,
      category: product.Category.name,
    };

    if (!product) {
      return res.status(404).json({
        error: true,
        message: "Producto no encontrado",
      });
    }

    res.status(200).json({
      error: false,
      message: "Producto encontrado",
      data: mappedProduct,
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

    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });

    const newState = product.toJSON();

    await Inventory.create({
      productId: product.id,
      userId: decoded.userId,
      details: `Se ha creado un nuevo producto con ID: ${product.id}`,
      oldState: null,
      newState: newState,
    });

    res.status(201).json({
      error: false,
      message: "Producto creado exitosamente",
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
  const { name, description, stock, minStock, image, category } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        error: true,
        message: "Producto no encontrado",
      });
    }

    const oldState = product.toJSON();

    await product.update({
      name,
      description,
      stock,
      minStock,
      image,
      categoryId: category,
    });

    // Obtener el token de autorización
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    // Decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });

    const newState = product.toJSON();

    // Crear registro de inventario después de la actualización del producto
    await Inventory.create({
      productId: id,
      userId: decoded.userId,
      details: `Se actualizó el producto con ID: ${id}`,
      oldState: oldState,
      newState: newState,
    });

    res.status(200).json({
      error: false,
      message: "Producto actualizado exitosamente",
      data: product,
    });
  } catch (error) {
    console.error("Error al actualizar el producto", error);
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

    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });

    await Inventory.create({
      productId: null,
      userId: decoded.userId,
      details: `Se eliminó el producto con ID: ${id}`,
      oldState: null,
      newState: product,
    });

    res.status(200).json({
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

// Obtener los productos que están por debajo del stock mínimo
const getProductsLowStock = async (req, res) => {
  try {
    // Obtener los productos cuyo stock esté igual o menor que minStock
    const products = await Product.findAll({
      where: {
        stock: {
          [Op.lte]: sequelize.col("min_stock"),
        },
      },
      include: [
        {
          model: Category,
          attributes: ["name"],
          required: false,
        }, // Left join con la tabla de categorías
      ],
    });

    // Mapear para devolver solo los campos necesarios
    const mappedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      stock: product.stock,
      minStock: product.minStock,
      image: product.image,
      category: product.Category.name,
    }));

    res.status(200).json({
      error: false,
      message: "Productos con stock bajo",
      data: mappedProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const searchProduct = async (req, res) => {
  const { word, page = 1, limit = 10 } = req.query;

  try {
    const offset = (page - 1) * limit;

    const { count, rows: products } = await Product.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${word}%`,
        }, // Buscar por nombre
      },
      include: [
        {
          model: Category,
          attributes: ["name"],
          required: false,
        }, // Left join con la tabla de categorías
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    // Mapear para devolver solo los campos necesarios
    const mappedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      stock: product.stock,
      minStock: product.minStock,
      image: product.image,
      category: product.Category.name,
    }));

    const totalPages = Math.ceil(count / limit);

    res.json({
      error: false,
      message: "Productos encontrados",
      data: mappedProducts,
      totalItems: count,
      totalPages,
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
  getListProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsLowStock,
  searchProduct,
};
