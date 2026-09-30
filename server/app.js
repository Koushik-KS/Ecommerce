const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

// =====================================================
// EMAIL SERVICE
// =====================================================

const {
  verifyEmailConnection,
} = require("./services/emailService");

// =====================================================
// ROUTES
// =====================================================

const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const messagesRoutes = require("./routes/messages");
const authRoutes = require("./routes/auth");
const reviewRoutes = require("./routes/reviews");
const notificationRoutes = require("./routes/notifications");
const settingsRoutes = require("./routes/settings");

// =====================================================
// CORS CONFIGURATION
// =====================================================

const allowedOrigins = [
  // Local development URLs
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",

  // Current Vercel Admin frontend
  "https://ecommerce-aoua.vercel.app",

  // Previous Vercel frontend
  "https://ecommerce-koushik-db74.vercel.app",

  // Current Git / Preview deployment
  "https://ecommerce-aoua-git-master-koushik-db74.vercel.app",
];

// =====================================================
// CORS CHECK
// =====================================================

const isAllowedOrigin = (origin) => {
  if (!origin) {
    return true;
  }

  // Exact allowed origins
  if (allowedOrigins.includes(origin)) {
    return true;
  }

  // Allow Vercel deployments belonging to this project
  // Example:
  // ecommerce-aoua.vercel.app
  // ecommerce-aoua-git-master-koushik-db74.vercel.app
  // ecommerce-aoua-xxxxx.vercel.app
  const vercelProjectPattern =
    /^https:\/\/ecommerce-aoua(?:-[a-z0-9-]+)?\.vercel\.app$/i;

  if (vercelProjectPattern.test(origin)) {
    return true;
  }

  return false;
};

// =====================================================
// CORS MIDDLEWARE
// =====================================================

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without Origin
      // Example: Postman or server-side requests
      if (!origin) {
        return callback(null, true);
      }

      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      console.warn(
        `Blocked CORS origin: ${origin}`
      );

      return callback(
        new Error("Not allowed by CORS")
      );
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
    ],
  })
);

// =====================================================
// BODY PARSER MIDDLEWARE
// =====================================================

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    limit: "10mb",
    extended: true,
  })
);

// =====================================================
// CATEGORY ROUTES
// =====================================================

app.use(
  "/api/category",
  categoryRoutes
);

// =====================================================
// PRODUCT ROUTES
// =====================================================

app.use(
  "/api/products",
  productRoutes
);

// =====================================================
// ORDER ROUTES
// =====================================================

app.use(
  "/api/orders",
  orderRoutes
);

// =====================================================
// MESSAGE ROUTES
// =====================================================

app.use(
  "/api/messages",
  messagesRoutes
);

// =====================================================
// AUTHENTICATION ROUTES
// =====================================================

app.use(
  "/api/auth",
  authRoutes
);

// =====================================================
// REVIEW ROUTES
// =====================================================

app.use(
  "/api/reviews",
  reviewRoutes
);

// =====================================================
// NOTIFICATION ROUTES
// =====================================================

app.use(
  "/api/notifications",
  notificationRoutes
);

// =====================================================
// SETTINGS ROUTES
// =====================================================

app.use(
  "/api/settings",
  settingsRoutes
);

// =====================================================
// BASIC API TEST ROUTE
// =====================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "E-commerce API is running successfully.",
  });
});

// =====================================================
// ORDER API TEST ROUTE
// =====================================================

app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-commerce API is running.",
  });
});

// =====================================================
// 404 ROUTE
// =====================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// =====================================================
// ERROR HANDLING MIDDLEWARE
// =====================================================

app.use((err, req, res, next) => {
  console.error(
    "Server error:",
    err.message
  );

  if (
    err.message ===
    "Not allowed by CORS"
  ) {
    return res.status(403).json({
      success: false,
      message:
        "CORS policy blocked this request.",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error.",
    error:
      process.env.NODE_ENV === "production"
        ? undefined
        : err.message,
  });
});

// =====================================================
// DATABASE CONNECTION
// =====================================================

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(async () => {
    console.log(
      "Database connection ready..."
    );

    // Verify Gmail SMTP connection
    try {
      await verifyEmailConnection();

      console.log(
        "Email connection verified..."
      );
    } catch (emailError) {
      console.error(
        "Email connection verification failed:",
        emailError.message
      );

      // Do not stop the API if email verification fails.
      // Database/API can still work.
    }
  })
  .catch((err) => {
    console.error(
      "Database connection error:",
      err.message
    );
  });

// =====================================================
// EXPORT EXPRESS APP
// =====================================================

// Vercel can use this exported Express application
// as a serverless function.

module.exports = app;