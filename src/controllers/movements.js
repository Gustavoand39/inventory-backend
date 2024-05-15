import Movement from "../models/Movement.js";

export const getMovements = async (req, res) => {
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

export const getMovementById = async (req, res) => {
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

export const createMovement = async (req, res) => {
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

export const updateMovement = async (req, res) => {
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

export const deleteMovement = async (req, res) => {
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
