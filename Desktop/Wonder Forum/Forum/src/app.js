import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";

import sequelize from "./config/db.js";
import userRoutes from "./routes/usersendpoint.js";
import postRoutes from "./routes/post.js";
import categoryRouter from "./routes/category.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 2000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Session setup
app.use(
  session({
    secret: "wonderforumsecret",
    resave: false,
    saveUninitialized: true,
  })
);

// Make user available in all templates
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Routes
app.use("/", userRoutes);
app.use("/", postRoutes);
app.use("/", categoryRouter);

// Dashboard
app.get("/dashboard", (req, res) => {
  if (!req.session.userId) return res.redirect("/login");

  const categories = [
    { name: "Politics", url: "/category/politics" },
    { name: "Sports", url: "/category/sports" },
    { name: "Technology", url: "/category/technology" },
    { name: "Music", url: "/category/music" },
    { name: "Fashion", url: "/category/fashion" },
  ];

  res.render("dashboard", { categories });
});




  // In app.js or a separate script
sequelize
  .sync({ force: true }) // drops tables and recreates them
  .then(() => console.log("Database synced"))
  .catch((err) => console.error(err));

 app.listen(port, () => console.log(`Server running on http://localhost:${port}`))
