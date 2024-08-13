const authMiddleware = require("../middleware/authmiddleware");
const express = require("express");
const zod = require("zod");
const User = require("../models/User");

const router = express.Router();

// Zod schema for validation during signup
const userSchema = zod.object({
  name: zod.string().min(1, "Name is required"),
  email: zod.string().email("Invalid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters long"),
});


//update own profile info
router.post("/update", authMiddleware, async (req, res) => {
  try {
    const { ...updateData } = req.body;
    const userId = req.user;
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// Bulk User Retrieval with Filtering
router.get("/bulk", authMiddleware, async (req, res) => {
  try {
    const filter = req.query.filter || "";

    const users = await User.find({
      _id: { $ne: req.user },
      name: {
        $regex: filter,
        $options: "i",
      },
    });

    res.json({
      users: users.map((user) => ({
        _id: user._id,
        name: user.name,
        email: user.email,
      })),
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
