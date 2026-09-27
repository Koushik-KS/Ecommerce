import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import { FaCloudUploadAlt } from "react-icons/fa";

// =====================================================
// BACKEND API URL
// =====================================================

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://ecommerce-hsm4.onrender.com";

// =====================================================
// CATEGORY COMPONENT
// =====================================================

const Category = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ===================================================
  // CONVERT IMAGE TO BASE64
  // ===================================================

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // ===================================================
  // SELECT IMAGE
  // ===================================================

  const handleImageChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }

    // Optional image size validation
    const maxSize = 5 * 1024 * 1024;

    if (selectedFile.size > maxSize) {
      setError("Image size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    try {
      const base64Image =
        await convertImageToBase64(selectedFile);

      setImage(base64Image);
      setError("");
    } catch (error) {
      console.error(
        "Image conversion error:",
        error
      );

      setError(
        "Unable to process the image."
      );
    }
  };

  // ===================================================
  // CREATE CATEGORY
  // ===================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    // Validate category name
    if (!name.trim()) {
      setError(
        "Please enter a category name."
      );
      return;
    }

    // Validate image
    if (!image) {
      setError(
        "Please select a category image."
      );
      return;
    }

    try {
      setLoading(true);

      // =================================================
      // CATEGORY DATA
      // =================================================

      const categoryData = {
        name: name.trim(),
        color: color,
        images: [image],
      };

      console.log(
        "Creating category:",
        categoryData
      );

      // =================================================
      // API REQUEST
      // =================================================

      const response = await fetch(
        `${API_URL}/api/category/create`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            categoryData
          ),
        }
      );

      // =================================================
      // READ RESPONSE
      // =================================================

      const data = await response.json();

      console.log(
        "Category API response:",
        data
      );

      // =================================================
      // HANDLE ERROR
      // =================================================

      if (!response.ok) {
        throw new Error(
          typeof data === "string"
            ? data
            : data.message ||
                "Category creation failed."
        );
      }

      // =================================================
      // SUCCESS
      // =================================================

      setMessage(
        "Category created successfully!"
      );

      // Reset form
      setName("");
      setColor("#000000");
      setImage(null);

      // =================================================
      // NAVIGATE
      // =================================================

      setTimeout(() => {
        navigate("/product/upload");
      }, 1000);

    } catch (error) {
      console.error(
        "Category creation error:",
        error
      );

      setError(
        error.message ||
          "Unable to create category."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===================================================
  // UI
  // ===================================================

  return (
    <div className="right-content w-100">

      <div className="card shadow border-0 p-4 mt-4">

        {/* =================================================
            TITLE
        ================================================= */}

        <h3 className="hd">
          Create Category
        </h3>

        {/* =================================================
            SUCCESS MESSAGE
        ================================================= */}

        {message && (
          <div className="alert alert-success mt-3">
            {message}
          </div>
        )}

        {/* =================================================
            ERROR MESSAGE
        ================================================= */}

        {error && (
          <div className="alert alert-danger mt-3">
            {error}
          </div>
        )}

        {/* =================================================
            FORM
        ================================================= */}

        <form onSubmit={handleSubmit}>

          {/* =================================================
              CATEGORY NAME
          ================================================= */}

          <div className="form-group mt-3">

            <h6>
              CATEGORY NAME
            </h6>

            <input
              type="text"
              className="form-control"
              placeholder="Enter category name"
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value
                )
              }
              disabled={loading}
            />

          </div>

          {/* =================================================
              CATEGORY COLOR
          ================================================= */}

          <div className="form-group mt-3">

            <h6>
              CATEGORY COLOR
            </h6>

            <input
              type="color"
              className="form-control form-control-color"
              value={color}
              onChange={(event) =>
                setColor(
                  event.target.value
                )
              }
              title="Choose category color"
              disabled={loading}
            />

          </div>

          {/* =================================================
              CATEGORY IMAGE
          ================================================= */}

          <div className="form-group mt-3">

            <h6>
              CATEGORY IMAGE
            </h6>

            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={
                handleImageChange
              }
              disabled={loading}
            />

            <small className="text-muted">
              Select one category image.
              Maximum size: 5 MB.
            </small>

          </div>

          {/* =================================================
              IMAGE PREVIEW
          ================================================= */}

          {image && (
            <div className="mt-3">

              <h6>
                IMAGE PREVIEW
              </h6>

              <img
                src={image}
                alt="Category preview"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border:
                    "1px solid #ddd",
                }}
              />

            </div>
          )}

          {/* =================================================
              SUBMIT BUTTON
          ================================================= */}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="mt-4"
            disabled={loading}
          >

            <FaCloudUploadAlt />

            &nbsp;

            {loading
              ? "CREATING..."
              : "CREATE CATEGORY"}

          </Button>

        </form>

      </div>

    </div>
  );
};

export default Category;