import Post from "../models/post.js";
import User from "../models/user.js";

// Show create post page
export const showCreatePost = (req, res) => {
  if (!req.session.userId) return res.redirect("/login");
  const category = req.query.category || "";
  res.render("createPost", { errors: [], category });
};

// Handle post creation
export const createPost = async (req, res) => {
  try {
    if (!req.session.userId) return res.redirect("/login");

    const { title, content, category } = req.body;

    await Post.create({
      title,
      content,
      category,
      UserId: req.session.userId,
    });

    // Redirect to posts page
    res.redirect(`/category/${category}`);
  } catch (err) {
    console.error(err);
    res.render("createPost", { errors: ["Failed to create post"], category: req.body.category });
  }
};

// Show all posts (optional)
export const showPosts = async (req, res) => {
  const posts = await Post.findAll({ include: User, order: [["createdAt", "DESC"]] });
  res.render("posts", { posts });
};
