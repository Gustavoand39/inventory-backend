const { Router } = require("express");

const { login, refreshToken } = require("../controllers/auth.js");

const router = Router();

//? Api path: /auth/

// Login
router.post("/login", login);

// Refrescar token
router.post("/refresh", refreshToken);

module.exports = router;
