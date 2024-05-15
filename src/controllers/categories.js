import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({
      error: false,
      message: "Categorías encontradas",
      data: categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        error: true,
        message: "Categoría no encontrada",
      });
    }

    res.status(200).json({
      error: false,
      message: "Categoría encontrada",
      data: category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

export const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await Category.create({ name });

    res.status(201).json({
      error: false,
      message: "Categoría creada",
      data: category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        error: true,
        message: "Categoría no encontrada",
      });
    }

    await category.update({ name });

    res.status(200).json({
      error: false,
      message: "Categoría actualizada",
      data: category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        error: true,
        message: "Categoría no encontrada",
      });
    }

    await category.destroy();

    res.status(200).json({
      error: false,
      message: "Categoría eliminada",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};
