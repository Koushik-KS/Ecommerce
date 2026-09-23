const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check Authorization header
    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      console.log("Authorization header missing");

      return res.status(401).json({
        success: false,
        message:
          "Authentication required. Please log in.",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      console.log("JWT token is missing");

      return res.status(401).json({
        success: false,
        message: "JWT token is missing.",
      });
    }

    // Check JWT secret
    if (!process.env.JWT_SECRET) {
      console.log("JWT_SECRET is not configured");

      return res.status(500).json({
        success: false,
        message:
          "JWT secret is not configured.",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Save decoded user data
    req.user = decoded;

    // Debug logs
    console.log(
      "Decoded user:",
      req.user
    );

    next();
  } catch (error) {
    console.error(
      "Authentication error:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired token.",
    });
  }
};

module.exports = authMiddleware;