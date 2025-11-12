export const ensureAuthenticated = (req, res, next) => {
  if (!req.session.userId) return res.redirect("/login");
  next();
};

export const ensureAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.status(403).send("Access denied: Admins only.");
  }
  next();
};
