
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { FaEye, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// =====================================================
// API URL
// =====================================================

const API_URL = "http://localhost:4000/api/products";

// =====================================================
// PRODUCTS COMPONENT
// =====================================================

const Products = () => {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const productsPerPage = 10;

  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      // Supports direct array or { products: [] }
      const productData = Array.isArray(data)
        ? data
        : Array.isArray(data.products)
        ? data.products
        : [];

      setProducts(productData);
    } catch (error) {
      console.error("Fetch products error:", error);

      setError(
        "Unable to load products. Please check your backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =====================================================
  // GET CATEGORY NAME
  // =====================================================

  const getCategoryName = (category) => {
    if (typeof category === "object" && category !== null) {
      return category.name || "No Category";
    }

    return category || "No Category";
  };

  // =====================================================
  // GET PRODUCT IMAGE
  // =====================================================

  const getProductImage = (images) => {
    if (!Array.isArray(images) || images.length === 0) {
      return "https://via.placeholder.com/100?text=No+Image";
    }

    const firstImage = images[0];

    if (typeof firstImage === "string") {
      return firstImage;
    }

    if (typeof firstImage === "object" && firstImage !== null) {
      return (
        firstImage.url ||
        firstImage.secure_url ||
        firstImage.src ||
        firstImage.image ||
        "https://via.placeholder.com/100?text=No+Image"
      );
    }

    return "https://via.placeholder.com/100?text=No+Image";
  };

  // =====================================================
  // GET CATEGORIES
  // =====================================================

  const categories = useMemo(() => {
    const categoryNames = products
      .map((product) => getCategoryName(product.category))
      .filter(
        (category) =>
          category && category !== "No Category"
      );

    return [...new Set(categoryNames)];
  }, [products]);

  // =====================================================
  // FILTER PRODUCTS
  // =====================================================

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryName = getCategoryName(
        product.category
      );

      const productName = String(product.name || "");
      const brandName = String(product.brand || "");

      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        productName.toLowerCase().includes(searchValue) ||
        brandName.toLowerCase().includes(searchValue);

      const matchesCategory =
        categoryFilter === "" ||
        String(categoryName).toLowerCase() ===
          categoryFilter.toLowerCase();

      const stock = Number(product.countInStock || 0);

      const matchesStock =
        stockFilter === "" ||
        (stockFilter === "inStock" && stock > 0) ||
        (stockFilter === "outOfStock" && stock === 0);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStock
      );
    });
  }, [
    products,
    search,
    categoryFilter,
    stockFilter,
  ]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex =
    (page - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  useEffect(() => {
    setPage(1);
  }, [search, categoryFilter, stockFilter]);

  // =====================================================
  // DELETE PRODUCT
  // =====================================================

  const deleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      alert("Product deleted successfully");

      setProducts((previousProducts) =>
        previousProducts.filter(
          (product) => product._id !== productId
        )
      );
    } catch (error) {
      console.error("Delete product error:", error);

      alert("Unable to delete product");
    }
  };

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("");
    setStockFilter("");
    setPage(1);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="card shadow border-0 p-4 mt-4">
        <h3 className="hd">Products</h3>
        <p>Loading products...</p>
      </div>
    );
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="card shadow border-0 p-3 mt-4">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="d-flex justify-content-between align-items-center">

        <h3 className="hd">
          Products
        </h3>

        <Link to="/product/upload">
          <Button
            variant="contained"
            color="primary"
          >
            Add Product
          </Button>
        </Link>

      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="alert alert-danger mt-3">
          {error}
        </div>
      )}

      {/* =================================================
          FILTERS
      ================================================= */}

      <div className="row cardFilters mt-3">

        {/* SEARCH */}

        <div className="col-md-4 mb-3">

          <h4>
            SEARCH PRODUCT
          </h4>

          <input
            type="text"
            className="form-control"
            placeholder="Search name or brand..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>

        {/* CATEGORY FILTER */}

        <div className="col-md-3 mb-3">

          <h4>
            CATEGORY BY
          </h4>

          <FormControl
            size="small"
            className="w-100"
          >
            <Select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value)
              }
              displayEmpty
            >

              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>

              {categories.map((category, index) => (
                <MenuItem
                  key={index}
                  value={category}
                >
                  {category}
                </MenuItem>
              ))}

            </Select>
          </FormControl>

        </div>

        {/* STOCK FILTER */}

        <div className="col-md-3 mb-3">

          <h4>
            STOCK BY
          </h4>

          <FormControl
            size="small"
            className="w-100"
          >
            <Select
              value={stockFilter}
              onChange={(event) =>
                setStockFilter(event.target.value)
              }
              displayEmpty
            >

              <MenuItem value="">
                <em>All Stock</em>
              </MenuItem>

              <MenuItem value="inStock">
                In Stock
              </MenuItem>

              <MenuItem value="outOfStock">
                Out of Stock
              </MenuItem>

            </Select>
          </FormControl>

        </div>

        {/* CLEAR FILTERS */}

        <div className="col-md-2 mb-3 d-flex align-items-end">

          <Button
            variant="outlined"
            color="secondary"
            onClick={clearFilters}
          >
            Clear
          </Button>

        </div>

      </div>

      {/* =================================================
          PRODUCT COUNT
      ================================================= */}

      <div className="mt-2 mb-3">

        <p>
          Total Products:{" "}
          <b>{filteredProducts.length}</b>
        </p>

      </div>

      {/* =================================================
          PRODUCT TABLE
      ================================================= */}

      <div className="table-responsive mt-3">

        <table className="table table-bordered v-align">

          <thead className="thead-dark">

            <tr>
              <th>UID</th>
              <th style={{ width: "300px" }}>
                PRODUCT
              </th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>REGULAR PRICE</th>
              <th>SELLING PRICE</th>
              <th>STOCK</th>
              <th>RATING</th>
              <th>ORDER</th>
              <th>SALES</th>
              <th>ACTION</th>
            </tr>

          </thead>

          <tbody>

            {currentProducts.length === 0 ? (

              <tr>

                <td
                  colSpan="11"
                  className="text-center p-4"
                >
                  No products found
                </td>

              </tr>

            ) : (

              currentProducts.map((product, index) => {

                const categoryName = getCategoryName(
                  product.category
                );

                const image = getProductImage(
                  product.images
                );

                const stock = Number(
                  product.countInStock || 0
                );

                const regularPrice = Number(
                  product.regularPrice || 0
                );

                const sellingPrice = Number(
                  product.price || 0
                );

                const rating = Number(
                  product.rating || 0
                );

                const numReviews = Number(
                  product.numReviews || 0
                );

                return (

                  <tr
                    key={product._id}
                  >

                    {/* UID */}

                    <td>
                      #{startIndex + index + 1}
                    </td>

                    {/* PRODUCT */}

                    <td>

                      <div className="d-flex align-items-center productBox">

                        <div className="imgWrapper">

                          <div className="img">

                            <img
                              src={image}
                              alt={
                                product.name ||
                                "Product"
                              }
                              className="w-100"
                              style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                                borderRadius: "8px",
                              }}
                              onError={(event) => {
                                event.currentTarget.src =
                                  "https://via.placeholder.com/100?text=Image";
                              }}
                            />

                          </div>

                        </div>

                        <div className="info pl-2">

                          <h6>
                            {product.name ||
                              "Unnamed Product"}
                          </h6>

                          <p>
                            {product.description
                              ? String(
                                  product.description
                                ).substring(0, 60)
                              : "No description"}
                            ...
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* CATEGORY */}

                    <td>
                      {categoryName}
                    </td>

                    {/* BRAND */}

                    <td>
                      {product.brand || "No Brand"}
                    </td>

                    {/* REGULAR PRICE */}

                    <td>

                      <span
                        style={{
                          textDecoration:
                            "line-through",
                          color: "#777",
                        }}
                      >
                        ₹
                        {regularPrice.toLocaleString(
                          "en-IN"
                        )}
                      </span>

                    </td>

                    {/* SELLING PRICE */}

                    <td>

                      <span
                        className="text-danger"
                        style={{
                          fontWeight: "600",
                        }}
                      >
                        ₹
                        {sellingPrice.toLocaleString(
                          "en-IN"
                        )}
                      </span>

                    </td>

                    {/* STOCK */}

                    <td>

                      <span
                        className={
                          stock > 0
                            ? "badge bg-success"
                            : "badge bg-danger"
                        }
                      >
                        {stock}
                      </span>

                    </td>

                    {/* RATING */}

                    <td>

                      ⭐ {rating}

                      <br />

                      <small>
                        ({numReviews})
                      </small>

                    </td>

                    {/* ORDER */}

                    <td>
                      -
                    </td>

                    {/* SALES */}

                    <td>
                      -
                    </td>

                    {/* ACTIONS */}

                    <td>

                      <div className="actions d-flex align-items-center">

                        {/* VIEW PRODUCT */}

                        <Link
                          to={`/product/details/${product._id}`}
                        >

                          <Button
                            className="secondary"
                            color="secondary"
                            title="View Product"
                          >
                            <FaEye />
                          </Button>

                        </Link>

                        {/* EDIT PRODUCT */}

                        <Link
                          to={`/product/upload?edit=${product._id}`}
                        >

                          <Button
                            className="success"
                            color="success"
                            title="Edit Product"
                          >
                            <FaPencilAlt />
                          </Button>

                        </Link>

                        {/* DELETE PRODUCT */}

                        <Button
                          className="error"
                          color="error"
                          title="Delete Product"
                          onClick={() =>
                            deleteProduct(product._id)
                          }
                        >
                          <MdDelete />
                        </Button>

                      </div>

                    </td>

                  </tr>

                );
              })

            )}

          </tbody>

        </table>

        {/* =================================================
            TABLE FOOTER
        ================================================= */}

        <div className="d-flex tableFooter justify-content-between align-items-center">

          <p>
            Showing{" "}
            <b>{currentProducts.length}</b>{" "}
            of{" "}
            <b>{filteredProducts.length}</b>{" "}
            results
          </p>

          {totalPages > 1 && (

            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, value) =>
                setPage(value)
              }
              color="primary"
              className="pagination"
              showFirstButton
              showLastButton
            />

          )}

        </div>

      </div>

    </div>
  );
};

export default Products;