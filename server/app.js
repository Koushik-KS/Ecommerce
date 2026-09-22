
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

// Middleware
app.use(cors());
app.options("*", cors());

// Increase JSON request size for Base64 images
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Routes
const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

// Existing routes
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);

// Order routes
app.use("/api/orders", orderRoutes);

// Database connection
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Database connection ready...");

    app.listen(process.env.PORT || 4000, () => {
      console.log(
        `server is running http://localhost:${
          process.env.PORT || 4000
        }`
      );
    });
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });