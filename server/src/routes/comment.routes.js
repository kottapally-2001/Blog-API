import { Router } from "express";
import { createComment, deleteComment } from "../controllers/comment.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

// public can create comments on published posts
router.post("/:slug", createComment);

// admin can delete comments
router.delete("/admin/:id", requireAuth, requireAdmin, deleteComment);

export default router;
