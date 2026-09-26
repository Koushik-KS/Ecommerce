const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const {
  sendPasswordResetOTPEmail,
} = require("../services/emailService");

const router = express.Router();

// =====================================================
// REGISTER USER
// =====================================================

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      password,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !phone ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate password
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 6 characters",
      });
    }

    // Normalize email
    const normalizedEmail =
      email.trim().toLowerCase();

    // Check existing user
    const existingUser =
      await User.findOne({
        email: normalizedEmail,
      });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "Email is already registered",
      });
    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // Create user
    const user = await User.create({
      name: name.trim(),

      phone: phone.trim(),

      email: normalizedEmail,

      password: hashedPassword,
    });

    // Response
    res.status(201).json({
      success: true,

      message:
        "Registration successful",

      user: {
        id: user._id,

        name: user.name,

        phone: user.phone,

        email: user.email,
      },
    });
  } catch (error) {
    console.error(
      "Registration error:",
      error
    );

    res.status(500).json({
      success: false,

      message:
        "Server error during registration",
    });
  }
});

// =====================================================
// LOGIN USER
// =====================================================

router.post("/login", async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(400).json({
        success: false,

        message:
          "Email and password are required",
      });
    }

    // Normalize email
    const normalizedEmail =
      email.trim().toLowerCase();

    // Find user
    const user =
      await User.findOne({
        email: normalizedEmail,
      });

    if (!user) {
      return res.status(401).json({
        success: false,

        message:
          "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,

        message:
          "Invalid email or password",
      });
    }

    // Check JWT secret
    if (!process.env.JWT_SECRET) {
      console.error(
        "JWT_SECRET is missing in .env"
      );

      return res.status(500).json({
        success: false,

        message:
          "Authentication configuration error",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );

    // Response
    res.status(200).json({
      success: true,

      message:
        "Login successful",

      token,

      user: {
        id: user._id,

        name: user.name,

        phone: user.phone,

        email: user.email,
      },
    });
  } catch (error) {
    console.error(
      "Login error:",
      error
    );

    res.status(500).json({
      success: false,

      message:
        "Server error during login",
    });
  }
});

// =====================================================
// FORGOT PASSWORD - SEND OTP
// =====================================================

router.post(
  "/forgot-password",
  async (req, res) => {
    try {
      const { email } = req.body;

      // Validate email
      if (!email) {
        return res.status(400).json({
          success: false,

          message:
            "Email address is required",
        });
      }

      // Normalize email
      const normalizedEmail =
        email.trim().toLowerCase();

      // Find user
      const user =
        await User.findOne({
          email: normalizedEmail,
        });

      if (!user) {
        return res.status(404).json({
          success: false,

          message:
            "No account found with this email address",
        });
      }

      // =================================================
      // GENERATE 6-DIGIT OTP
      // =================================================

      const otp = Math.floor(
        100000 +
          Math.random() * 900000
      ).toString();

      // =================================================
      // OTP VALID FOR 10 MINUTES
      // =================================================

      const otpExpires = new Date(
        Date.now() +
          10 * 60 * 1000
      );

      // Save OTP
      user.resetPasswordOTP = otp;

      user.resetPasswordOTPExpires =
        otpExpires;

      await user.save();

      // =================================================
      // SEND OTP EMAIL
      // =================================================

      await sendPasswordResetOTPEmail({
        customerName: user.name,

        customerEmail: user.email,

        otp,
      });

      // =================================================
      // RESPONSE
      // =================================================

      res.status(200).json({
        success: true,

        message:
          "Password reset OTP has been sent to your email",
      });
    } catch (error) {
      console.error(
        "Forgot password error:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          "Unable to send password reset OTP",
      });
    }
  }
);

// =====================================================
// RESET PASSWORD - VERIFY OTP
// =====================================================

router.post(
  "/reset-password",
  async (req, res) => {
    try {
      const {
        email,
        otp,
        newPassword,
      } = req.body;

      // =================================================
      // VALIDATE REQUIRED FIELDS
      // =================================================

      if (
        !email ||
        !otp ||
        !newPassword
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Email, OTP and new password are required",
        });
      }

      // =================================================
      // PASSWORD LENGTH
      // =================================================

      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,

          message:
            "New password must contain at least 6 characters",
        });
      }

      // =================================================
      // NORMALIZE EMAIL
      // =================================================

      const normalizedEmail =
        email.trim().toLowerCase();

      // =================================================
      // FIND USER
      // =================================================

      const user =
        await User.findOne({
          email: normalizedEmail,
        });

      if (!user) {
        return res.status(404).json({
          success: false,

          message:
            "User account not found",
        });
      }

      // =================================================
      // CHECK RESET REQUEST
      // =================================================

      if (
        !user.resetPasswordOTP ||
        !user.resetPasswordOTPExpires
      ) {
        return res.status(400).json({
          success: false,

          message:
            "No password reset request found. Please request a new OTP.",
        });
      }

      // =================================================
      // CHECK OTP EXPIRY
      // =================================================

      if (
        new Date() >
        user.resetPasswordOTPExpires
      ) {
        user.resetPasswordOTP = null;

        user.resetPasswordOTPExpires =
          null;

        await user.save();

        return res.status(400).json({
          success: false,

          message:
            "OTP has expired. Please request a new OTP.",
        });
      }

      // =================================================
      // CHECK OTP
      // =================================================

      if (
        String(user.resetPasswordOTP) !==
        String(otp).trim()
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Invalid OTP",
        });
      }

      // =================================================
      // HASH NEW PASSWORD
      // =================================================

      const hashedPassword =
        await bcrypt.hash(
          newPassword,
          10
        );

      user.password =
        hashedPassword;

      // =================================================
      // CLEAR OTP
      // =================================================

      user.resetPasswordOTP = null;

      user.resetPasswordOTPExpires =
        null;

      await user.save();

      // =================================================
      // SUCCESS RESPONSE
      // =================================================

      res.status(200).json({
        success: true,

        message:
          "Password reset successful. You can now sign in.",
      });
    } catch (error) {
      console.error(
        "Reset password error:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          "Unable to reset password",
      });
    }
  }
);

// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;