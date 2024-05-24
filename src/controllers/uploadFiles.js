const fs = require("fs");
const sharp = require("sharp");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const imagePath = path.join(__dirname, "../../public/uploads");

const uploadImage = async (req, res) => {
  try {
    let { folder = "uploads" } = req.body;
    const file = req.files.image;
    const fileName = file.name;

    // Verificar si el archivo es una imagen
    if (!fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
      return res
        .status(400)
        .json({ error: true, message: "El archivo no es una imagen" });
    }

    // Normalizar el nombre del directorio
    folder = folder
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    // Crear el directorio de imágenes si no existe
    const folderPath = path.join(imagePath, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Generar un nombre de archivo único usando UUID
    const uniqueFileName = `${uuidv4()}-${fileName}`;

    // Redimensionar la imagen a 200x200 y convertirla a JPEG
    const image = await sharp(file.data).resize(200, 200).toBuffer();

    // Guardar el buffer de la imagen en un archivo
    const filePath = path.join(folderPath, uniqueFileName);
    fs.writeFileSync(filePath, image);

    return res.status(200).json({
      error: false,
      message: "Archivo subido correctamente",
      data: `uploads/${folder}/${uniqueFileName}`,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Error interno del servidor" });
  }
};

module.exports = { uploadImage };
