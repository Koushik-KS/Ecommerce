
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Chip from "@mui/material/Chip";

import { styled, emphasize } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

import { FaCloudUploadAlt } from "react-icons/fa";

const API_URL = "http://localhost:4000/api";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];

  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,

    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },

    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const ProductUpload = () => {
  const navigate = useNavigate();

  // =========================
  // FORM STATES
  // =========================
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [categoryVal, setCategoryVal] = useState("");
  const [brand, setBrand] = useState("");

  const [price, setPrice] = useState("");
  const [regularPrice, setRegularPrice] = useState("");

  const [ratingsValue, setRatingsValue] = useState(1);
  const [countInStock, setCountInStock] = useState("");

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================
  // FETCH CATEGORIES
  // =========================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);

        const response = await fetch(`${API_URL}/category`);

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();

        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Category fetch error:", error);
        setError("Unable to load categories.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // =========================
  // IMAGE TO BASE64
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
  // IMAGE SELECT
  // =========================
  const handleImageChange = async (event) => {
    const selectedFiles = Array.from(event.target.files);

    if (selectedFiles.length === 0) {
      return;
    }

    try {
      setError("");

      if (selectedFiles.length > 5) {
        setError("Please select a maximum of 5 images.");
        return;
      }

      const base64Images = await Promise.all(
        selectedFiles.map((file) => convertImageToBase64(file))
      );

      setImages(base64Images);
    } catch (error) {
      console.error("Image conversion error:", error);
      setError("Unable to process images.");
    }
  };

  // =========================
  // SUBMIT PRODUCT
  // =========================
  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    // Basic validation
    if (!name.trim()) {
      setError("Please enter a product name.");
      return;
    }

    if (!description.trim()) {
      setError("Please enter a product description.");
      return;
    }

    if (!categoryVal) {
      setError("Please select a category.");
      return;
    }

    if (!brand.trim()) {
      setError("Please enter a brand.");
      return;
    }

    if (!price || Number(price) <= 0) {
      setError("Please enter a valid product price.");
      return;
    }

    if (!countInStock || Number(countInStock) < 0) {
      setError("Please enter a valid stock quantity.");
      return;
    }

    if (images.length === 0) {
      setError("Please select at least one product image.");
      return;
    }

    try {
      setSubmitting(true);

      const productData = {
        name: name.trim(),
        description: description.trim(),
        images: images,
        brand: brand.trim(),
        price: Number(price),
        category: categoryVal,
        countInStock: Number(countInStock),
        rating: Number(ratingsValue || 0),
        numReviews: 0,
        isFeatured: false,
      };

      const response = await fetch(`${API_URL}/products/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data === "string"
            ? data
            : data.message || "Product upload failed."
        );
      }

      setMessage("Product uploaded successfully!");

      // Clear form
      setName("");
      setDescription("");
      setCategoryVal("");
      setBrand("");
      setPrice("");
      setRegularPrice("");
      setRatingsValue(1);
      setCountInStock("");
      setImages([]);

      // Navigate to product list after successful upload
      setTimeout(() => {
        navigate("/products");
      }, 1000);
    } catch (error) {
      console.error("Product upload error:", error);
      setError(error.message || "Unable to upload product.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="right-content w-100">
      {/* HEADER */}
      <div className="card shadow border-0 w-100 flex-row p-4">
        <h5 className="title">Product Upload</h5>

        <Breadcrumbs
          aria-label="breadcrumb"
          className="ml-auto breadcrumb-wrapper"
        >
          <StyledBreadcrumb
            component="a"
            href="#"
            label="Dashboard"
            icon={<HomeIcon fontSize="small" />}
          />

          <StyledBreadcrumb
            component="a"
            label="Products"
            href="#"
            deleteIcon={<ExpandMoreIcon />}
          />

          <StyledBreadcrumb
            label="Product Upload"
            href="#"
            deleteIcon={<ExpandMoreIcon />}
          />
        </Breadcrumbs>
      </div>

      {/* FORM */}
      <form className="form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-9">
            <div className="card p-4">
              <h5 className="mb-4">Basic Information</h5>

              {/* SUCCESS MESSAGE */}
              {message && (
                <div className="alert alert-success">
                  {message}
                </div>
              )}

              {/* ERROR MESSAGE */}
              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              {/* PRODUCT NAME */}
              <div className="form-group">
                <h6>TITLE</h6>

                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter product name"
                />
              </div>

              {/* DESCRIPTION */}
              <div className="form-group">
                <h6>DESCRIPTION</h6>

                <textarea
                  rows={5}
                  className="form-control"
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Enter product description"
                />
              </div>

              {/* CATEGORY AND BRAND */}
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6>CATEGORY</h6>

                    <Select
                      value={categoryVal}
                      onChange={(event) =>
                        setCategoryVal(event.target.value)
                      }
                      displayEmpty
                      className="w-100"
                    >
                      <MenuItem value="">
                        <em>
                          {loadingCategories
                            ? "Loading categories..."
                            : "Select Category"}
                        </em>
                      </MenuItem>

                      {categories.map((category) => (
                        <MenuItem
                          key={category._id}
                          value={category._id}
                        >
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <h6>BRAND</h6>

                    <input
                      type="text"
                      className="form-control"
                      value={brand}
                      onChange={(event) =>
                        setBrand(event.target.value)
                      }
                      placeholder="Enter brand name"
                    />
                  </div>
                </div>
              </div>

              {/* PRICE */}
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6>REGULAR PRICE</h6>

                    <input
                      type="number"
                      className="form-control"
                      value={regularPrice}
                      onChange={(event) =>
                        setRegularPrice(event.target.value)
                      }
                      placeholder="Enter regular price"
                      min="0"
                    />
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <h6>SELLING PRICE</h6>

                    <input
                      type="number"
                      className="form-control"
                      value={price}
                      onChange={(event) =>
                        setPrice(event.target.value)
                      }
                      placeholder="Enter selling price"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* RATING AND STOCK */}
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6>RATING</h6>

                    <Rating
                      name="product-rating"
                      value={ratingsValue}
                      onChange={(event, newValue) => {
                        setRatingsValue(newValue || 0);
                      }}
                    />
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <h6>PRODUCT STOCK</h6>

                    <input
                      type="number"
                      className="form-control"
                      value={countInStock}
                      onChange={(event) =>
                        setCountInStock(event.target.value)
                      }
                      placeholder="Enter stock quantity"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* IMAGE UPLOAD */}
              <div className="form-group mt-3">
                <h6>PRODUCT IMAGES</h6>

                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />

                <small className="text-muted">
                  Select up to 5 images.
                </small>

                {images.length > 0 && (
                  <p className="mt-2 text-success">
                    {images.length} image(s) selected.
                  </p>
                )}
              </div>

              {/* SUBMIT */}
              <Button
                type="submit"
                className="btn-blue btn-lg btn-big mt-3"
                disabled={submitting}
              >
                <FaCloudUploadAlt />

                &nbsp;

                {submitting
                  ? "UPLOADING..."
                  : "PUBLISH AND VIEW"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductUpload;