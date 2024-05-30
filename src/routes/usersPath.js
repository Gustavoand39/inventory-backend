const { Router } = require("express");

const {
  getListUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUser,
} = require("../controllers/users.js");

const validateToken = require("../middlewares/validateToken.js");
const { validateUser } = require("../middlewares/userValidate.js");
const { validateID } = require("../middlewares/validateID.js");

const router = Router();

//? Api path: /users/

// Buscar usuarios
router.get("/search", [validateToken], searchUser);

// Obtener un usuario por id
router.get("/:id", [validateToken, validateID], getUserById);

// Obtener todos los usuarios
router.get("/", [validateToken], getListUsers);

// Crear un usuario
router.post("/", [validateToken, validateUser], createUser);

// Actualizar un usuario
router.put("/:id", [validateToken, validateUser], updateUser);

// Eliminar un usuario
router.delete("/:id", [validateToken, validateID], deleteUser);

module.exports = router;
