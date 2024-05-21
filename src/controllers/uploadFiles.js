import fs from "fs";
import sharp from "sharp";

const imagePath = "images";

export const uploadImage = async (req, res) => {
  try {
    const { folder = "uploads" } = req.body;
    const file = req.files.image;
    const fileName = file.name;

    // Verificar si el archivo es una imagen
    if (!fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
      return res
        .status(400)
        .json({ error: true, message: "El archivo no es una imagen" });
    }

    // Crear el directorio de imágenes si no existe
    if (!fs.existsSync(`./${imagePath}`)) fs.mkdirSync(`./${imagePath}`);

    // Crear el directorio de la carpeta si no existe
    if (!fs.existsSync(`./${imagePath}/${folder}`))
      fs.mkdirSync(`./${imagePath}/${folder}`);

    // Redimensionar la imagen a 200x200 y convertirla a JPEG
    const image = await sharp(file.data).resize(200, 200).toBuffer();

    // Guardar el buffer de la imagen en un archivo
    fs.writeFileSync(`./${imagePath}/${folder}/${fileName}`, image);

    return res.status(200).json({
      error: false,
      message: "Archivo subido correctamente",
      data: `${imagePath}/${folder}/${fileName}`,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Error interno del servidor" });
  }
};
