import { Router } from "express";

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";

import validateToken from "../middlewares/validateToken.js";

const router = Router();

//? Api path: /users/

// Obtener todos los usuarios
router.get("/", validateToken, getUsers);

// Obtener un usuario por id
router.get("/:id", validateToken, getUserById);

// Crear un usuario
router.post("/", validateToken, createUser);

// Actualizar un usuario
router.put("/:id", validateToken, updateUser);

// Eliminar un usuario
router.delete("/:id", validateToken, deleteUser);

export default router;
