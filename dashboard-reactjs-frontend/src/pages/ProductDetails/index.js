import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useParams, Link, useNavigate } from "react-router-dom";

import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  MdBrandingWatermark,
  MdReplyAll,
  MdDelete,
} from "react-icons/md";

import { BiSolidCategory } from "react-icons/bi";

import UserAvatarImgComponent from "../../components/userAvatarImg";

// =====================================================
// API CONFIGURATION
// =====================================================

const API_URL = "http://localhost:4000/api";

const FALLBACK_IMAGE =
  "https://via.placeholder.com/600x600?text=No+Image";

const FALLBACK_AVATAR =
  "https://via.placeholder.com/100?text=User";

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
// EMPTY RATING DISTRIBUTION
// =====================================================

const EMPTY_DISTRIBUTION = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
};

// =====================================================
// PRODUCT DETAILS COMPONENT
// =====================================================

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const productSliderBig = useRef(null);
  const productSliderSml = useRef(null);

  const [product, setProduct] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const [ratingDistribution, setRatingDistribution] =
    useState(EMPTY_DISTRIBUTION);

  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const [error, setError] = useState("");
  const [reviewsError, setReviewsError] = useState("");

  const [replyTexts, setReplyTexts] = useState({});
  const [replyLoading, setReplyLoading] = useState({});
  const [replyMessages, setReplyMessages] = useState({});

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
  // FETCH PRODUCT
  // =====================================================

  const fetchProduct = useCallback(async () => {
    if (!id) {
      setError("No product selected.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/products/${id}`
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch product details"
        );
      }

      const productData =
        data.product || data.data || data;

      if (!productData || !productData._id) {
        throw new Error("Invalid product data received");
      }

      setProduct(productData);
    } catch (fetchError) {
      console.error("Fetch product error:", fetchError);

      setError(
        fetchError.message ||
          "Unable to load product details. Check the backend server."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  // =====================================================
  // FETCH REVIEWS
  // =====================================================

  const fetchReviews = useCallback(async () => {
    if (!id) {
      return;
    }

    try {
      setReviewsLoading(true);
      setReviewsError("");

      const response = await fetch(
        `${API_URL}/reviews/product/${id}`
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to fetch reviews"
        );
      }

      setReviews(
        Array.isArray(data.reviews)
          ? data.reviews
          : []
      );

      setAverageRating(
        Number(data.averageRating || 0)
      );

      setTotalReviews(
        Number(data.totalReviews || 0)
      );

      setRatingDistribution({
        1: Number(data.ratingDistribution?.[1] || 0),
        2: Number(data.ratingDistribution?.[2] || 0),
        3: Number(data.ratingDistribution?.[3] || 0),
        4: Number(data.ratingDistribution?.[4] || 0),
        5: Number(data.ratingDistribution?.[5] || 0),
      });
    } catch (fetchError) {
      console.error("Fetch reviews error:", fetchError);

      setReviewsError(
        fetchError.message || "Unable to load reviews."
      );
    } finally {
      setReviewsLoading(false);
    }
  }, [id]);

  // =====================================================
  // LOAD PRODUCT AND REVIEWS
  // =====================================================

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchProduct();
    fetchReviews();
  }, [fetchProduct, fetchReviews]);

  // =====================================================
  // SLIDER NAVIGATION
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
  // REPLY TEXT CHANGE
  // =====================================================

  const handleReplyTextChange = (reviewId, value) => {
    setReplyTexts((previous) => ({
      ...previous,
      [reviewId]: value,
    }));
  };

  // =====================================================
  // REPLY MESSAGE
  // =====================================================

  const setReplyMessage = (reviewId, type, text) => {
    setReplyMessages((previous) => ({
      ...previous,
      [reviewId]: {
        type,
        text,
      },
    }));
  };

  // =====================================================
  // SUBMIT ADMIN REPLY
  // =====================================================

  const handleReplySubmit = async (event, reviewId) => {
    event.preventDefault();

    const replyText = String(
      replyTexts[reviewId] || ""
    ).trim();

    if (replyText.length < 3) {
      setReplyMessage(
        reviewId,
        "error",
        "Reply must contain at least 3 characters."
      );

      return;
    }

    if (replyText.length > 1000) {
      setReplyMessage(
        reviewId,
        "error",
        "Reply cannot exceed 1000 characters."
      );

      return;
    }

    try {
      setReplyLoading((previous) => ({
        ...previous,
        [reviewId]: true,
      }));

      setReplyMessages((previous) => ({
        ...previous,
        [reviewId]: null,
      }));

      const response = await fetch(
        `${API_URL}/reviews/${reviewId}/reply`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminReply: replyText,
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to save admin reply"
        );
      }

      setReplyTexts((previous) => ({
        ...previous,
        [reviewId]: "",
      }));

      setReplyMessage(
        reviewId,
        "success",
        "Reply saved successfully."
      );

      await fetchReviews();
    } catch (replyError) {
      console.error(
        "Reply submission error:",
        replyError
      );

      setReplyMessage(
        reviewId,
        "error",
        replyError.message ||
          "Failed to save admin reply."
      );
    } finally {
      setReplyLoading((previous) => ({
        ...previous,
        [reviewId]: false,
      }));
    }
  };

  // =====================================================
  // DELETE ADMIN REPLY
  // =====================================================

  const handleDeleteReply = async (reviewId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this reply?"
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setReplyLoading((previous) => ({
        ...previous,
        [reviewId]: true,
      }));

      const response = await fetch(
        `${API_URL}/reviews/${reviewId}/reply`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to delete reply"
        );
      }

      setReplyMessage(
        reviewId,
        "success",
        "Reply deleted successfully."
      );

      await fetchReviews();
    } catch (deleteError) {
      console.error(
        "Delete reply error:",
        deleteError
      );

      setReplyMessage(
        reviewId,
        "error",
        deleteError.message ||
          "Failed to delete reply."
      );
    } finally {
      setReplyLoading((previous) => ({
        ...previous,
        [reviewId]: false,
      }));
    }
  };

  // =====================================================
  // RATING ANALYTICS
  // =====================================================

  const ratingRows = useMemo(() => {
    return [5, 4, 3, 2, 1].map((ratingValue) => {
      const count =
        ratingDistribution[ratingValue] || 0;

      const percentage =
        totalReviews > 0
          ? (count / totalReviews) * 100
          : 0;

      return {
        rating: ratingValue,
        count,
        percentage,
      };
    });
  }, [ratingDistribution, totalReviews]);

  // =====================================================
  // LOADING SCREEN
  // =====================================================

  if (loading) {
    return (
      <div className="card shadow border-0 p-4 mt-4">
        <div className="d-flex align-items-center gap-3">
          <CircularProgress size={25} />

          <h4 className="mb-0">
            Loading product details...
          </h4>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR SCREEN
  // =====================================================

  if (error) {
    return (
      <div className="card shadow border-0 p-4 mt-4">
        <Alert severity="error" className="mb-3">
          {error}
        </Alert>

        <Button
          variant="contained"
          onClick={() => navigate("/products")}
        >
          Go to Product List
        </Button>
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
          <Button variant="contained">
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
      ? String(product.brand?.name || "No Brand")
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
  // PRODUCT IMAGES
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

      {/* HEADER */}

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

      {/* PRODUCT DETAILS */}

      <div className="card productDetailsSEction">

        <div className="row">

          {/* PRODUCT GALLERY */}

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
                    key={`${image}-${index}`}
                  >
                    <img
                      src={image}
                      alt={`${productName} ${index + 1}`}
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
                    key={`${image}-thumbnail-${index}`}
                    onClick={() => goToSlide(index)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
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

          {/* PRODUCT INFORMATION */}

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
                      textDecoration: "line-through",
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
                    Math.max(averageRating, 0),
                    5
                  )}
                  precision={0.5}
                  readOnly
                />

                <span className="ms-2">
                  ({totalReviews} reviews)
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
                    :{" "}
                    {product.dateCreated
                      ? new Date(
                          product.dateCreated
                        ).toLocaleDateString("en-IN")
                      : "N/A"}
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* DESCRIPTION AND REVIEWS */}

        <div className="p-4">

          <h6 className="mt-4 mb-3">
            Product Description
          </h6>

          <p style={{ whiteSpace: "pre-line" }}>
            {productDescription}
          </p>

          {/* RATING ANALYTICS */}

          <h6 className="mt-4 mb-4">
            Rating Analytics
          </h6>

          <div className="ratingSection">

            {ratingRows.map((item) => (
              <div
                className="ratingrow d-flex align-items-center mb-3"
                key={item.rating}
              >
                <span
                  className="col1"
                  style={{ minWidth: "65px" }}
                >
                  {item.rating} star
                </span>

                <div className="col2 flex-grow-1 mx-3">
                  <div
                    className="progress"
                    style={{ height: "6px" }}
                  >
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: "#f5b400",
                      }}
                      aria-valuenow={item.percentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>

                <span
                  className="col3"
                  style={{ minWidth: "35px" }}
                >
                  {item.count}
                </span>
              </div>
            ))}

          </div>

          {/* CUSTOMER REVIEWS */}

          <h6 className="mt-5 mb-4">
            Customer Reviews
          </h6>

          {reviewsError && (
            <Alert severity="error" className="mb-3">
              {reviewsError}
            </Alert>
          )}

          {reviewsLoading ? (
            <div className="text-center p-4">
              <CircularProgress size={28} />

              <p className="mt-2 mb-0">
                Loading reviews...
              </p>
            </div>
          ) : reviews.length === 0 ? (

            <div className="reviewSecrion">
              <div className="reviewsrow">

                <div className="userInfo d-flex align-items-center">

                  <UserAvatarImgComponent
                    img={FALLBACK_AVATAR}
                    lg={true}
                  />

                  <div className="info ms-3">
                    <h6>No reviews yet</h6>

                    <span>
                      Be the first to review this product.
                    </span>
                  </div>

                </div>

              </div>
            </div>

          ) : (

            reviews.map((review) => {
              const reviewId = review._id;

              const customerName =
                review.user?.name ||
                review.user?.email ||
                "Customer";

              const existingReply =
                review.adminReply || "";

              const replyMessage =
                replyMessages[reviewId];

              const isReplyLoading =
                Boolean(replyLoading[reviewId]);

              return (
                <div
                  className="card border p-3 mb-4"
                  key={reviewId}
                >

                  <div className="d-flex align-items-start">

                    <UserAvatarImgComponent
                      img={FALLBACK_AVATAR}
                      lg={true}
                    />

                    <div className="ms-3 flex-grow-1">

                      <div className="d-flex justify-content-between align-items-center flex-wrap">

                        <h6 className="mb-1">
                          {customerName}
                        </h6>

                        <small className="text-muted">
                          {review.createdAt
                            ? new Date(
                                review.createdAt
                              ).toLocaleDateString("en-IN")
                            : ""}
                        </small>

                      </div>

                      <Rating
                        value={Number(
                          review.rating || 0
                        )}
                        readOnly
                        size="small"
                      />

                      <p className="mt-2 mb-2">
                        {review.reviewText}
                      </p>

                      {/* EXISTING ADMIN REPLY */}

                      {existingReply && (
                        <div
                          className="p-3 mt-3"
                          style={{
                            backgroundColor: "#f1f5ff",
                            borderLeft: "4px solid #1769e0",
                            borderRadius: "5px",
                          }}
                        >

                          <strong>
                            Admin Reply
                          </strong>

                          <p className="mb-1 mt-2">
                            {existingReply}
                          </p>

                          {review.repliedAt && (
                            <small className="text-muted">
                              Replied on{" "}
                              {new Date(
                                review.repliedAt
                              ).toLocaleDateString("en-IN")}
                            </small>
                          )}

                        </div>
                      )}

                      {/* REPLY MESSAGE */}

                      {replyMessage && (
                        <Alert
                          severity={replyMessage.type}
                          className="mt-3"
                        >
                          {replyMessage.text}
                        </Alert>
                      )}

                      {/* REPLY FORM */}

                      <form
                        className="mt-3"
                        onSubmit={(event) =>
                          handleReplySubmit(
                            event,
                            reviewId
                          )
                        }
                      >

                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder={
                            existingReply
                              ? "Update admin reply..."
                              : "Write admin reply..."
                          }
                          value={
                            replyTexts[reviewId] || ""
                          }
                          onChange={(event) =>
                            handleReplyTextChange(
                              reviewId,
                              event.target.value
                            )
                          }
                          maxLength={1000}
                          disabled={isReplyLoading}
                        />

                        <div className="d-flex gap-2 mt-3">

                          <Button
                            type="submit"
                            variant="contained"
                            disabled={isReplyLoading}
                            startIcon={<MdReplyAll />}
                          >
                            {isReplyLoading
                              ? "Saving..."
                              : existingReply
                              ? "Update Reply"
                              : "Drop Your Reply"}
                          </Button>

                          {existingReply && (
                            <Button
                              type="button"
                              variant="outlined"
                              color="error"
                              disabled={isReplyLoading}
                              startIcon={<MdDelete />}
                              onClick={() =>
                                handleDeleteReply(
                                  reviewId
                                )
                              }
                            >
                              Delete
                            </Button>
                          )}

                        </div>
                      </form>

                    </div>
                  </div>

                </div>
              );
            })

          )}

        </div>
      </div>

    </div>
  );
};

export default ProductDetails;