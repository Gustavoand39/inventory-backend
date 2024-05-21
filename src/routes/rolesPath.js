const { Router } = require("express");
const {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} = require("../controllers/roles.js");
const validateToken = require("../middlewares/validateToken.js");

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

module.exports = router;
