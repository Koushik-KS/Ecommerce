
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import { FaCloudUploadAlt } from "react-icons/fa";

const API_URL = "http://localhost:4000/api/category";

const Category = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================
  // CONVERT IMAGE TO BASE64
  // =========================
  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    });
  };

  // =========================
  // SELECT IMAGE
  // =========================
  const handleImageChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }

    try {
      const base64Image = await convertImageToBase64(selectedFile);
      setImage(base64Image);
      setError("");
    } catch (error) {
      console.error("Image conversion error:", error);
      setError("Unable to process the image.");
    }
  };

  // =========================
  // CREATE CATEGORY
  // =========================
  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!name.trim()) {
      setError("Please enter a category name.");
      return;
    }

    if (!image) {
      setError("Please select a category image.");
      return;
    }

    try {
      setLoading(true);

      const categoryData = {
        name: name.trim(),
        color: color,
        images: [image],
      };

      const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data === "string"
            ? data
            : data.message || "Category creation failed."
        );
      }

      setMessage("Category created successfully!");

      setName("");
      setColor("#000000");
      setImage(null);

      // Navigate to Product Upload
      setTimeout(() => {
        navigate("/product/upload");
      }, 1000);
    } catch (error) {
      console.error("Category creation error:", error);
      setError(error.message || "Unable to create category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 p-4 mt-4">
        <h3 className="hd">Create Category</h3>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="alert alert-success mt-3">
            {message}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="alert alert-danger mt-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* CATEGORY NAME */}
          <div className="form-group mt-3">
            <h6>CATEGORY NAME</h6>

            <input
              type="text"
              className="form-control"
              placeholder="Enter category name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          {/* CATEGORY COLOR */}
          <div className="form-group mt-3">
            <h6>CATEGORY COLOR</h6>

            <input
              type="color"
              className="form-control form-control-color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
              title="Choose category color"
            />
          </div>

          {/* CATEGORY IMAGE */}
          <div className="form-group mt-3">
            <h6>CATEGORY IMAGE</h6>

            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />

            <small className="text-muted">
              Select one category image.
            </small>
          </div>

          {/* IMAGE PREVIEW */}
          {image && (
            <div className="mt-3">
              <img
                src={image}
                alt="Category preview"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="mt-4"
            disabled={loading}
          >
            <FaCloudUploadAlt />

            &nbsp;

            {loading ? "CREATING..." : "CREATE CATEGORY"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Category;