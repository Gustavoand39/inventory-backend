const { Router } = require("express");

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.js");

const validateToken = require("../middlewares/validateToken.js");

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

module.exports = router;
