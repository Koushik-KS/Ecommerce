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

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Increase JSON request size for Base64 images
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
// BASIC API TEST ROUTE
// =====================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-commerce API is running successfully.",
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
    await verifyEmailConnection();

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log(
        `Server is running at http://localhost:${PORT}`
      );
    });
  })
  .catch((err) => {
    console.error(
      "Database connection error:",
      err.message
    );

    process.exit(1);
  });