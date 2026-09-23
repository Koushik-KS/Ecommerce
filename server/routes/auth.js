const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

// =========================
// REGISTER USER
// =========================

router.post("/register", async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 6 characters",
      });
    }

    // Convert email to lowercase
    const normalizedEmail = email.trim().toLowerCase();

    // Check whether user already exists
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name: name.trim(),
      phone: phone.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    // Send response without password
    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
});

// =========================
// LOGIN USER
// =========================

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Convert email to lowercase
    const normalizedEmail = email.trim().toLowerCase();

    // Find user
    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare entered password with encrypted password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check JWT secret
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in .env");

      return res.status(500).json({
        success: false,
        message: "Authentication configuration error",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Send login response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
});

module.exports = router;