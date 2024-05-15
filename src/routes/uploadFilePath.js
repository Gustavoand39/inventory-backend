import { Router } from "express";
import { uploadImage } from "../controllers/uploadFiles.js";
import validateToken from "../middlewares/validateToken.js";

const router = Router();

//? Api path: /upload/

// Subir una imagen
router.post("/", validateToken, uploadImage);

export default router;
