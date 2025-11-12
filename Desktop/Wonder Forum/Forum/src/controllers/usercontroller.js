import User from "../models/user.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

// Show register
export const showRegister = (req, res) => res.render("register", { errors: [] });

// Register user
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check duplicates
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) return res.render("register", { errors: ["Username already exists"] });

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) return res.render("register", { errors: ["Email already exists"] });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      verificationToken,
    });

    const verifyURL = `http://localhost:2000/verify/${verificationToken}`;
    console.log("🔗 Verification link (paste in browser):", verifyURL);

    res.render("login", { errors: ["Account created! Check console for verification link"] });
  } catch (error) {
    console.error(error);
    res.render("register", { errors: ["Registration failed"] });
  }
};

// Verify email
export const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ where: { verificationToken: token } });
    if (!user) return res.render("login", { errors: ["Invalid verification link"] });

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.render("login", { errors: ["Email verified! You can login now."] });
  } catch (error) {
    console.error(error);
    res.render("login", { errors: ["Verification failed"] });
  }
};

// Show login
export const showLogin = (req, res) => res.render("login", { errors: [] });

// Login user
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.render("login", { errors: ["Invalid username/password"] });
    if (!user.isVerified) return res.render("login", { errors: ["Verify email first"] });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.render("login", { errors: ["Invalid username/password"] });

    req.session.userId = user.id;
    req.session.user = user;
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.render("login", { errors: ["Login failed"] });
  }
};

// Logout
export const logoutUser = (req, res) => {
  req.session.destroy(() => res.redirect("/login"));
};
