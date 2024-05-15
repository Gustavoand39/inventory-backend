import { Router } from "express";
import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/roles.js";
import validateToken from "../middlewares/validateToken.js";

const router = Router();

//? Api path: /roles/

// Obtener todos los roles
router.get("/", validateToken, getRoles);

// Obtener un rol por id
router.get("/:id", validateToken, getRoleById);

// Crear un rol
router.post("/", validateToken, createRole);

// Actualizar un rol
router.put("/:id", validateToken, updateRole);

// Eliminar un rol
router.delete("/:id", validateToken, deleteRole);

export default router;
