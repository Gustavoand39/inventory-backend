const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const User = require("../models/User.js");

const getListUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      limit,
      offset,
    });

    const totalUsers = await User.count();

    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
      error: false,
      message: "Usuarios obtenidos",
      data: users,
      totalItems: totalUsers,
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

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Usuario no encontrado",
      });
    }

    res.json({
      error: false,
      message: "Usuario obtenido",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const createUser = async (req, res) => {
  const { name, last_name, user_name, email, password } = req.body;

  try {
    const [existingEmail, existingUserName] = await Promise.all([
      User.findOne({ where: { email } }),
      User.findOne({ where: { user_name } }),
    ]);

    if (existingEmail)
      return res.status(400).json({
        error: true,
        message: "El email ya está registrado",
      });

    if (existingUserName)
      return res.status(400).json({
        error: true,
        message: "El nombre de usuario ya está registrado",
      });

    // Generar un hash para la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear el usuario con la contraseña encriptada
    const user = await User.create({
      name,
      last_name,
      user_name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      error: false,
      message: "Usuario creado exitosamente",
    });
  } catch (error) {
    console.error("Error creando usuario:", error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, lastName, userName, email, password } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Usuario no encontrado",
      });
    }

    await user.update({
      name,
      lastName,
      userName,
      email,
      password,
    });

    res.json({
      error: false,
      message: "Usuario actualizado",
      data: user,
    });
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Usuario no encontrado",
      });
    }

    await user.destroy();

    res.json({
      error: false,
      message: "Usuario eliminado exitosamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const searchUser = async (req, res) => {
  const { query, page = 1, limit = 10 } = req.query;

  try {
    const offset = (page - 1) * limit;

    const { count, rows: users } = await User.findAndCountAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            user_name: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const totalPages = Math.ceil(users.length / limit);

    res.json({
      error: false,
      message: "Usuarios obtenidos",
      data: users,
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
  getListUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUser,
};
