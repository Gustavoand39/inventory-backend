import { Router } from "express";

import { login, refreshToken } from "../controllers/auth.js";

const router = Router();

//? Api path: /auth/

// Login
router.post("/login", login);

// Refrescar token
router.post("/refresh", refreshToken);

export default router;
