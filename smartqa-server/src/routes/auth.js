const express = require("express");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hash });
    res.json(newUser);
  }
);

// Login
router.post("/login",
  body("email").isEmail(),
  body("password").exists(),
  passport.authenticate("local"),
  (req, res) => res.json({ user: req.user })
);

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", {
  failureRedirect: "/login",
}), (req, res) => res.redirect("/dashboard"));

module.exports = router;
