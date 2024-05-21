const Role = require("../models/Role.js");

const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json({
      error: false,
      message: "Roles encontrados",
      data: roles,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const getRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({
        error: true,
        message: "Rol no encontrado",
      });
    }

    res.status(200).json({
      error: false,
      message: "Rol encontrado",
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const createRole = async (req, res) => {
  const { name } = req.body;

  try {
    const role = await Role.create({ name });

    res.status(201).json({
      error: false,
      message: "Rol creado",
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const updateRole = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({
        error: true,
        message: "Rol no encontrado",
      });
    }

    await role.update({ name });

    res.status(200).json({
      error: false,
      message: "Rol actualizado",
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({
        error: true,
        message: "Rol no encontrado",
      });
    }

    await role.destroy();

    res.status(200).json({
      error: false,
      message: "Rol eliminado",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

module.exports = {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
