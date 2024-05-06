import jwt from "jsonwebtoken"; // Se usa para generar el token
import bcrypt from "bcrypt"; // Se usa para comparar contraseñas

import User from "../models/User.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        ok: false,
        message: "Contraseña incorrecta",
      });
    }

    // Crear un token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET, // Clave secreta
      { expiresIn: "1h" } // Duración del token
    );

    // Retornar el token y datos básicos del usuario
    res.json({
      ok: true,
      message: "Inicio de sesión correcto",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};
