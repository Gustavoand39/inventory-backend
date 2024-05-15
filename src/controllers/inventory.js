import Inventory from "../models/inventory.js";

export const getInventory = async (req, res) => {
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

export const getInventoryById = async (req, res) => {
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

export const createInventory = async (req, res) => {
  const { movementId, productId, userId, details } = req.body;

  try {
    const inventory = await Inventory.create({
      movementId,
      productId,
      userId,
      details,
    });

    res.status(201).json({
      error: true,
      inventory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};

export const updateInventory = async (req, res) => {
  const { id } = req.params;
  const { movementId, productId, userId, details } = req.body;

  try {
    const inventory = await Inventory.findByPk(id);

    if (!inventory) {
      return res.status(404).json({
        ok: false,
        message: "Inventario no encontrado",
      });
    }

    await inventory.update({
      movementId,
      productId,
      userId,
      details,
    });

    res.status(200).json({
      ok: true,
      inventory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};

export const deleteInventory = async (req, res) => {
  const { id } = req.params;

  try {
    const inventory = await Inventory.findByPk(id);

    if (!inventory) {
      return res.status(404).json({
        ok: false,
        message: "Inventario no encontrado",
      });
    }

    await inventory.destroy();

    res.status(200).json({
      ok: true,
      inventory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};
