
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductItem from "../../Components/ProductItem";
import Button from "@mui/material/Button";
import { FaArrowLeft, FaSearch } from "react-icons/fa";

const API_URL = "http://localhost:4000/api";

const SearchResults = () => {
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("query") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/products`);

        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }

        const data = await response.json();

        setProducts(Array.isArray(data) ? data : []);
      } catch (fetchError) {
        console.error("Search product error:", fetchError);

        setError(
          "Unable to load products. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const name = String(product.name || "").toLowerCase();

    const brand = String(product.brand || "").toLowerCase();

    const description = String(
      product.description || ""
    ).toLowerCase();

    return (
      name.includes(normalizedQuery) ||
      brand.includes(normalizedQuery) ||
      description.includes(normalizedQuery)
    );
  });

  return (
    <div className="container py-4">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <div>
          <h2 className="font-weight-bold mb-1">
            Search Results
          </h2>

          <p className="text-muted mb-0">
            Results for:{" "}
            <strong>{searchQuery}</strong>
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

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <p>Loading products...</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* Empty Search */}
      {!loading &&
        !error &&
        normalizedQuery === "" && (
          <div className="text-center py-5">
            <FaSearch size={50} color="#bdbdbd" />

            <h4 className="mt-3">
              Enter a product name to search
            </h4>

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

      {/* No Results */}
      {!loading &&
        !error &&
        normalizedQuery !== "" &&
        filteredProducts.length === 0 && (
          <div className="text-center py-5">
            <FaSearch size={50} color="#bdbdbd" />

            <h4 className="mt-3">
              No products found
            </h4>

            <p className="text-muted">
              Try searching with another product name.
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

      {/* Search Results */}
      {!loading &&
        !error &&
        filteredProducts.length > 0 && (
          <>
            <div className="mb-3">
              <strong>
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1
                  ? "product"
                  : "products"}{" "}
                found
              </strong>
            </div>

            <div className="row">
              {filteredProducts.map((product) => (
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                  key={product._id}
                >
                  <ProductItem product={product} />
                </div>
              ))}
            </div>
          </>
        )}
    </div>
  );
};

export default SearchResults;