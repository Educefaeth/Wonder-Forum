import { Router } from "express";
import { showCreatePost, createPost, showPosts } from "../controllers/controlpost.js";

const router = Router();

router.get("/create-post", showCreatePost);
router.post("/create-post", createPost);

router.get("/posts", showPosts);

export default router;
