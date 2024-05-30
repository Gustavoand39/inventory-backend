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

const productValidate = async (req, res, next) => {
  const { name, description, stock, minStock, image, category } = req.body;

  if (!name || typeof name !== "string" || validator.isEmpty(name.trim())) {
    return res.status(400).json({
      message: "Ingrese un nombre válido",
    });
  }

  if (description && typeof description !== "string") {
    return res.status(400).json({
      message: "Ingrese una descripción válida",
    });
  }

  if (stock === undefined || !validator.isInt(stock.toString(), { min: 0 })) {
    return res.status(400).json({
      message: "La cantidad de stock debe ser un número mayor o igual a 0",
    });
  }

  if (
    minStock !== undefined &&
    !validator.isInt(minStock.toString(), { min: 0 })
  ) {
    return res.status(400).json({
      message:
        "La cantidad de stock mínimo debe ser un número mayor o igual a 0",
    });
  }

  if (image && typeof image !== "string") {
    return res.status(400).json({
      message: "Ha ocurrido un error con la imagen del producto",
    });
  }

  if (!category || !validator.isInt(category.toString(), { min: 1 })) {
    return res.status(400).json({
      message: "Ingrese una categoría válida",
    });
  }

  next();
};

module.exports = {
  validateID,
  productValidate,
};
