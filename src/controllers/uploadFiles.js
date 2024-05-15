const filePath = "images";

export const uploadImage = async (req, res) => {
  try {
    const file = req.files.file;
    const fileName = file.name;

    // Verificar si el archivo es una imagen
    if (!fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
      return res
        .status(400)
        .json({ error: true, message: "El archivo no es una imagen" });
    }

    // Crear el directorio de imágenes si no existe
    if (!fs.existsSync("./images")) fs.mkdirSync("./images");

    // Redimensionar la imagen a 200x200 y convertirla a JPEG
    const image = await sharp(file.data)
      .resize(200, 200)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toBuffer();

    // Guardar el buffer de la imagen en un archivo
    fs.writeFileSync(`.${filePath}/${fileName}`, image);

    return res.status(200).json({
      error: false,
      message: "Archivo subido correctamente",
      data: `${filePath}/${fileName}`,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Error interno del servidor" });
  }
};
