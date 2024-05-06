import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.json({
      ok: true,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
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
        ok: false,
        message: "Producto no encontrado",
      });
    }

    res.json({
      ok: true,
      message: "Producto encontrado",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, description, stock, minStock, image } = req.body;

  try {
    const product = await Product.create({
      name,
      price,
      description,
      stock,
      minStock,
      image,
    });

    res.json({
      ok: true,
      message: "Producto creado exitosamente",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
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
        ok: false,
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
      ok: true,
      message: "Producto actualizado exitosamente",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
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
        ok: false,
        message: "Producto no encontrado",
      });
    }

    await product.destroy();

    res.json({
      ok: true,
      message: "Producto eliminado",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
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
        ok: false,
        message: "Producto no encontrado",
      });
    }

    const newStock = product.stock + quantity;

    await product.update({
      stock: newStock,
    });

    res.json({
      ok: true,
      message: "Stock actualizado exitosamente",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
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
        ok: false,
        message: "Producto no encontrado",
      });
    }

    await product.update({
      minStock,
    });

    res.json({
      ok: true,
      message: "Stock mínimo actualizado exitosamente",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
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
        ok: false,
        message: "Producto no encontrado",
      });
    }

    await product.update({
      image,
    });

    res.json({
      ok: true,
      message: "Imagen actualizada exitosamente",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};
