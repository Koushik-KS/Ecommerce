
import React, { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  MdBrandingWatermark,
  MdReplyAll,
} from "react-icons/md";

import { BiSolidCategory } from "react-icons/bi";

import UserAvatarImgComponent from "../../components/userAvatarImg";

// =====================================================
// API URL
// =====================================================

const API_URL = "http://localhost:4000/api/products";

const FALLBACK_IMAGE =
  "https://via.placeholder.com/600x600?text=No+Image";

// =====================================================
// BREADCRUMB STYLE
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
// PRODUCT DETAILS COMPONENT
// =====================================================

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const productSliderBig = useRef(null);
  const productSliderSml = useRef(null);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // SLIDER OPTIONS
  // =====================================================

  const productSliderOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const productSliderSmlOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };

  // =====================================================
  // FETCH SINGLE PRODUCT
  // =====================================================

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError(
          "No product selected. Please go to Product List and click the Eye button."
        );

        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/${id}`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch product details"
          );
        }

        const data = await response.json();

        const productData =
          data.product || data.data || data;

        if (!productData || !productData._id) {
          throw new Error(
            "Invalid product data received"
          );
        }

        setProduct(productData);
      } catch (fetchError) {
        console.error(
          "Fetch product details error:",
          fetchError
        );

        setError(
          "Unable to load product details. Please check the backend server and product ID."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // =====================================================
  // GO TO SLIDE
  // =====================================================

  const goToSlide = (index) => {
    if (productSliderBig.current) {
      productSliderBig.current.slickGoTo(index);
    }

    if (productSliderSml.current) {
      productSliderSml.current.slickGoTo(index);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="card shadow border-0 p-4 mt-4">
        <h4>Loading product details...</h4>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="card shadow border-0 p-4 mt-4">
        <div className="alert alert-warning mb-3">
          {error}
        </div>

        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/products")}
          >
            Go to Product List
          </Button>
        </div>
      </div>
    );
  }

  // =====================================================
  // PRODUCT NOT FOUND
  // =====================================================

  if (!product) {
    return (
      <div className="card shadow border-0 p-4 mt-4">
        <h4>Product not found</h4>

        <Link to="/products">
          <Button
            variant="contained"
            color="primary"
          >
            Go to Product List
          </Button>
        </Link>
      </div>
    );
  }

  // =====================================================
  // PRODUCT DATA
  // =====================================================

  const productName = String(
    product.name || "Unnamed Product"
  );

  const productDescription = String(
    product.description || "No description available."
  );

  const brandName =
    typeof product.brand === "object"
      ? String(
          product.brand?.name || "No Brand"
        )
      : String(product.brand || "No Brand");

  const categoryName =
    typeof product.category === "object"
      ? String(
          product.category?.name || "No Category"
        )
      : String(
          product.category || "No Category"
        );

  const regularPrice = Number(
    product.regularPrice || 0
  );

  const sellingPrice = Number(
    product.price || 0
  );

  const stock = Number(
    product.countInStock || 0
  );

  const rating = Number(
    product.rating || 0
  );

  const numReviews = Number(
    product.numReviews || 0
  );

  const discount =
    regularPrice > 0 &&
    sellingPrice < regularPrice
      ? Math.round(
          ((regularPrice - sellingPrice) /
            regularPrice) *
            100
        )
      : 0;

  // =====================================================
  // NORMALIZE PRODUCT IMAGES
  // =====================================================

  const productImages = Array.isArray(
    product.images
  )
    ? product.images
        .map((image) => {
          if (typeof image === "string") {
            return image;
          }

          if (
            typeof image === "object" &&
            image !== null
          ) {
            return (
              image.url ||
              image.secure_url ||
              image.src ||
              image.image ||
              ""
            );
          }

          return "";
        })
        .filter(Boolean)
    : [];

  const images =
    productImages.length > 0
      ? productImages
      : [FALLBACK_IMAGE];

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="right-content">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="card header-row">
        <h5 className="title">
          Product View
        </h5>

        <div className="breadcrumb-wrapper">
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component={Link}
              to="/dashboard"
              label="Dashboard"
              icon={
                <HomeIcon fontSize="small" />
              }
            />

            <StyledBreadcrumb
              component={Link}
              to="/products"
              label="Products"
            />

            <StyledBreadcrumb
              label="Product View"
            />
          </Breadcrumbs>
        </div>
      </div>

      {/* =====================================================
          PRODUCT DETAILS CARD
      ===================================================== */}

      <div className="card productDetailsSEction">
        <div className="row">
          {/* =====================================================
              LEFT SIDE - PRODUCT GALLERY
          ===================================================== */}

          <div className="col-md-5">
            <div className="SliderWrapper pt-3 pb-3 ps-4 pe-4">
              <h6 className="mb-4">
                Product Gallery
              </h6>

              {/* BIG SLIDER */}

              <Slider
                {...productSliderOptions}
                ref={productSliderBig}
                className="sliderBig mb-2"
              >
                {images.map((image, index) => (
                  <div
                    className="item"
                    key={index}
                  >
                    <img
                      src={image}
                      alt={`${productName} ${
                        index + 1
                      }`}
                      className="w-100"
                      style={{
                        height: "380px",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                      onError={(event) => {
                        event.currentTarget.src =
                          FALLBACK_IMAGE;
                      }}
                    />
                  </div>
                ))}
              </Slider>

              {/* SMALL SLIDER */}

              <Slider
                {...productSliderSmlOptions}
                ref={productSliderSml}
                className="sliderSml"
              >
                {images.map((image, index) => (
                  <div
                    className="item px-1"
                    key={index}
                    onClick={() =>
                      goToSlide(index)
                    }
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${
                        index + 1
                      }`}
                      className="w-100"
                      style={{
                        height: "85px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                      onError={(event) => {
                        event.currentTarget.src =
                          FALLBACK_IMAGE;
                      }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* =====================================================
              RIGHT SIDE - PRODUCT INFORMATION
          ===================================================== */}

          <div className="col-md-7">
            <div className="pt-3 pb-3 ps-4 pe-4">
              <h6 className="mb-4">
                Product Details
              </h6>

              <h4>{productName}</h4>

              {/* PRICE */}

              <div className="mt-3 mb-3">
                {regularPrice > sellingPrice && (
                  <span
                    style={{
                      textDecoration:
                        "line-through",
                      color: "#777",
                      fontSize: "18px",
                      marginRight: "15px",
                    }}
                  >
                    ₹
                    {regularPrice.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                )}

                <span
                  className="text-danger"
                  style={{
                    fontWeight: "bold",
                    fontSize: "24px",
                  }}
                >
                  ₹
                  {sellingPrice.toLocaleString(
                    "en-IN"
                  )}
                </span>

                {discount > 0 && (
                  <span
                    className="badge bg-success ms-3"
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    {discount}% OFF
                  </span>
                )}
              </div>

              {/* RATING */}

              <div className="mb-3">
                <Rating
                  value={Math.min(
                    Math.max(rating, 0),
                    5
                  )}
                  precision={0.5}
                  readOnly
                />

                <span className="ms-2">
                  ({numReviews} reviews)
                </span>
              </div>

              <hr />

              {/* PRODUCT INFORMATION */}

              <div className="productInfo mt-3">
                {/* BRAND */}

                <div className="row mb-3">
                  <div className="col-sm-4 d-flex align-items-center">
                    <span className="icon me-2">
                      <MdBrandingWatermark />
                    </span>

                    <span className="name">
                      Brand
                    </span>
                  </div>

                  <div className="col-sm-8">
                    : {brandName}
                  </div>
                </div>

                {/* CATEGORY */}

                <div className="row mb-3">
                  <div className="col-sm-4 d-flex align-items-center">
                    <span className="icon me-2">
                      <BiSolidCategory />
                    </span>

                    <span className="name">
                      Category
                    </span>
                  </div>

                  <div className="col-sm-8">
                    : {categoryName}
                  </div>
                </div>

                {/* STOCK */}

                <div className="row mb-3">
                  <div className="col-sm-4 d-flex align-items-center">
                    <span className="icon me-2">
                      <BiSolidCategory />
                    </span>

                    <span className="name">
                      Stock
                    </span>
                  </div>

                  <div className="col-sm-8">
                    :
                    <span
                      className={`badge ms-2 ${
                        stock > 0
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {stock > 0
                        ? `${stock} Available`
                        : "Out of Stock"}
                    </span>
                  </div>
                </div>

                {/* PRODUCT ID */}

                <div className="row mb-3">
                  <div className="col-sm-4 d-flex align-items-center">
                    <span className="icon me-2">
                      <BiSolidCategory />
                    </span>

                    <span className="name">
                      Product ID
                    </span>
                  </div>

                  <div className="col-sm-8">
                    : {String(product._id || "N/A")}
                  </div>
                </div>

                {/* PUBLISHED DATE */}

                <div className="row mb-3">
                  <div className="col-sm-4 d-flex align-items-center">
                    <span className="icon me-2">
                      <BiSolidCategory />
                    </span>

                    <span className="name">
                      Published
                    </span>
                  </div>

                  <div className="col-sm-8">
                    :
                    {product.dateCreated
                      ? new Date(
                          product.dateCreated
                        ).toLocaleDateString(
                          "en-IN"
                        )
                      : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            PRODUCT DESCRIPTION
        ===================================================== */}

        <div className="p-4">
          <h6 className="mt-4 mb-3">
            Product Description
          </h6>

          <p
            style={{
              whiteSpace: "pre-line",
            }}
          >
            {productDescription}
          </p>

          {/* =====================================================
              RATING ANALYTICS
          ===================================================== */}

          <h6 className="mt-4 mb-4">
            Rating Analytics
          </h6>

          <div className="ratingSection">
            {[
              {
                label: "5 star",
                required: 5,
                width: "100%",
              },
              {
                label: "4 star",
                required: 4,
                width: "80%",
              },
              {
                label: "3 star",
                required: 3,
                width: "60%",
              },
              {
                label: "2 star",
                required: 2,
                width: "40%",
              },
              {
                label: "1 star",
                required: 1,
                width: "20%",
              },
            ].map((item) => (
              <div
                className="ratingrow d-flex align-items-center mb-2"
                key={item.label}
              >
                <span className="col1">
                  {item.label}
                </span>

                <div className="col2 flex-grow-1 mx-3">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{
                        width:
                          rating >= item.required
                            ? item.width
                            : "0%",
                      }}
                    />
                  </div>
                </div>

                <span className="col3">
                  -
                </span>
              </div>
            ))}
          </div>

          {/* =====================================================
              CUSTOMER REVIEWS
          ===================================================== */}

          <h6 className="mt-4 mb-4">
            Customer Reviews
          </h6>

          <div className="reviewSecrion">
            <div className="reviewsrow">
              <div className="row">
                <div className="col-sm-7 d-flex">
                  <div className="d-flex flex-column">
                    <div className="userInfo d-flex align-items-center mb-3">
                      <UserAvatarImgComponent
                        img="https://via.placeholder.com/100?text=User"
                        lg={true}
                      />

                      <div className="info ms-2">
                        <h6>
                          No reviews yet
                        </h6>

                        <span>
                          Be the first to review
                          this product.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <br />

          {/* =====================================================
              REVIEW REPLY FORM
          ===================================================== */}

          <h6 className="mt-4 mb-4">
            Review Reply Form
          </h6>

          <form
            className="reviewForm"
            onSubmit={(event) =>
              event.preventDefault()
            }
          >
            <textarea
              className="form-control"
              placeholder="Write here..."
              rows="4"
            />

            <Button
              type="submit"
              className="btn-blue btn-big btn-lg w-100 mt-4"
            >
              <MdReplyAll />
              &nbsp; Drop your replies
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;