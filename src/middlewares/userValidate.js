const validator = require("validator");

const validateUser = (req, res, next) => {
  const { name, last_name, user_name, email, password } = req.body;

  if (!name || typeof name !== "string" || validator.isEmpty(name.trim())) {
    return res.status(400).json({
      message: "Ingrese un nombre válido",
    });
  }

  if (
    last_name &&
    (!last_name ||
      typeof last_name !== "string" ||
      validator.isEmpty(last_name.trim()))
  ) {
    return res.status(400).json({
      message: "Ingrese un apellido válido",
    });
  }

  if (
    !user_name ||
    typeof user_name !== "string" ||
    validator.isEmpty(user_name.trim())
  ) {
    return res.status(400).json({
      message: "Ingrese un nombre de usuario válido",
    });
  }

  if (
    !email ||
    typeof email !== "string" ||
    validator.isEmpty(email.trim()) ||
    !validator.isEmail(email)
  ) {
    return res.status(400).json({
      message: "Ingrese un correo electrónico válido",
    });
  }

  if (password) {
    if (
      !password ||
      typeof password !== "string" ||
      validator.isEmpty(password.trim())
    ) {
      return res.status(400).json({
        message: "Ingrese una contraseña válida",
      });
    }
  }

  next();
};

module.exports = {
  validateUser,
};
