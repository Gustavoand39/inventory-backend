import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.json({
      error: false,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        error: true,
        message: "Producto no encontrado",
      });
    }

    res.json({
      error: false,
      message: "Producto encontrado",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, stock, minStock, image, categoryId } = req.body;

  try {
    const product = await Product.create({
      name,
      description,
      stock,
      minStock,
      image,
      categoryId,
    });

    res.json({
      error: false,
      message: "Producto creado exitosamente",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, stock, minStock, image } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        error: true,
        message: "Producto no encontrado",
      });
    }

    await product.update({
      name,
      price,
      description,
      stock,
      minStock,
      image,
    });

    res.json({
      error: false,
      message: "Producto actualizado exitosamente",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        error: true,
        message: "Producto no encontrado",
      });
    }

    await product.destroy();

    res.json({
      error: false,
      message: "Producto eliminado",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

export const updateStock = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        error: true,
        message: "Producto no encontrado",
      });
    }

    const newStock = product.stock + quantity;

    await product.update({
      stock: newStock,
    });

    res.json({
      error: false,
      message: "Stock actualizado exitosamente",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

export const updateMinStock = async (req, res) => {
  const { id } = req.params;
  const { minStock } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        error: true,
        message: "Producto no encontrado",
      });
    }

    await product.update({
      minStock,
    });

    res.json({
      error: false,
      message: "Stock mínimo actualizado exitosamente",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

// Obtener los productos que están por debajo del stock mínimo
export const getProductsLowStock = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        stock: {
          [Op.lte]: sequelize.col("minStock"),
        },
      },
    });

    res.json({
      error: false,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};

export const updateImage = async (req, res) => {
  const { id } = req.params;
  const { image } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        error: true,
        message: "Producto no encontrado",
      });
    }

    await product.update({
      image,
    });

    res.json({
      error: false,
      message: "Imagen actualizada exitosamente",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};
