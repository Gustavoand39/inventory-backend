const Inventory = require("../models/Inventory.js");
const Product = require("../models/Product.js");
const User = require("../models/User.js");

const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findAll();

    res.status(200).json({
      ok: true,
      data: inventory,
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
      };
    });

    res.status(200).json({
      ok: true,
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
    const inventory = await Inventory.findByPk(id);

    if (!inventory) {
      return res.status(404).json({
        error: true,
        message: "Inventario no encontrado",
      });
    }

    res.status(200).json({
      error: false,
      data: inventory,
    });
  } catch (error) {
    console.error("Error al obtener el inventario", error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const createInventory = async (req, res) => {
  const { productId, userId, details } = req.body;

  try {
    const inventory = await Inventory.create({
      productId,
      userId,
      details,
    });

    res.status(201).json({
      error: false,
      inventory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};

module.exports = {
  getInventory,
  getLastInventory,
  getInventoryById,
  createInventory,
};
