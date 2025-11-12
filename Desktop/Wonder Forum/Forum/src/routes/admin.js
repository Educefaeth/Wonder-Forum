import express from "express";
import { ensureAdmin } from "../middleware/auth.js";
import { showAdminDashboard, deleteUser, deletePost } from "../controllers/admincontrol.js";

const router = express.Router();

router.get("/admin/dashboard", ensureAdmin, showAdminDashboard);
router.get("/admin/delete/user/:id", ensureAdmin, deleteUser);
router.get("/admin/delete/post/:id", ensureAdmin, deletePost);

export default router;
