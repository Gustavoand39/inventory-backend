const validator = require("validator");

const validateID = (req, res, next) => {
  const { id } = req.params;

  if (!validator.isInt(id, { min: 1 })) {
    return res.status(400).json({
      message: "Ingrese un ID válido",
    });
  }

  next();
};

module.exports = {
  validateID,
};
