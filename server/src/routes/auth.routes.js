import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
const router = Router();

router.post("/register", requireAuth, requireAdmin, register); // only admins can create users
router.post("/login", login);

export default router;
