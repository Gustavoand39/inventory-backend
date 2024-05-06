import bcrypt from "bcrypt";

import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.json({
      ok: true,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

export const createUser = async (req, res) => {
  const { name, lastName, userName, email, password, roleId } = req.body;

  try {
    const [existingEmail, existingUserName] = await Promise.all([
      User.findOne({ where: { email } }),
      User.findOne({ where: { userName } }),
    ]);

    if (existingEmail)
      return res.status(400).json({
        ok: false,
        message: "El email ya está registrado",
      });

    if (existingUserName)
      return res.status(400).json({
        ok: false,
        message: "El nombre de usuario ya está registrado",
      });

    // Generar un hash para la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear el usuario con la contraseña encriptada
    const user = await User.create({
      name,
      lastName,
      userName,
      email,
      password: hashedPassword,
      roleId,
    });

    res.json({
      ok: true,
      message: "Usuario creado exitosamente",
      user: {
        id: user.id,
        name: user.name,
        userName: user.userName,
        email: user.email,
        roleId: user.roleId,
      },
    });
  } catch (error) {
    console.error("Error creando usuario:", error);
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, lastName, userName, email, password } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        ok: false,
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
      ok: true,
      message: "Usuario actualizado",
      user,
    });
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    await user.destroy();

    res.json({
      ok: true,
      message: "Usuario eliminado",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};
