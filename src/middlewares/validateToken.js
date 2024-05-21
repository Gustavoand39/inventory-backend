const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: true,
      message: "Token no proporcionado o inválido",
    });
  }

  // Extraer el token del encabezado
  const token = authHeader.split(" ")[1];

  try {
    if (!token) {
      return res.status(401).json({
        error: true,
        message: "No tienes autorización",
      });
    }

    // Verificar el token con la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });

    // Agregar la información del usuario a la solicitud
    req.user = decoded;

    // Continuar con el siguiente middleware o ruta
    next();
  } catch (error) {
    console.error("Error verificando token:", error);
    res.status(401).json({
      error: true,
      message: "Tu sesión ha expirado",
    });
  }
};

module.exports = validateToken;
