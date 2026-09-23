
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());

app.options("*", cors());

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
// ROUTES
// =====================================================

const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const messagesRoutes = require("./routes/messages");

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
  .then(() => {
    console.log(
      "Database connection ready..."
    );

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log(
        `Server is running at http://localhost:${PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(
      "Database connection error:",
      err
    );
  });