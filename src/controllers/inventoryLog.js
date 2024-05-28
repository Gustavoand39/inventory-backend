const { Op } = require("sequelize");

const Inventory = require("../models/InventoryLog.js");
const Product = require("../models/Product.js");
const User = require("../models/User.js");

const getListInventory = async (req, res) => {
  const { page = 1, limit = 10 } = req.params;

  try {
    const offset = (page - 1) * limit;

    const { count, rows: inventory } = await Inventory.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: Product,
          attributes: ["name"],
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    if (!inventory) {
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
        product: item.Product.name,
        user: item.User.name,
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
    // Obtener los 10 inventarios más recientes y hacer join para obtener el nombre del producto y del usuario
    const inventory = await Inventory.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Product,
          attributes: ["name"], // Solo incluye el nombre del producto
        },
        {
          model: User,
          attributes: ["name"], // Solo incluye el nombre del usuario
        },
      ],
    });

    if (!inventory) {
      return res.status(404).json({
        error: true,
        message: "Inventarios no encontrados",
      });
    }

    // Map para obtener solo los datos necesarios
    const mappedInventory = inventory.map((item) => {
      return {
        id: item.id,
        product: item.Product.name,
        user: item.User.name,
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
        },
        {
          model: User,
          attributes: ["name"], // Solo incluye el nombre del usuario
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
      product: inventory.Product.name,
      user: inventory.User.name,
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
  const { word, page, limit } = req.query;

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
        },
        {
          model: User,
          attributes: ["name"], // Solo incluye el nombre del usuario
        },
      ],
    });

    const totalPages = Math.ceil(count / limit);

    // Mapear los datos necesarios
    const mappedInventory = inventory.map((item) => ({
      id: item.id,
      product: item.Product.name,
      user: item.User.name,
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
