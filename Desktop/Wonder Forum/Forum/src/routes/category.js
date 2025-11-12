import express from "express";
import Post from "../models/post.js";

const router = express.Router();

// Show posts for a category
router.get("/category/:name", async (req, res) => {
  const categoryName = req.params.name.toLowerCase();
  const validCategories = ["technology", "sports", "music", "fashion", "politics"];

  if (!validCategories.includes(categoryName)) {
    return res.status(404).send("Category not found");
  }

  const posts = await Post.findAll({
    where: { category: categoryName },
    order: [["createdAt", "DESC"]],
  });

  res.render("category/category", {
    categoryName,
    posts,
    user: req.session.user || null,
  });
});

export default router;
