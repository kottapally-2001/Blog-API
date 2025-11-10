import { Router } from "express";
import { listPublic, getBySlug, adminList, createPost, updatePost, togglePublish, deletePost } from "../controllers/post.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

// Public
router.get("/", listPublic);
router.get("/:slug", getBySlug);

// Admin
router.get("/admin/all", requireAuth, requireAdmin, adminList);
router.post("/admin", requireAuth, requireAdmin, createPost);
router.put("/admin/:id", requireAuth, requireAdmin, updatePost);
router.patch("/admin/:id/publish", requireAuth, requireAdmin, togglePublish);
router.delete("/admin/:id", requireAuth, requireAdmin, deletePost);

export default router;
