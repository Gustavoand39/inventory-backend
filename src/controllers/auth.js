import jwt from "jsonwebtoken"; // Se usa para generar el token
import bcrypt from "bcrypt"; // Se usa para comparar contraseñas

import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar al usuario por su nombre de usuario
    const user = await User.findOne({ where: { user_name: username } });

    if (!user) {
      return res.status(400).json({
        error: true,
        message: "Usuario no encontrado",
      });
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        error: true,
        message: "Contraseña incorrecta",
      });
    }

    // Crear un token
    const token = jwt.sign(
      { userId: user.id, username: user.user_name }, // Datos que se guardarán en el token
      JWT_SECRET, // Clave secreta
      { expiresIn: "5s" }
    );

    // Retornar el token y datos básicos del usuario
    res.status(200).json({
      error: false,
      message: "Inicio de sesión correcto",
      token,
      user: {
        id: user.id,
        username: user.user_name,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

export const refreshToken = async (req, res) => {
  const { token } = req.body;

  try {
    if (!token) {
      return res.status(401).json({
        error: true,
        message: "No tienes autorización",
      });
    }

    // Verificar el token de refresco
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });

    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Usuario no válido",
      });
    }

    // Crear un nuevo token
    const newToken = jwt.sign(
      { userId: decoded.userId, username: decoded.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Retornar el nuevo token
    res.json({
      error: false,
      message: "Token de refresco válido",
      user: {
        id: user.id,
        username: user.user_name,
      },
      token: newToken,
    });
  } catch (error) {
    console.error("Error refrescando token:", error);
    res.status(401).json({
      error: true,
      message: "Tu sesión ha expirado",
    });
  }
};
