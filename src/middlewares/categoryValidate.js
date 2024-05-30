const validator = require("validator");

const categoryValidate = (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  if (id) {
    if (isNaN(id) || !Number.isInteger(parseFloat(id))) {
      return res.status(400).json({
        message: "Ingrese un id de categoría válido",
      });
    }
  }

  if (!name || typeof name !== "string" || validator.isEmpty(name.trim())) {
    return res.status(400).json({
      message: "Ingrese un nombre de categoría válido",
    });
  }

  next();
};

module.exports = {
  categoryValidate,
};
