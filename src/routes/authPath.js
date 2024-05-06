import { Router } from "express";

import { login } from "../controllers/auth.js";

const router = Router();

//? Api path: /auth/

// Login
router.get("/login", login);

export default router;
