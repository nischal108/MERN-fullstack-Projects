const express = require("express");
const zod = require("zod");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../controllers/generateToken");
const Account = require("../models/Account");

const router = express.Router();

// Zod schema for validation during signup
const userSchema = zod.object({
  name: zod.string().min(1, "Name is required"),
  email: zod.string().email("Invalid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters long"),
});

// Zod schema for validation during signin
const signinSchema = zod.object({
  email: zod.string().email("Invalid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters long"),
});

// Signup route
router.post("/signup", async (req, res) => {
  console.log(req.body);
  
  try {
    const { success, error } = userSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.issues, // Returns detailed error messages
      });
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already taken",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    await Account.create({
      userID: createdUser._id,
      balance: 1 + Math.random() * 1000,
    });

    const token = generateToken(createdUser._id);
    res.status(201).json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    console.error("Error during user signup:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// Signin route
router.post("/signin", async (req, res) => {
  try {
    const { success, error } = signinSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.issues,
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    res.json({
      message: "Signed in successfully",
      token: token,
    });
  } catch (error) {
    console.error("Error during user signin:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
