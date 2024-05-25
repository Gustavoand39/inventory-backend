const { Op } = require("sequelize");

const Category = require("../models/Category.js");

const getListCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const categories = await Category.findAll({
      offset,
      limit,
    });

    const totalCategories = await Category.count();

    const totalPages = Math.ceil(totalCategories / limit);

    res.status(200).json({
      error: false,
      message: "Categorías encontradas",
      data: categories,
      totalItems: totalCategories,
      totalPages,
    });
  } catch (error) {
    console.error("Error al obtener las categorías", error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();

    res.status(200).json({
      error: false,
      message: "Categorías encontradas",
      data: categories,
    });
  } catch (error) {
    console.error("Error al obtener las categorías", error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const getCategoryById = async (req, res) => {
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
    console.error("Error al obtener la categoría", error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await Category.create({ name });

    res.status(201).json({
      error: false,
      message: "Categoría creada",
      data: category,
    });
  } catch (error) {
    console.error("Error al crear la categoría", error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const updateCategory = async (req, res) => {
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
    console.error("Error al actualizar la categoría", error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const deleteCategory = async (req, res) => {
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
    console.error("Error al eliminar la categoría", error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

const searchCategories = async (req, res) => {
  const { word, page = 1, limit = 10 } = req.query;

  try {
    const offset = (page - 1) * limit;

    const { count, rows: categories } = await Category.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${word}%`,
        },
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      error: false,
      message: "Categorías encontradas",
      data: categories,
      totalItems: count,
      totalPages,
    });
  } catch (error) {
    console.error("Error al buscar las categorías", error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

module.exports = {
  getListCategories,
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  searchCategories,
};
