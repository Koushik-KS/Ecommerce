
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { FaEye, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const API_URL = "http://localhost:4000/api/products";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const productsPerPage = 10;

  // =========================
  // FETCH PRODUCTS
  // =========================
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch products error:", error);
      setError("Unable to load products. Check your backend server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // GET CATEGORIES
  // =========================
  const categories = useMemo(() => {
    const categoryNames = products
      .map((product) => {
        if (typeof product.category === "object") {
          return product.category?.name;
        }

        return product.category;
      })
      .filter(Boolean);

    return [...new Set(categoryNames)];
  }, [products]);

  // =========================
  // FILTER PRODUCTS
  // =========================
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryName =
        typeof product.category === "object"
          ? product.category?.name
          : product.category;

      const productName = product.name || "";
      const brandName = product.brand || "";

      const searchValue = search.toLowerCase();

      const matchesSearch =
        productName.toLowerCase().includes(searchValue) ||
        brandName.toLowerCase().includes(searchValue);

      const matchesCategory =
        categoryFilter === "" ||
        categoryName?.toLowerCase() === categoryFilter.toLowerCase();

      const stock = Number(product.countInStock || 0);

      const matchesStock =
        stockFilter === "" ||
        (stockFilter === "inStock" && stock > 0) ||
        (stockFilter === "outOfStock" && stock === 0);

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, search, categoryFilter, stockFilter]);

  // =========================
  // PAGINATION
  // =========================
  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex = (page - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  useEffect(() => {
    setPage(1);
  }, [search, categoryFilter, stockFilter]);

  // =========================
  // DELETE PRODUCT
  // =========================
  const deleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${productId}`, {
        method: "DELETE",
      });

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

  // =========================
  // CLEAR FILTERS
  // =========================
  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("");
    setStockFilter("");
    setPage(1);
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="card shadow border-0 p-4 mt-4">
        <h3 className="hd">Products</h3>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="card shadow border-0 p-3 mt-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="hd">Products</h3>

        <Link to="/product/upload">
          <Button variant="contained" color="primary">
            Add Product
          </Button>
        </Link>
      </div>

      {/* ERROR */}
      {error && (
        <div className="alert alert-danger mt-3">
          {error}
        </div>
      )}

      {/* FILTERS */}
      <div className="row cardFilters mt-3">
        {/* SEARCH */}
        <div className="col-md-4 mb-3">
          <h4>SEARCH PRODUCT</h4>

          <input
            type="text"
            className="form-control"
            placeholder="Search name or brand..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {/* CATEGORY */}
        <div className="col-md-3 mb-3">
          <h4>CATEGORY BY</h4>

          <FormControl size="small" className="w-100">
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
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* STOCK */}
        <div className="col-md-3 mb-3">
          <h4>STOCK BY</h4>

          <FormControl size="small" className="w-100">
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

        {/* CLEAR */}
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

      {/* PRODUCT COUNT */}
      <div className="mt-2 mb-3">
        <p>
          Total Products: <b>{filteredProducts.length}</b>
        </p>
      </div>

      {/* TABLE */}
      <div className="table-responsive mt-3">
        <table className="table table-bordered v-align">
          <thead className="thead-dark">
            <tr>
              <th>UID</th>
              <th style={{ width: "300px" }}>PRODUCT</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>PRICE</th>
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
                <td colSpan="10" className="text-center p-4">
                  No products found
                </td>
              </tr>
            ) : (
              currentProducts.map((product, index) => {
                const categoryName =
                  typeof product.category === "object"
                    ? product.category?.name
                    : product.category;

                const image =
                  product.images && product.images.length > 0
                    ? product.images[0]
                    : "https://via.placeholder.com/100";

                const stock = Number(
                  product.countInStock || 0
                );

                return (
                  <tr key={product._id}>
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
                              alt={product.name || "Product"}
                              className="w-100"
                              style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                                borderRadius: "8px",
                              }}
                            />
                          </div>
                        </div>

                        <div className="info pl-2">
                          <h6>
                            {product.name || "Unnamed Product"}
                          </h6>

                          <p>
                            {product.description
                              ? product.description.substring(0, 60)
                              : "No description"}
                            ...
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* CATEGORY */}
                    <td>
                      {categoryName || "No Category"}
                    </td>

                    {/* BRAND */}
                    <td>
                      {product.brand || "No Brand"}
                    </td>

                    {/* PRICE */}
                    <td>
                      <div style={{ width: "80px" }}>
                        <span className="new text-danger">
                          ₹
                          {Number(
                            product.price || 0
                          ).toLocaleString("en-IN")}
                        </span>
                      </div>
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
                      ⭐ {product.rating || 0}
                      <br />
                      <small>
                        ({product.numReviews || 0})
                      </small>
                    </td>

                    {/* ORDER */}
                    <td>-</td>

                    {/* SALES */}
                    <td>-</td>

                    {/* ACTIONS */}
                    <td>
                      <div className="actions d-flex align-items-center">
                        {/* VIEW */}
                        <Link to="/product/details">
                          <Button
                            className="secondary"
                            color="secondary"
                            title="View Product"
                          >
                            <FaEye />
                          </Button>
                        </Link>

                        {/* EDIT */}
                        <Link to="/product/upload">
                          <Button
                            className="success"
                            color="success"
                            title="Edit Product"
                          >
                            <FaPencilAlt />
                          </Button>
                        </Link>

                        {/* DELETE */}
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

        {/* FOOTER */}
        <div className="d-flex tableFooter justify-content-between align-items-center">
          <p>
            Showing <b>{currentProducts.length}</b> of{" "}
            <b>{filteredProducts.length}</b> results
          </p>

          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, value) => setPage(value)}
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