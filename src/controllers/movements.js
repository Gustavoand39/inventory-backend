const Movement = require("../models/Movement.js");

const getMovements = async (req, res) => {
  try {
    const movements = await Movement.findAll();
    res.status(200).json({
      error: false,
      message: "Movimientos encontrados",
      data: movements,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const getMovementById = async (req, res) => {
  const { id } = req.params;
  try {
    const movement = await Movement.findByPk(id);

    if (!movement) {
      return res.status(404).json({
        error: true,
        message: "Movimiento no encontrado",
      });
    }

    res.status(200).json({
      error: false,
      message: "Movimiento encontrado",
      data: movement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const createMovement = async (req, res) => {
  const { name } = req.body;

  try {
    const movement = await Movement.create({
      name,
    });

    res.status(201).json({
      error: false,
      message: "Movimiento creado",
      data: movement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const updateMovement = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const movement = await Movement.findByPk(id);

    if (!movement) {
      return res.status(404).json({
        error: true,
        message: "Movimiento no encontrado",
      });
    }

    await movement.update({
      name,
    });

    res.status(200).json({
      error: false,
      message: "Movimiento actualizado",
      data: movement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const deleteMovement = async (req, res) => {
  const { id } = req.params;

  try {
    const movement = await Movement.findByPk(id);

    if (!movement)
      return res.status(404).json({
        error: true,
        message: "Movimiento no encontrado",
      });

    await movement.destroy();

    res.status(200).json({
      error: false,
      message: "Movimiento eliminado",
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
  getMovements,
  getMovementById,
  createMovement,
  updateMovement,
  deleteMovement,
};
