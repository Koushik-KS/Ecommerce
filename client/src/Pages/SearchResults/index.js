import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import ProductItem from "../../Components/ProductItem";

import Button from "@mui/material/Button";

import {
  FaArrowLeft,
  FaSearch,
} from "react-icons/fa";

// =====================================================
// API URL
// =====================================================

const API_URL =
  "https://ecommerce-hsm4.onrender.com/api";

// =====================================================
// SEARCH RESULTS COMPONENT
// =====================================================

const SearchResults = () => {
  // ===================================================
  // SEARCH PARAMS
  // ===================================================

  const [searchParams] =
    useSearchParams();

  const searchQuery =
    searchParams.get("query") || "";

  // ===================================================
  // STATES
  // ===================================================

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ===================================================
  // FETCH PRODUCTS
  // ===================================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/products`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch products."
          );
        }

        const data =
          await response.json();

        setProducts(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (fetchError) {
        console.error(
          "Search product error:",
          fetchError
        );

        setError(
          "Unable to load products. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ===================================================
  // NORMALIZE SEARCH QUERY
  // ===================================================

  const normalizedQuery =
    searchQuery
      .trim()
      .toLowerCase();

  // ===================================================
  // FILTER PRODUCTS
  // ===================================================

  const filteredProducts =
    products.filter((product) => {
      // Product name
      const name =
        String(
          product.name || ""
        ).toLowerCase();

      // Product brand
      const brand =
        typeof product.brand ===
          "object" &&
        product.brand !== null
          ? String(
              product.brand.name ||
                product.brand._id ||
                ""
            ).toLowerCase()
          : String(
              product.brand || ""
            ).toLowerCase();

      // Product description
      const description =
        String(
          product.description || ""
        ).toLowerCase();

      // Category
      const category =
        typeof product.category ===
          "object" &&
        product.category !== null
          ? String(
              product.category.name ||
                product.category._id ||
                ""
            ).toLowerCase()
          : String(
              product.category || ""
            ).toLowerCase();

      return (
        name.includes(
          normalizedQuery
        ) ||
        brand.includes(
          normalizedQuery
        ) ||
        description.includes(
          normalizedQuery
        ) ||
        category.includes(
          normalizedQuery
        )
      );
    });

  // ===================================================
  // RETURN UI
  // ===================================================

  return (
    <div className="container py-4">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">

        <div>

          <h2 className="font-weight-bold mb-1">
            Search Results
          </h2>

          <p className="text-muted mb-0">
            Results for:{" "}
            <strong>
              {searchQuery || "All Products"}
            </strong>
          </p>

        </div>

        <Link
          to="/"
          className="text-decoration-none mt-2"
        >
          <FaArrowLeft className="mr-2" />
          Back to Home
        </Link>

      </div>

      {/* =================================================
          LOADING
      ================================================= */}

      {loading && (
        <div className="text-center py-5">

          <p>
            Loading products...
          </p>

        </div>
      )}

      {/* =================================================
          ERROR
      ================================================= */}

      {!loading && error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* =================================================
          EMPTY SEARCH
      ================================================= */}

      {!loading &&
        !error &&
        normalizedQuery === "" && (
          <div className="text-center py-5">

            <FaSearch
              size={50}
              color="#bdbdbd"
            />

            <h4 className="mt-3">
              Enter a product name
              to search
            </h4>

            <p className="text-muted">
              Search for products,
              brands, categories or
              descriptions.
            </p>

            <Link to="/">
              <Button
                variant="contained"
                className="btn-blue mt-3"
              >
                Continue Shopping
              </Button>
            </Link>

          </div>
        )}

      {/* =================================================
          NO RESULTS
      ================================================= */}

      {!loading &&
        !error &&
        normalizedQuery !== "" &&
        filteredProducts.length === 0 && (
          <div className="text-center py-5">

            <FaSearch
              size={50}
              color="#bdbdbd"
            />

            <h4 className="mt-3">
              No products found
            </h4>

            <p className="text-muted">
              No products match{" "}
              <strong>
                "{searchQuery}"
              </strong>
              . Try another product
              name, brand or category.
            </p>

            <Link to="/">
              <Button
                variant="contained"
                className="btn-blue mt-3"
              >
                Continue Shopping
              </Button>
            </Link>

          </div>
        )}

      {/* =================================================
          SEARCH RESULTS
      ================================================= */}

      {!loading &&
        !error &&
        normalizedQuery !== "" &&
        filteredProducts.length > 0 && (
          <>

            {/* RESULT COUNT */}

            <div className="mb-3">

              <strong>
                {filteredProducts.length}{" "}

                {filteredProducts.length ===
                1
                  ? "product"
                  : "products"}{" "}

                found
              </strong>

            </div>

            {/* PRODUCT GRID */}

            <div className="row">

              {filteredProducts.map(
                (product) => (
                  <div
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                    key={
                      product._id ||
                      product.id
                    }
                  >

                    <ProductItem
                      product={product}
                    />

                  </div>
                )
              )}

            </div>

          </>
        )}

    </div>
  );
};

export default SearchResults;