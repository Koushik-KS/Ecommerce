
import Sidebar from "../../../Components/Sidebar";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";

import { IoMdMenu } from "react-icons/io";
import { CgMenuGridR } from "react-icons/cg";
import { IoGridOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ProductItem from "../../../Components/ProductItem";

const Listing = () => {
  // Get category ID from URL
  const { id } = useParams();

  // Products
  const [products, setProducts] = useState([]);

  // Category details
  const [category, setCategory] = useState(null);

  // Loading and error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Product view
  const [productView, setProductView] = useState("four");

  // Products per page
  const [productsPerPage, setProductsPerPage] = useState(9);

  // Dropdown
  const [anchorEl, setAnchorEl] = useState(null);

  const openDropdown = Boolean(anchorEl);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Sidebar filters
  const [filters, setFilters] = useState({
    minPrice: 100,
    maxPrice: 60000,
    categories: [],
    brands: [],
    inStock: false,
    onSale: false,
  });

  // =========================
  // GET CATEGORY AND PRODUCTS
  // =========================

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        setError("");
        setCurrentPage(1);

        // Get selected category
        const categoryResponse = await axios.get(
          `http://localhost:4000/api/category/${id}`
        );

        setCategory(categoryResponse.data);

        // Get all products
        const productsResponse = await axios.get(
          "http://localhost:4000/api/products"
        );

        const allProducts = Array.isArray(productsResponse.data)
          ? productsResponse.data
          : [];

        // Filter products by URL category ID
        const filteredProducts = allProducts.filter((product) => {
          const productCategory = product.category;

          const productCategoryId =
            typeof productCategory === "object"
              ? productCategory?._id || productCategory?.id
              : productCategory;

          return String(productCategoryId) === String(id);
        });

        setProducts(filteredProducts);
      } catch (err) {
        console.error(
          "Error fetching category products:",
          err
        );

        setError(
          "Unable to load products for this category."
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCategoryProducts();
    }
  }, [id]);

  // =========================
  // RECEIVE SIDEBAR FILTERS
  // =========================

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  // =========================
  // DROPDOWN FUNCTIONS
  // =========================

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeProductsPerPage = (count) => {
    setProductsPerPage(count);
    setCurrentPage(1);
    handleClose();
  };

  // =========================
  // CATEGORY NAME
  // =========================

  const categoryName = category?.name
    ? category.name.charAt(0).toUpperCase() +
      category.name.slice(1)
    : "Products";

  // =========================
  // HELPER FUNCTIONS
  // =========================

  const getProductPrice = (product) => {
    return Number(
      product.price ||
        product.newPrice ||
        product.salePrice ||
        0
    );
  };

  const getProductBrand = (product) => {
    const brand = product.brand;

    if (typeof brand === "object" && brand !== null) {
      return String(brand.name || brand._id || "");
    }

    return String(brand || "");
  };

  const getProductCategoryId = (product) => {
    const productCategory = product.category;

    if (
      typeof productCategory === "object" &&
      productCategory !== null
    ) {
      return String(
        productCategory._id || productCategory.id || ""
      );
    }

    return String(productCategory || "");
  };

  const checkProductInStock = (product) => {
    // Supports common stock field names
    if (typeof product.inStock === "boolean") {
      return product.inStock;
    }

    if (typeof product.isAvailable === "boolean") {
      return product.isAvailable;
    }

    if (typeof product.stock === "number") {
      return product.stock > 0;
    }

    if (typeof product.countInStock === "number") {
      return product.countInStock > 0;
    }

    if (typeof product.quantity === "number") {
      return product.quantity > 0;
    }

    // If the backend does not provide stock information,
    // do not hide products by default.
    return true;
  };

  const checkProductOnSale = (product) => {
    // Supports an explicit sale field
    if (product.onSale === true || product.isSale === true) {
      return true;
    }

    // Supports a discount field
    if (Number(product.discount || 0) > 0) {
      return true;
    }

    // Supports oldPrice compared with current price
    const currentPrice = Number(
      product.price || product.newPrice || 0
    );

    const oldPrice = Number(
      product.oldPrice || product.originalPrice || 0
    );

    return oldPrice > currentPrice && currentPrice > 0;
  };

  // =========================
  // APPLY ALL FILTERS
  // =========================

  const filteredProducts = products.filter((product) => {
    const productPrice = getProductPrice(product);
    const productBrand = getProductBrand(product);
    const productCategoryId = getProductCategoryId(product);

    // Price filter
    const matchesPrice =
      productPrice >= filters.minPrice &&
      productPrice <= filters.maxPrice;

    // Category filter
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(productCategoryId);

    // Brand filter
    const matchesBrand =
      filters.brands.length === 0 ||
      filters.brands.includes(productBrand);

    // Stock filter
    const matchesStock =
      !filters.inStock || checkProductInStock(product);

    // Sale filter
    const matchesSale =
      !filters.onSale || checkProductOnSale(product);

    return (
      matchesPrice &&
      matchesCategory &&
      matchesBrand &&
      matchesStock &&
      matchesSale
    );
  });

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // =========================
  // RETURN UI
  // =========================

  return (
    <section className="product_Listing_Page">
      <div className="container">
        {/* PAGE TITLE */}
        <div className="mb-3">
          <h2 className="font-weight-bold">
            {categoryName}
          </h2>

          <p className="text-muted">
            {filteredProducts.length} products available
          </p>
        </div>

        <div className="productListing d-flex">
          {/* SIDEBAR */}
          <Sidebar
            products={products}
            onFilterChange={handleFilterChange}
          />

          {/* RIGHT CONTENT */}
          <div className="content_right">
            {/* BANNER */}
            <img
              src="https://i.pinimg.com/1200x/01/0e/24/010e248c281d83e130d9315d31d21377.jpg"
              alt={`${categoryName} banner`}
              className="w-100"
              style={{
                borderRadius: "8px",
                height: "220px",
                objectFit: "cover",
              }}
            />

            {/* VIEW AND FILTER */}
            <div className="showBy mt-3 mb-3 d-flex align-items-center">
              <div className="d-flex btnWrapper">
                <Button
                  className={
                    productView === "one" ? "act" : ""
                  }
                  onClick={() => setProductView("one")}
                >
                  <IoMdMenu />
                </Button>

                <Button
                  className={
                    productView === "three" ? "act" : ""
                  }
                  onClick={() => setProductView("three")}
                >
                  <CgMenuGridR />
                </Button>

                <Button
                  className={
                    productView === "four" ? "act" : ""
                  }
                  onClick={() => setProductView("four")}
                >
                  <IoGridOutline />
                </Button>
              </div>

              {/* PRODUCTS PER PAGE */}
              <div className="ml-auto showByFilter">
                <Button onClick={handleClick}>
                  Show {productsPerPage}
                  <FaAngleDown />
                </Button>

                <Menu
                  id="products-per-page-menu"
                  anchorEl={anchorEl}
                  open={openDropdown}
                  onClose={handleClose}
                >
                  {[9, 20, 30, 40, 50, 60].map(
                    (count) => (
                      <MenuItem
                        key={count}
                        onClick={() =>
                          changeProductsPerPage(count)
                        }
                      >
                        {count}
                      </MenuItem>
                    )
                  )}
                </Menu>
              </div>
            </div>

            {/* PRODUCT LIST */}
            {loading ? (
              <div className="text-center py-5">
                <h5>Loading products...</h5>
              </div>
            ) : error ? (
              <div className="text-center py-5">
                <h5 className="text-danger">
                  {error}
                </h5>
              </div>
            ) : currentProducts.length === 0 ? (
              <div className="text-center py-5">
                <h5>
                  No products found with the selected filters.
                </h5>
              </div>
            ) : (
              <div className="productListing">
                {currentProducts.map((product) => (
                  <ProductItem
                    key={product._id || product.id}
                    product={product}
                    itemView={productView}
                  />
                ))}
              </div>
            )}

            {/* PAGINATION */}
            {!loading &&
              !error &&
              totalPages > 1 && (
                <div className="d-flex align-items-center justify-content-center mt-5">
                  <Pagination
                    count={totalPages}
                    page={Math.min(
                      currentPage,
                      totalPages
                    )}
                    onChange={(event, page) =>
                      setCurrentPage(page)
                    }
                    color="primary"
                    size="large"
                  />
                </div>
              )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Listing;