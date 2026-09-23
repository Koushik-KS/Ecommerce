
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

import { TfiFullscreen } from "react-icons/tfi";
import { CiHeart } from "react-icons/ci";

import { Navigation } from "swiper/modules";

import { useNavigate } from "react-router-dom";

const ProductItem = (props) => {
  const navigate = useNavigate();

  const product = props.product;

  // =========================
  // CHECK PRODUCT
  // =========================

  if (!product) {
    return null;
  }

  // =========================
  // PRODUCT INFORMATION
  // =========================

  const productId = product._id || product.id;

  const productName = product.name || "Product";

  const productBrand = product.brand || "No brand";

  const productDescription = product.description || "";

  // Selling price
  const productPrice = Number(product.price || 0);

  // Original / regular price
  const productRegularPrice = Number(
    product.regularPrice || 0
  );

  const productRating = Number(product.rating || 0);

  const productStock = Number(
    product.countInStock ?? 0
  );

  const productImages = Array.isArray(product.images)
    ? product.images.filter((image) => image)
    : [];

  const productImage =
    productImages.length > 0
      ? productImages[0]
      : "https://via.placeholder.com/500x500?text=No+Image";

  const categoryName =
    typeof product.category === "object"
      ? product.category?.name
      : product.category;

  // =========================
  // DISCOUNT CALCULATION
  // =========================

  const hasDiscount =
    productRegularPrice > productPrice &&
    productPrice > 0;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((productRegularPrice - productPrice) /
          productRegularPrice) *
          100
      )
    : 0;

  // =========================
  // OPEN PRODUCT DETAILS PAGE
  // =========================

  const viewProductDetails = () => {
    if (!productId) {
      console.error("Product ID is missing");
      return;
    }

    navigate(`/product/${productId}`);
  };

  // =========================
  // RENDER
  // =========================

  return (
    <div
      className={`productItem ${
        props.itemView || ""
      }`}
    >
      {/* =========================
          PRODUCT IMAGE
      ========================= */}

      <div className="imgWrapper">
        <Swiper
          slidesPerView={1}
          navigation={productImages.length > 1}
          modules={[Navigation]}
          className="mySwiper"
        >
          {productImages.length > 0 ? (
            productImages.map((image, index) => (
              <SwiperSlide
                key={`${productId}-${index}`}
              >
                <img
                  src={image}
                  alt={`${productName} ${index + 1}`}
                  className="w-100"
                  onClick={viewProductDetails}
                  style={{
                    cursor: "pointer",
                  }}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <img
                src={productImage}
                alt={productName}
                className="w-100"
                onClick={viewProductDetails}
                style={{
                  cursor: "pointer",
                }}
              />
            </SwiperSlide>
          )}
        </Swiper>

        {/* CATEGORY BADGE */}

        {categoryName && (
          <span className="badge badge-primary">
            {categoryName}
          </span>
        )}

        {/* ACTION BUTTONS */}

        <div className="actions">
          <Button
            onClick={viewProductDetails}
            aria-label="View product details"
          >
            <TfiFullscreen />
          </Button>

          <Button aria-label="Add to wishlist">
            <CiHeart />
          </Button>
        </div>
      </div>

      {/* =========================
          PRODUCT NAME
      ========================= */}

      <h4
        onClick={viewProductDetails}
        style={{
          cursor: "pointer",
        }}
      >
        {productName}
      </h4>

      {/* =========================
          BRAND
      ========================= */}

      <p className="mb-1 text-muted">
        {productBrand}
      </p>

      {/* =========================
          DESCRIPTION
      ========================= */}

      {productDescription && (
        <p className="mb-1">
          {productDescription}
        </p>
      )}

      {/* =========================
          STOCK
      ========================= */}

      {productStock > 0 ? (
        <span className="text-success d-block">
          In Stock
        </span>
      ) : (
        <span className="text-danger d-block">
          Out of Stock
        </span>
      )}

      {/* =========================
          RATING
      ========================= */}

      <Rating
        value={productRating}
        readOnly
        size="small"
        precision={0.5}
      />

      {/* =========================
          PRICE
      ========================= */}

      <div className="d-flex info align-items-center flex-wrap">
        {/* SELLING PRICE */}

        <span className="netPrice text-danger">
          ₹{productPrice.toLocaleString("en-IN")}
        </span>

        {/* REGULAR PRICE */}

        {hasDiscount && (
          <span
            className="oldPrice ml-2"
            style={{
              textDecoration: "line-through",
              color: "#888",
              fontSize: "14px",
              marginLeft: "8px",
            }}
          >
            ₹
            {productRegularPrice.toLocaleString("en-IN")}
          </span>
        )}

        {/* DISCOUNT PERCENTAGE */}

        {hasDiscount && (
          <span
            className="discount-badge"
            style={{
              color: "#198754",
              fontSize: "12px",
              fontWeight: "600",
              marginLeft: "8px",
            }}
          >
            {discountPercentage}% OFF
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductItem;