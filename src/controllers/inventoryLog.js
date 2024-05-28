const { Op } = require("sequelize");

const Inventory = require("../models/InventoryLog.js");
const Product = require("../models/Product.js");
const User = require("../models/User.js");

const getListInventory = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const offset = (page - 1) * limit;

    const { count, rows: inventory } = await Inventory.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]], // Ordenar por fecha de creación [DESC]
      include: [
        {
          model: Product,
          attributes: ["name"],
          required: false, // Permite resultados sin un producto asociado
        },
        {
          model: User,
          attributes: ["name"],
          required: false, // Permite resultados sin un usuario asociado
        },
      ],
    });

    if (inventory.length === 0) {
      return res.status(404).json({
        error: true,
        message: "Inventarios no encontrados",
      });
    }

    const totalPages = Math.ceil(count / limit);

    // Map para obtener solo los datos necesarios
    const mappedInventory = inventory.map((item) => {
      return {
        id: item.id,
        product: item.Product ? item.Product.name : "Producto eliminado",
        user: item.User ? item.User.name : "Usuario eliminado",
        details: item.details,
        date: item.createdAt,
        newState: item.newState,
        oldState: item.oldState,
      };
    });

    res.status(200).json({
      error: false,
      message: "Inventarios obtenidos correctamente",
      data: mappedInventory,
      totalItems: count,
      totalPages,
    });
  } catch (error) {
    console.error("Error al obtener los inventarios", error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const getLastInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Product,
          attributes: ["name"],
          required: false, // Permite resultados sin un producto asociado
        },
        {
          model: User,
          attributes: ["name"],
          required: false, // Permite resultados sin un usuario asociado
        },
      ],
    });

    if (!inventory.length) {
      return res.status(404).json({
        error: true,
        message: "Inventarios no encontrados",
      });
    }

    // Map para obtener solo los datos necesarios
    const mappedInventory = inventory.map((item) => {
      return {
        id: item.id,
        product: item.Product ? item.Product.name : "Producto eliminado",
        user: item.User ? item.User.name : "Usuario eliminado",
        details: item.details,
        date: item.createdAt,
        newState: item.newState,
        oldState: item.oldState,
      };
    });

    res.status(200).json({
      error: false,
      message: "Inventarios obtenidos correctamente",
      data: mappedInventory,
    });
  } catch (error) {
    console.error("Error al obtener los inventarios", error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const getInventoryById = async (req, res) => {
  const { id } = req.params;

  try {
    // Obtener un inventario por id y hacer join para obtener el nombre del producto y del usuario
    const inventory = await Inventory.findByPk(id, {
      include: [
        {
          model: Product,
          attributes: ["name"], // Solo incluye el nombre del producto
          required: false,
        },
        {
          model: User,
          attributes: ["name"], // Solo incluye el nombre del usuario
          required: false,
        },
      ],
    });

    if (!inventory) {
      return res.status(404).json({
        error: true,
        message: "Inventario no encontrado",
      });
    }

    // Mapear los datos necesarios
    const mappedInventory = {
      id: inventory.id,
      product: inventory.Product
        ? inventory.Product.name
        : "Producto eliminado",
      user: inventory.User ? inventory.User.name : "Usuario eliminado",
      details: inventory.details,
      date: inventory.createdAt,
      newState: inventory.newState,
      oldState: inventory.oldState,
    };

    res.status(200).json({
      error: false,
      message: "Inventario obtenido correctamente",
      data: mappedInventory,
    });
  } catch (error) {
    console.error("Error al obtener el inventario", error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const searchInventory = async (req, res) => {
  const { word, page = 1, limit = 10 } = req.query;

  try {
    const offset = (page - 1) * limit;

    // Obtener un inventario por id y hacer join para obtener el nombre del producto y del usuario
    const { count, rows: inventory } = await Inventory.findAndCountAll({
      where: {
        [Op.or]: [
          {
            details: {
              [Op.like]: `%${word}%`,
            },
          },
        ],
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: Product,
          attributes: ["name"], // Solo incluye el nombre del producto
          required: false,
        },
        {
          model: User,
          attributes: ["name"], // Solo incluye el nombre del usuario
          required: false,
        },
      ],
    });

    const totalPages = Math.ceil(count / limit);

    // Mapear los datos necesarios
    const mappedInventory = inventory.map((item) => ({
      id: item.id,
      product: item.Product ? item.Product.name : "Producto eliminado",
      user: item.User ? item.User.name : "Usuario eliminado",
      details: item.details,
      date: item.createdAt,
      newState: item.newState,
      oldState: item.oldState,
    }));

    res.status(200).json({
      error: false,
      message: "Inventario obtenido correctamente",
      data: mappedInventory,
      totalItems: count,
      totalPages,
    });
  } catch (error) {
    console.error("Error al obtener el inventario", error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

module.exports = {
  getListInventory,
  getLastInventory,
  getInventoryById,
  searchInventory,
};
