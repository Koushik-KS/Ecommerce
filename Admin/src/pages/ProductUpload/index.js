
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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

// =====================================================
// API URL
// =====================================================

const API_URL = "http://localhost:4000/api";

// =====================================================
// STYLED BREADCRUMB
// =====================================================

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

// =====================================================
// PRODUCT UPLOAD / EDIT COMPONENT
// =====================================================

const ProductUpload = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  // Product ID exists only in edit mode
  const editProductId = searchParams.get("edit");

  const isEditMode = Boolean(editProductId);

  // =====================================================
  // FORM STATES
  // =====================================================

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [categoryVal, setCategoryVal] = useState("");
  const [brand, setBrand] = useState("");

  const [regularPrice, setRegularPrice] = useState("");
  const [price, setPrice] = useState("");

  const [ratingsValue, setRatingsValue] = useState(1);
  const [countInStock, setCountInStock] = useState("");

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  const [loadingCategories, setLoadingCategories] =
    useState(true);

  const [loadingProduct, setLoadingProduct] =
    useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =====================================================
  // FETCH CATEGORIES
  // =====================================================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);

        const response = await fetch(
          `${API_URL}/category`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch categories"
          );
        }

        const data = await response.json();

        setCategories(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        console.error(
          "Category fetch error:",
          error
        );

        setError("Unable to load categories.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // =====================================================
  // FETCH PRODUCT FOR EDITING
  // =====================================================

  useEffect(() => {
    const fetchProductForEdit = async () => {
      // Do not fetch a product in add mode
      if (!editProductId) {
        return;
      }

      try {
        setLoadingProduct(true);
        setError("");

        const response = await fetch(
          `${API_URL}/products/${editProductId}`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch product details"
          );
        }

        const data = await response.json();

        // Support APIs that return the product
        // directly or inside a product property
        const product = data.product || data;

        if (!product || !product._id) {
          throw new Error(
            "Invalid product data received"
          );
        }

        // Fill form fields
        setName(product.name || "");

        setDescription(
          product.description || ""
        );

        setBrand(product.brand || "");

        setRegularPrice(
          product.regularPrice ?? ""
        );

        setPrice(product.price ?? "");

        setCountInStock(
          product.countInStock ?? ""
        );

        setRatingsValue(
          Number(product.rating ?? 0)
        );

        // Handle category object or category ID
        const categoryId =
          typeof product.category === "object"
            ? product.category?._id
            : product.category;

        setCategoryVal(categoryId || "");

        // Load existing images
        setImages(
          Array.isArray(product.images)
            ? product.images.filter(Boolean)
            : []
        );
      } catch (error) {
        console.error(
          "Fetch product for edit error:",
          error
        );

        setError(
          error.message ||
            "Unable to load product details."
        );
      } finally {
        setLoadingProduct(false);
      }
    };

    fetchProductForEdit();
  }, [editProductId]);

  // =====================================================
  // CONVERT IMAGE TO BASE64
  // =====================================================

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

  // =====================================================
  // SELECT PRODUCT IMAGES
  // =====================================================

  const handleImageChange = async (event) => {
    const selectedFiles = Array.from(
      event.target.files || []
    );

    if (selectedFiles.length === 0) {
      return;
    }

    setMessage("");
    setError("");

    // Maximum 5 total images
    if (images.length + selectedFiles.length > 5) {
      setError(
        `You can upload a maximum of 5 images. ` +
          `You already have ${images.length} image(s).`
      );

      event.target.value = "";
      return;
    }

    // Validate file type
    const invalidFile = selectedFiles.find(
      (file) => !file.type.startsWith("image/")
    );

    if (invalidFile) {
      setError(
        "Please select only image files."
      );

      event.target.value = "";
      return;
    }

    // Validate file size
    const maxFileSize = 5 * 1024 * 1024;

    const largeFile = selectedFiles.find(
      (file) => file.size > maxFileSize
    );

    if (largeFile) {
      setError(
        `${largeFile.name} must be smaller than 5 MB.`
      );

      event.target.value = "";
      return;
    }

    try {
      const base64Images = await Promise.all(
        selectedFiles.map((file) =>
          convertImageToBase64(file)
        )
      );

      // Append images instead of replacing
      // existing images
      setImages((previousImages) => [
        ...previousImages,
        ...base64Images,
      ]);

      // Allow selecting the same file again
      event.target.value = "";
    } catch (error) {
      console.error(
        "Image conversion error:",
        error
      );

      setError(
        "Unable to process selected images."
      );
    }
  };

  // =====================================================
  // REMOVE IMAGE
  // =====================================================

  const handleRemoveImage = (indexToRemove) => {
    setImages((previousImages) =>
      previousImages.filter(
        (_, index) => index !== indexToRemove
      )
    );

    const fileInput = document.getElementById(
      "product-images"
    );

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // =====================================================
  // FORM VALIDATION
  // =====================================================

  const validateForm = () => {
    if (!name.trim()) {
      setError("Please enter a product name.");
      return false;
    }

    if (!description.trim()) {
      setError(
        "Please enter a product description."
      );
      return false;
    }

    if (!categoryVal) {
      setError("Please select a category.");
      return false;
    }

    if (!brand.trim()) {
      setError("Please enter a brand.");
      return false;
    }

    if (
      !regularPrice ||
      Number(regularPrice) <= 0
    ) {
      setError(
        "Please enter a valid regular price."
      );
      return false;
    }

    if (!price || Number(price) <= 0) {
      setError(
        "Please enter a valid selling price."
      );
      return false;
    }

    if (Number(regularPrice) < Number(price)) {
      setError(
        "Regular price should be greater than or equal to selling price."
      );
      return false;
    }

    if (
      countInStock === "" ||
      Number(countInStock) < 0 ||
      !Number.isInteger(Number(countInStock))
    ) {
      setError(
        "Please enter a valid whole-number stock quantity."
      );
      return false;
    }

    if (images.length === 0) {
      setError(
        "Please select at least one product image."
      );
      return false;
    }

    return true;
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setName("");
    setDescription("");
    setCategoryVal("");
    setBrand("");

    setRegularPrice("");
    setPrice("");

    setRatingsValue(1);
    setCountInStock("");

    setImages([]);

    const fileInput = document.getElementById(
      "product-images"
    );

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // =====================================================
  // SUBMIT PRODUCT
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);

      const productData = {
        name: name.trim(),

        description: description.trim(),

        images: images,

        brand: brand.trim(),

        regularPrice: Number(regularPrice),

        price: Number(price),

        category: categoryVal,

        countInStock: Number(countInStock),

        rating: Number(ratingsValue || 0),

        numReviews: 0,

        isFeatured: false,
      };

      // =================================================
      // ADD OR UPDATE
      // =================================================

      const requestUrl = isEditMode
        ? `${API_URL}/products/${editProductId}`
        : `${API_URL}/products/create`;

      const requestMethod = isEditMode
        ? "PUT"
        : "POST";

      const response = await fetch(requestUrl, {
        method: requestMethod,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(productData),
      });

      const responseText = await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          "Server returned an invalid response. Check the backend terminal."
        );
      }

      if (!response.ok) {
        throw new Error(
          typeof data === "string"
            ? data
            : data.message ||
                data.error ||
                "Product operation failed."
        );
      }

      // =================================================
      // SUCCESS
      // =================================================

      setMessage(
        isEditMode
          ? "Product updated successfully!"
          : "Product uploaded successfully!"
      );

      if (!isEditMode) {
        resetForm();
      }

      // Navigate after success
      setTimeout(() => {
        navigate("/products");
      }, 1000);
    } catch (error) {
      console.error(
        "Product submit error:",
        error
      );

      setError(
        error.message ||
          "Unable to save product."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =====================================================
  // LOADING PRODUCT
  // =====================================================

  if (loadingProduct) {
    return (
      <div className="card shadow border-0 p-4 mt-4">
        <h4>Loading product details...</h4>
        <p>Please wait.</p>
      </div>
    );
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="right-content w-100">
      {/* HEADER */}

      <div className="card shadow border-0 w-100 flex-row p-4">
        <h5 className="title">
          {isEditMode
            ? "Edit Product"
            : "Product Upload"}
        </h5>

        <Breadcrumbs
          aria-label="breadcrumb"
          className="ml-auto breadcrumb-wrapper"
        >
          <StyledBreadcrumb
            component="a"
            href="#"
            label="Dashboard"
            icon={
              <HomeIcon fontSize="small" />
            }
          />

          <StyledBreadcrumb
            component="a"
            label="Products"
            href="#"
            deleteIcon={<ExpandMoreIcon />}
          />

          <StyledBreadcrumb
            label={
              isEditMode
                ? "Edit Product"
                : "Product Upload"
            }
            href="#"
            deleteIcon={<ExpandMoreIcon />}
          />
        </Breadcrumbs>
      </div>

      {/* FORM */}

      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <div className="row">
          <div className="col-sm-9">
            <div className="card p-4">
              <h5 className="mb-4">
                Basic Information
              </h5>

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
                  onChange={(event) =>
                    setName(event.target.value)
                  }
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
                    setDescription(
                      event.target.value
                    )
                  }
                  placeholder="Enter product description"
                />
              </div>

              {/* CATEGORY AND BRAND */}

              <div className="row">
                {/* CATEGORY */}

                <div className="col">
                  <div className="form-group">
                    <h6>CATEGORY</h6>

                    <Select
                      value={categoryVal}
                      onChange={(event) =>
                        setCategoryVal(
                          event.target.value
                        )
                      }
                      displayEmpty
                      className="w-100"
                      disabled={
                        loadingCategories
                      }
                    >
                      <MenuItem value="">
                        <em>
                          {loadingCategories
                            ? "Loading categories..."
                            : categories.length === 0
                            ? "No categories found"
                            : "Select Category"}
                        </em>
                      </MenuItem>

                      {categories.map(
                        (category) => (
                          <MenuItem
                            key={category._id}
                            value={category._id}
                          >
                            {category.name}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </div>
                </div>

                {/* BRAND */}

                <div className="col">
                  <div className="form-group">
                    <h6>BRAND</h6>

                    <input
                      type="text"
                      className="form-control"
                      value={brand}
                      onChange={(event) =>
                        setBrand(
                          event.target.value
                        )
                      }
                      placeholder="Enter brand name"
                    />
                  </div>
                </div>
              </div>

              {/* PRICE */}

              <div className="row">
                {/* REGULAR PRICE */}

                <div className="col">
                  <div className="form-group">
                    <h6>REGULAR PRICE</h6>

                    <input
                      type="number"
                      className="form-control"
                      value={regularPrice}
                      onChange={(event) =>
                        setRegularPrice(
                          event.target.value
                        )
                      }
                      placeholder="Enter regular price"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* SELLING PRICE */}

                <div className="col">
                  <div className="form-group">
                    <h6>SELLING PRICE</h6>

                    <input
                      type="number"
                      className="form-control"
                      value={price}
                      onChange={(event) =>
                        setPrice(
                          event.target.value
                        )
                      }
                      placeholder="Enter selling price"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              {/* DISCOUNT PREVIEW */}

              {Number(regularPrice) > 0 &&
                Number(price) > 0 &&
                Number(regularPrice) >=
                  Number(price) && (
                  <div className="alert alert-info">
                    <strong>
                      Discount:{" "}
                    </strong>

                    {Math.round(
                      ((Number(regularPrice) -
                        Number(price)) /
                        Number(regularPrice)) *
                        100
                    )}
                    %
                  </div>
                )}

              {/* RATING AND STOCK */}

              <div className="row">
                {/* RATING */}

                <div className="col">
                  <div className="form-group">
                    <h6>RATING</h6>

                    <Rating
                      name="product-rating"
                      value={ratingsValue}
                      onChange={(
                        event,
                        newValue
                      ) => {
                        setRatingsValue(
                          newValue || 0
                        );
                      }}
                    />
                  </div>
                </div>

                {/* STOCK */}

                <div className="col">
                  <div className="form-group">
                    <h6>PRODUCT STOCK</h6>

                    <input
                      type="number"
                      className="form-control"
                      value={countInStock}
                      onChange={(event) =>
                        setCountInStock(
                          event.target.value
                        )
                      }
                      placeholder="Enter stock quantity"
                      min="0"
                      step="1"
                    />
                  </div>
                </div>
              </div>

              {/* IMAGE UPLOAD */}

              <div className="form-group mt-3">
                <h6>PRODUCT IMAGES</h6>

                <input
                  id="product-images"
                  type="file"
                  className="form-control"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />

                <small className="text-muted">
                  Select up to 5 images. Each
                  image must be smaller than
                  5 MB.
                </small>

                {/* IMAGE PREVIEW */}

                {images.length > 0 && (
                  <>
                    <p className="mt-2 text-success">
                      {images.length} image(s)
                      selected.
                    </p>

                    <div className="row mt-3">
                      {images.map(
                        (image, index) => (
                          <div
                            className="col-md-4 col-sm-6 mb-3"
                            key={`${index}-${image.slice(
                              0,
                              30
                            )}`}
                          >
                            <div className="card p-2">
                              <img
                                src={image}
                                alt={`Product preview ${
                                  index + 1
                                }`}
                                style={{
                                  width: "100%",
                                  height: "150px",
                                  objectFit: "cover",
                                  borderRadius:
                                    "8px",
                                }}
                              />

                              <Button
                                type="button"
                                color="error"
                                size="small"
                                onClick={() =>
                                  handleRemoveImage(
                                    index
                                  )
                                }
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* SUBMIT BUTTON */}

              <Button
                type="submit"
                className="btn-blue btn-lg btn-big mt-3"
                disabled={
                  submitting ||
                  loadingCategories
                }
              >
                <FaCloudUploadAlt />

                &nbsp;

                {submitting
                  ? isEditMode
                    ? "UPDATING..."
                    : "UPLOADING..."
                  : isEditMode
                  ? "UPDATE PRODUCT"
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