const validator = require("validator");

const validateLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (
    !username ||
    typeof username !== "string" ||
    validator.isEmpty(username.trim())
  ) {
    return res.status(400).json({
      message: "Ingrese un nombre de usuario válido",
    });
  }

  if (
    !password ||
    typeof password !== "string" ||
    validator.isEmpty(password)
  ) {
    return res.status(400).json({
      message: "Ingrese una contraseña válida",
    });
  }

  next();
};

module.exports = {
  validateLogin,
};
