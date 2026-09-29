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

// ==========================================
// BACKEND API BASE URL
// ==========================================

const API_BASE_URL =
  "https://ecommerce-hsm4.onrender.com";

// ==========================================
// LISTING COMPONENT
// ==========================================

const Listing = () => {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [productView, setProductView] = useState("four");
  const [productsPerPage, setProductsPerPage] = useState(9);

  const [anchorEl, setAnchorEl] = useState(null);
  const openDropdown = Boolean(anchorEl);

  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    minPrice: 100,
    maxPrice: 60000,
    categories: [],
    brands: [],
    inStock: false,
    onSale: false,
  });

  // ==========================================
  // GET CATEGORY AND PRODUCTS
  // ==========================================

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        setError("");
        setCurrentPage(1);

        // Get category details
        const categoryResponse = await axios.get(
          `${API_BASE_URL}/api/category/${id}`
        );

        setCategory(categoryResponse.data);

        // Get all products
        const productsResponse = await axios.get(
          `${API_BASE_URL}/api/products`
        );

        const allProducts = Array.isArray(
          productsResponse.data
        )
          ? productsResponse.data
          : [];

        // Filter products by category ID
        const filteredProducts = allProducts.filter(
          (product) => {
            const productCategory =
              product.category;

            const productCategoryId =
              typeof productCategory === "object" &&
              productCategory !== null
                ? productCategory?._id ||
                  productCategory?.id
                : productCategory;

            return (
              String(productCategoryId) ===
              String(id)
            );
          }
        );

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

  // ==========================================
  // RECEIVE SIDEBAR FILTERS
  // ==========================================

  const handleFilterChange = useCallback(
    (newFilters) => {
      setFilters(newFilters);
      setCurrentPage(1);
    },
    []
  );

  // ==========================================
  // DROPDOWN
  // ==========================================

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

  // ==========================================
  // CATEGORY NAME
  // ==========================================

  const categoryName = category?.name
    ? category.name.charAt(0).toUpperCase() +
      category.name.slice(1)
    : "Products";

  // ==========================================
  // GET PRODUCT PRICE
  // ==========================================

  const getProductPrice = (product) => {
    return Number(
      product.price ||
        product.newPrice ||
        product.salePrice ||
        0
    );
  };

  // ==========================================
  // GET PRODUCT BRAND
  // ==========================================

  const getProductBrand = (product) => {
    const brand = product.brand;

    if (
      typeof brand === "object" &&
      brand !== null
    ) {
      return String(
        brand.name ||
          brand._id ||
          ""
      );
    }

    return String(brand || "");
  };

  // ==========================================
  // GET PRODUCT CATEGORY ID
  // ==========================================

  const getProductCategoryId = (product) => {
    const productCategory =
      product.category;

    if (
      typeof productCategory === "object" &&
      productCategory !== null
    ) {
      return String(
        productCategory._id ||
          productCategory.id ||
          ""
      );
    }

    return String(productCategory || "");
  };

  // ==========================================
  // CHECK STOCK
  // ==========================================

  const checkProductInStock = (product) => {
    if (
      typeof product.inStock === "boolean"
    ) {
      return product.inStock;
    }

    if (
      typeof product.isAvailable === "boolean"
    ) {
      return product.isAvailable;
    }

    if (
      typeof product.stock === "number"
    ) {
      return product.stock > 0;
    }

    if (
      typeof product.countInStock === "number"
    ) {
      return product.countInStock > 0;
    }

    if (
      typeof product.quantity === "number"
    ) {
      return product.quantity > 0;
    }

    // If backend does not provide stock information,
    // do not hide products.
    return true;
  };

  // ==========================================
  // CHECK SALE
  // ==========================================

  const checkProductOnSale = (product) => {
    if (
      product.onSale === true ||
      product.isSale === true
    ) {
      return true;
    }

    if (
      Number(product.discount || 0) > 0
    ) {
      return true;
    }

    const currentPrice = Number(
      product.price ||
        product.newPrice ||
        0
    );

    const oldPrice = Number(
      product.oldPrice ||
        product.originalPrice ||
        0
    );

    return (
      oldPrice > currentPrice &&
      currentPrice > 0
    );
  };

  // ==========================================
  // APPLY ALL FILTERS
  // ==========================================

  const filteredProducts =
    products.filter((product) => {
      const productPrice =
        getProductPrice(product);

      const productBrand =
        getProductBrand(product);

      const productCategoryId =
        getProductCategoryId(product);

      // Price
      const matchesPrice =
        productPrice >= filters.minPrice &&
        productPrice <= filters.maxPrice;

      // Category
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(
          productCategoryId
        );

      // Brand
      const matchesBrand =
        filters.brands.length === 0 ||
        filters.brands.includes(
          productBrand
        );

      // Stock
      const matchesStock =
        !filters.inStock ||
        checkProductInStock(product);

      // Sale
      const matchesSale =
        !filters.onSale ||
        checkProductOnSale(product);

      return (
        matchesPrice &&
        matchesCategory &&
        matchesBrand &&
        matchesStock &&
        matchesSale
      );
    });

  // ==========================================
  // PAGINATION
  // ==========================================

  const totalPages = Math.ceil(
    filteredProducts.length /
      productsPerPage
  );

  const startIndex =
    (currentPage - 1) *
    productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      startIndex,
      startIndex + productsPerPage
    );

  // ==========================================
  // UI
  // ==========================================

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
            onFilterChange={
              handleFilterChange
            }
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

                {/* ONE COLUMN */}

                <Button
                  className={
                    productView === "one"
                      ? "act"
                      : ""
                  }
                  onClick={() =>
                    setProductView("one")
                  }
                >
                  <IoMdMenu />
                </Button>

                {/* THREE COLUMN */}

                <Button
                  className={
                    productView === "three"
                      ? "act"
                      : ""
                  }
                  onClick={() =>
                    setProductView("three")
                  }
                >
                  <CgMenuGridR />
                </Button>

                {/* FOUR COLUMN */}

                <Button
                  className={
                    productView === "four"
                      ? "act"
                      : ""
                  }
                  onClick={() =>
                    setProductView("four")
                  }
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
                          changeProductsPerPage(
                            count
                          )
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
                <h5>
                  Loading products...
                </h5>
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
                  No products found with
                  the selected filters.
                </h5>
              </div>
            ) : (
              <div className="productListing">

                {currentProducts.map(
                  (product) => (
                    <ProductItem
                      key={
                        product._id ||
                        product.id
                      }
                      product={product}
                      itemView={
                        productView
                      }
                    />
                  )
                )}

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
                    onChange={(
                      event,
                      page
                    ) =>
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