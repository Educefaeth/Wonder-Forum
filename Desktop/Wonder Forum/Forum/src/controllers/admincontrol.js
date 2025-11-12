import User from "../models/user.js";
import Post from "../models/post.js";

export const showAdminDashboard = async (req, res) => {
  const users = await User.findAll();
  const posts = await Post.findAll({ include: [{ model: User, attributes: ["username"] }] });
  res.render("adminDashboard", { users, posts });
};

export const deleteUser = async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.redirect("/admin/dashboard");
};

export const deletePost = async (req, res) => {
  await Post.destroy({ where: { id: req.params.id } });
  res.redirect("/admin/dashboard");
};
