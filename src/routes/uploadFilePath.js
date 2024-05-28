const { Router } = require("express");
const { uploadImage } = require("../controllers/uploadFiles.js");
const validateToken = require("../middlewares/validateToken.js");

const router = Router();

//? Api path: /upload/

// Subir una imagen
router.post("/image/", validateToken, uploadImage);

module.exports = router;
