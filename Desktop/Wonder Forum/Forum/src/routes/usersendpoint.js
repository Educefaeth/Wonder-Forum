import { Router } from "express";
import { body, validationResult } from "express-validator";
import {
  verifyEmail,
  showRegister,
  registerUser,
  showLogin,
  loginUser,
  logoutUser,
} from "../controllers/userController.js";

const router = Router();

// Homepage
router.get("/", (req, res) => res.render("homepage"));

// Registration
router.get("/register", showRegister);
router.post("/register", registerUser);

// Email verification
router.get("/verify/:token", verifyEmail);

// Login
router.get("/login", showLogin);
router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username required"),
    body("password").notEmpty().withMessage("Password required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.render("login", { errors: errors.array().map((e) => e.msg) });
    next();
  },
  loginUser
);

// Logout
router.get("/logout", logoutUser);

export default router;
