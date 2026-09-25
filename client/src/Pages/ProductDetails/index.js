
import ProductZoom from "../../Components/ProductZoom";
import Rating from "@mui/material/Rating";
import QuantityBox from "../../Components/QuantityBox";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";

import {
  FaShoppingCart,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";

import { MdOutlineCompareArrows } from "react-icons/md";

import {
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import RelatedProducts from "./RelatedProducts";
import { MyContext } from "../../App";

// =====================================================
// API URLS
// =====================================================

const PRODUCT_API_URL =
  "http://localhost:4000/api/products";

const REVIEW_API_URL =
  "http://localhost:4000/api/reviews";

// =====================================================
// CUSTOMER INITIAL HELPER
// =====================================================

const getUserInitial = (name) => {
  if (!name || typeof name !== "string") {
    return "C";
  }

  return (
    name.trim().charAt(0).toUpperCase() || "C"
  );
};

// =====================================================
// PRODUCT DETAILS COMPONENT
// =====================================================

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // =====================================================
  // CONTEXT
  // =====================================================

  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useContext(MyContext);

  // =====================================================
  // PRODUCT AND REVIEW STATES
  // =====================================================

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  // =====================================================
  // UI STATES
  // =====================================================

  const [activeSize, setActiveSize] = useState(null);
  const [activeTabs, setActiveTabs] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // =====================================================
  // REVIEW FORM STATES
  // =====================================================

  const [reviewMessage, setReviewMessage] = useState("");
  const [rating, setRating] = useState(0);

  // =====================================================
  // LOADING STATES
  // =====================================================

  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);

  // =====================================================
  // ERROR STATES
  // =====================================================

  const [error, setError] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");

  // =====================================================
  // FETCH PRODUCT
  // =====================================================

  const fetchProduct = useCallback(async () => {
    if (!id) {
      setError("Product ID is missing.");
      setLoadingProduct(false);
      return;
    }

    try {
      setLoadingProduct(true);
      setError("");

      const response = await fetch(
        `${PRODUCT_API_URL}/${id}`
      );

      const responseText = await response.text();

      console.log(
        "Product API status:",
        response.status
      );

      console.log(
        "Product API response:",
        responseText
      );

      let data = {};

      try {
        data = responseText
          ? JSON.parse(responseText)
          : {};
      } catch (parseError) {
        throw new Error(
          "Invalid response from product server."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch product."
        );
      }

      const productData =
        data.product ||
        data.data ||
        data;

      if (
        !productData ||
        (!productData._id && !productData.id)
      ) {
        throw new Error(
          "Invalid product data received."
        );
      }

      setProduct(productData);
    } catch (fetchError) {
      console.error(
        "Fetch product error:",
        fetchError
      );

      setError(
        fetchError.message ||
          "Failed to load product."
      );
    } finally {
      setLoadingProduct(false);
    }
  }, [id]);

  // =====================================================
  // FETCH PRODUCT REVIEWS
  // =====================================================

  const fetchReviews = useCallback(async () => {
    if (!id) {
      return;
    }

    try {
      setLoadingReviews(true);
      setReviewError("");

      const response = await fetch(
        `${REVIEW_API_URL}/product/${id}`
      );

      const responseText = await response.text();

      console.log(
        "Reviews API status:",
        response.status
      );

      console.log(
        "Reviews API response:",
        responseText
      );

      let data = {};

      try {
        data = responseText
          ? JSON.parse(responseText)
          : {};
      } catch (parseError) {
        throw new Error(
          "Invalid response from reviews server."
        );
      }

      if (
        !response.ok ||
        data.success === false
      ) {
        throw new Error(
          data.message ||
            "Failed to fetch reviews."
        );
      }

      const reviewList =
        data.reviews ||
        data.data ||
        [];

      setReviews(
        Array.isArray(reviewList)
          ? reviewList
          : []
      );

      setTotalReviews(
        Number(
          data.totalReviews ??
            data.total ??
            reviewList.length
        )
      );

      setAverageRating(
        Number(
          data.averageRating ??
            data.avgRating ??
            0
        )
      );
    } catch (fetchError) {
      console.error(
        "Fetch reviews error:",
        fetchError
      );

      setReviewError(
        fetchError.message ||
          "Failed to load reviews."
      );
    } finally {
      setLoadingReviews(false);
    }
  }, [id]);

  // =====================================================
  // LOAD PRODUCT AND REVIEWS
  // =====================================================

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [fetchProduct, fetchReviews]);

  // =====================================================
  // LOADING STATE
  // =====================================================

  if (loadingProduct) {
    return (
      <section className="section">
        <div className="container">
          <h3>Loading product...</h3>
        </div>
      </section>
    );
  }

  // =====================================================
  // ERROR STATE
  // =====================================================

  if (error || !product) {
    return (
      <section className="section">
        <div className="container">
          <h3>
            {error || "Product not found."}
          </h3>

          <Button
            variant="contained"
            onClick={() => navigate("/")}
            className="mt-3"
          >
            Go to Home
          </Button>
        </div>
      </section>
    );
  }

  // =====================================================
  // PRODUCT DATA
  // =====================================================

  const productName =
    product.name || "Product";

  const productDescription =
    product.description ||
    "No description available.";

  const productBrand =
    typeof product.brand === "object"
      ? product.brand?.name ||
        "Not specified"
      : product.brand ||
        "Not specified";

  const productPrice = Number(
    product.price ?? 0
  );

  const productRegularPrice = Number(
    product.regularPrice ?? productPrice
  );

  const productRating = Number(
    product.rating || 0
  );

  const productStock = Number(
    product.countInStock || 0
  );

  const isInStock = productStock > 0;

  const displayRating =
    totalReviews > 0
      ? averageRating
      : productRating;

  const categoryName =
    typeof product.category === "object"
      ? product.category?.name ||
        "Not specified"
      : product.category ||
        "Not specified";

  // =====================================================
  // WISHLIST STATUS
  // =====================================================

  const productId = String(
    product._id || product.id || ""
  );

  const productInWishlist = isInWishlist(
    productId
  );

  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = () => {
    if (!product) {
      alert(
        "Product information is unavailable."
      );

      return;
    }

    if (!isInStock) {
      alert(
        "This product is currently out of stock."
      );

      return;
    }

    if (
      selectedQuantity < 1 ||
      selectedQuantity > productStock
    ) {
      alert("Please select a valid quantity.");
      return;
    }

    addToCart(
      product,
      selectedQuantity
    );

    alert(
      `${productName} added to cart successfully!`
    );
  };

  // =====================================================
  // BUY NOW
  // =====================================================

  const handleBuyNow = () => {
    if (!product) {
      alert(
        "Product information is unavailable."
      );

      return;
    }

    if (!isInStock) {
      alert(
        "This product is currently out of stock."
      );

      return;
    }

    if (
      selectedQuantity < 1 ||
      selectedQuantity > productStock
    ) {
      alert("Please select a valid quantity.");
      return;
    }

    addToCart(
      product,
      selectedQuantity
    );

    navigate("/checkout");
  };

  // =====================================================
  // WISHLIST TOGGLE
  // =====================================================

  const handleWishlistToggle = (event) => {
    event?.stopPropagation();

    if (!product) {
      console.error(
        "Product is not available."
      );

      return;
    }

    const currentProductId =
      product._id || product.id;

    if (!currentProductId) {
      console.error(
        "Product ID is missing:",
        product
      );

      return;
    }

    console.log(
      "Heart button clicked. Product ID:",
      currentProductId
    );

    toggleWishlist(product);
  };

  // =====================================================
  // SUBMIT REVIEW
  // =====================================================

  const handleSubmitReview = async (event) => {
    event.preventDefault();

    setReviewError("");
    setReviewSuccess("");

    const token = localStorage.getItem("token");

    if (!token) {
      setReviewError(
        "Please log in to submit a review."
      );

      navigate("/signIn");
      return;
    }

    const trimmedReviewMessage =
      reviewMessage.trim();

    if (!trimmedReviewMessage) {
      setReviewError(
        "Please write a review."
      );

      return;
    }

    if (trimmedReviewMessage.length < 3) {
      setReviewError(
        "Review must contain at least 3 characters."
      );

      return;
    }

    if (trimmedReviewMessage.length > 1000) {
      setReviewError(
        "Review cannot exceed 1000 characters."
      );

      return;
    }

    if (
      !Number.isInteger(Number(rating)) ||
      Number(rating) < 1 ||
      Number(rating) > 5
    ) {
      setReviewError(
        "Please select a rating between 1 and 5."
      );

      return;
    }

    if (!id) {
      setReviewError(
        "Product ID is missing."
      );

      return;
    }

    try {
      setSubmittingReview(true);

      const requestBody = {
        productId: id,
        rating: Number(rating),
        reviewText: trimmedReviewMessage,
      };

      const response = await fetch(
        REVIEW_API_URL,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(requestBody),
        }
      );

      const responseText = await response.text();

      let data = {};

      try {
        data = responseText
          ? JSON.parse(responseText)
          : {};
      } catch (parseError) {
        throw new Error(
          "Server returned an invalid response."
        );
      }

      if (
        !response.ok ||
        data.success === false
      ) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          setReviewError(
            data.message ||
              "Your session has expired. Please log in again."
          );

          return;
        }

        throw new Error(
          data.message ||
            `Review submission failed. Status: ${response.status}`
        );
      }

      setReviewSuccess(
        data.message ||
          "Review submitted successfully!"
      );

      setReviewMessage("");
      setRating(0);

      if (
        data.averageRating !== undefined
      ) {
        setAverageRating(
          Number(data.averageRating)
        );
      }

      if (
        data.totalReviews !== undefined
      ) {
        setTotalReviews(
          Number(data.totalReviews)
        );
      }

      setProduct((previousProduct) => {
        if (!previousProduct) {
          return previousProduct;
        }

        return {
          ...previousProduct,

          rating:
            data.averageRating ??
            previousProduct.rating,

          numReviews:
            data.totalReviews ??
            previousProduct.numReviews,
        };
      });

      await fetchReviews();
    } catch (submitError) {
      console.error(
        "Submit review error:",
        submitError
      );

      setReviewError(
        submitError.message ||
          "Failed to submit review."
      );
    } finally {
      setSubmittingReview(false);
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section className="productDetails section">
      <div className="container">

        {/* PRODUCT SECTION */}

        <div className="row">

          {/* PRODUCT IMAGES */}

          <div className="col-md-4 pl-5">
            <ProductZoom
              product={product}
            />
          </div>

          {/* PRODUCT INFORMATION */}

          <div className="col-md-7 pl-5 pr-5">

            <h2 className="hd text-capitalize">
              {productName}
            </h2>

            <ul className="list list-inline d-flex align-items-center">

              <li className="list-inline-item">
                <div className="d-flex align-items-center">
                  <span className="text-light mr-2">
                    Brand:
                  </span>

                  <span>
                    {productBrand}
                  </span>
                </div>
              </li>

              <li className="list-inline-item">
                <div className="d-flex align-items-center">

                  <Rating
                    name="product-rating"
                    value={Math.min(
                      Math.max(displayRating, 0),
                      5
                    )}
                    precision={0.5}
                    readOnly
                    size="small"
                  />

                  <span className="text-light cursor ml-2">
                    {totalReviews} Reviews
                  </span>

                </div>
              </li>

            </ul>

            {/* PRICE */}

            <div className="d-flex info mb-3">

              {productRegularPrice > productPrice && (
                <span className="oldPrice">
                  ₹
                  {productRegularPrice.toLocaleString(
                    "en-IN"
                  )}
                </span>
              )}

              <span className="netPrice text-danger ml-3">
                ₹
                {productPrice.toLocaleString(
                  "en-IN"
                )}
              </span>

            </div>

            {/* STOCK */}

            <span
              className={`badge ${
                isInStock
                  ? "badge-success"
                  : "badge-danger"
              }`}
            >
              {isInStock
                ? `IN STOCK (${productStock})`
                : "OUT OF STOCK"}
            </span>

            {/* DESCRIPTION */}

            <p className="mt-3">
              {productDescription}
            </p>

            {/* SIZE */}

            <div className="productSize d-flex align-items-center">

              <span>Size/Weight:</span>

              <ul className="list list-inline mb-0 pl-4">

                {[
                  "50g",
                  "100g",
                  "200g",
                  "300g",
                  "500g",
                ].map((size, index) => (
                  <li
                    className="list-inline-item"
                    key={size}
                  >
                    <button
                      type="button"
                      className={`tag ${
                        activeSize === index
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setActiveSize(index)
                      }
                    >
                      {size}
                    </button>
                  </li>
                ))}

              </ul>

            </div>

            {/* CART CONTROLS */}

            <div className="d-flex align-items-center mt-3 flex-wrap">

              {/* QUANTITY */}

              <QuantityBox
                onChange={setSelectedQuantity}
                maxQuantity={productStock}
              />

              {/* ADD TO CART */}

              <Button
                type="button"
                className="btn-blue btn-lg btn-big btn-round ml-3"
                disabled={!isInStock}
                onClick={handleAddToCart}
              >
                <FaShoppingCart />
                &nbsp; Add to Cart
              </Button>

              {/* BUY NOW */}

              <Button
                type="button"
                className="btn-success btn-lg btn-big btn-round ml-3"
                disabled={!isInStock}
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>

              {/* WISHLIST */}

              <Tooltip
                title={
                  productInWishlist
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"
                }
              >
                <Button
                  type="button"
                  className={`btn-blue btn-lg btn-circle ml-3 wishlist-detail-button ${
                    productInWishlist
                      ? "active"
                      : ""
                  }`}
                  onClick={handleWishlistToggle}
                >
                  {productInWishlist ? (
                    <FaHeart
                      size={20}
                      className="wishlist-heart-icon"
                    />
                  ) : (
                    <FaRegHeart
                      size={20}
                      className="wishlist-heart-icon"
                    />
                  )}
                </Button>
              </Tooltip>

              {/* COMPARE */}

              <Tooltip title="Add to Compare">
                <Button
                  type="button"
                  className="btn-blue btn-lg btn-circle ml-2"
                >
                  <MdOutlineCompareArrows />
                </Button>
              </Tooltip>

            </div>

          </div>
        </div>

        {/* TABS */}

        <div className="card mt-5 p-5 detailsPageTabs">

          <div className="customTabs">

            <ul className="list list-inline">

              <li className="list-inline-item">
                <Button
                  className={
                    activeTabs === 0
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTabs(0)
                  }
                >
                  Description
                </Button>
              </li>

              <li className="list-inline-item">
                <Button
                  className={
                    activeTabs === 1
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTabs(1)
                  }
                >
                  Additional Info
                </Button>
              </li>

              <li className="list-inline-item">
                <Button
                  className={
                    activeTabs === 2
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTabs(2)
                  }
                >
                  Reviews
                </Button>
              </li>

            </ul>

            <br />

            {/* DESCRIPTION TAB */}

            {activeTabs === 0 && (
              <div className="tabContent">
                <p>
                  {productDescription}
                </p>
              </div>
            )}

            {/* ADDITIONAL INFORMATION TAB */}

            {activeTabs === 1 && (
              <div className="tabContent">

                <div className="table-responsive">

                  <table className="table table-bordered">
                    <tbody>

                      <tr>
                        <th>Brand</th>
                        <td>
                          {productBrand}
                        </td>
                      </tr>

                      <tr>
                        <th>Stock</th>
                        <td>
                          {productStock}
                        </td>
                      </tr>

                      <tr>
                        <th>Category</th>
                        <td>
                          {categoryName}
                        </td>
                      </tr>

                      <tr>
                        <th>Rating</th>
                        <td>
                          {displayRating.toFixed(1)} / 5
                        </td>
                      </tr>

                      <tr>
                        <th>Total Reviews</th>
                        <td>
                          {totalReviews}
                        </td>
                      </tr>

                    </tbody>
                  </table>

                </div>
              </div>
            )}

            {/* REVIEWS TAB */}

            {activeTabs === 2 && (
              <div className="tabContent">

                <div className="row">

                  <div className="col-md-8">

                    {/* REVIEW SUMMARY */}

                    <h3>Customer Reviews</h3>

                    <div className="d-flex align-items-center mb-3">

                      <Rating
                        value={Math.min(
                          Math.max(displayRating, 0),
                          5
                        )}
                        precision={0.5}
                        readOnly
                      />

                      <span className="ml-2">
                        {displayRating.toFixed(1)} / 5
                      </span>

                      <span className="ml-3 text-muted">
                        ({totalReviews} reviews)
                      </span>

                    </div>

                    {/* ERROR MESSAGE */}

                    {reviewError && (
                      <div className="alert alert-danger">
                        {reviewError}
                      </div>
                    )}

                    {/* SUCCESS MESSAGE */}

                    {reviewSuccess && (
                      <div className="alert alert-success">
                        {reviewSuccess}
                      </div>
                    )}

                    {/* REVIEWS LIST */}

                    {loadingReviews ? (
                      <div className="text-center py-4">
                        <p>
                          Loading reviews...
                        </p>
                      </div>
                    ) : reviews.length === 0 ? (
                      <div className="alert alert-light">
                        No reviews yet. Be the first to review!
                      </div>
                    ) : (
                      reviews.map((review) => {

                        const reviewer =
                          review.user?.name ||
                          review.user?.username ||
                          review.user?.email ||
                          review.userName ||
                          "Customer";

                        const reviewText =
                          review.reviewText ||
                          review.comment ||
                          review.review ||
                          "";

                        const reviewerInitial =
                          getUserInitial(reviewer);

                        return (
                          <div
                            className="card p-4 mb-3 reviewsCard"
                            key={
                              review._id ||
                              review.id
                            }
                          >

                            <div className="d-flex align-items-center flex-wrap">

                              {/* CUSTOMER AVATAR */}

                              <Avatar
                                sx={{
                                  width: 42,
                                  height: 42,
                                  marginRight: "12px",
                                  backgroundColor: "#2874f0",
                                  color: "#ffffff",
                                  fontWeight: "bold",
                                }}
                              >
                                {reviewerInitial}
                              </Avatar>

                              {/* CUSTOMER NAME */}

                              <div>
                                <h5 className="text-g mb-0">
                                  {reviewer}
                                </h5>

                                <small className="text-muted">
                                  {review.createdAt
                                    ? new Date(
                                        review.createdAt
                                      ).toLocaleDateString(
                                        "en-IN"
                                      )
                                    : ""}
                                </small>
                              </div>

                              <div className="ml-auto">

                                <Rating
                                  value={Math.min(
                                    Math.max(
                                      Number(
                                        review.rating || 0
                                      ),
                                      0
                                    ),
                                    5
                                  )}
                                  precision={0.5}
                                  readOnly
                                />

                              </div>

                            </div>

                            <p className="mt-3 mb-0">
                              {reviewText}
                            </p>

                            {/* ADMIN REPLY */}

                            {review.adminReply && (
                              <div className="alert alert-info mt-3 mb-0">

                                <strong>
                                  Admin Reply:
                                </strong>

                                <p className="mb-0 mt-1">
                                  {review.adminReply}
                                </p>

                                {review.repliedAt && (
                                  <small className="text-muted">
                                    Replied on:{" "}
                                    {new Date(
                                      review.repliedAt
                                    ).toLocaleDateString(
                                      "en-IN"
                                    )}
                                  </small>
                                )}

                              </div>
                            )}

                          </div>
                        );
                      })
                    )}

                    {/* REVIEW FORM */}

                    <form
                      className="reviewForm mt-4"
                      onSubmit={handleSubmitReview}
                    >

                      <h4>Add a Review</h4>

                      <p className="text-muted">
                        You must be logged in to submit a review.
                      </p>

                      {/* REVIEW TEXT */}

                      <div className="form-group">

                        <label>
                          Your Review
                        </label>

                        <textarea
                          className="form-control"
                          placeholder="Write your review..."
                          value={reviewMessage}
                          onChange={(event) =>
                            setReviewMessage(
                              event.target.value
                            )
                          }
                          rows={4}
                          maxLength={1000}
                          required
                        />

                        <small className="text-muted">
                          {reviewMessage.length}/1000 characters
                        </small>

                      </div>

                      {/* RATING */}

                      <div className="form-group mt-3">

                        <label>
                          Select Rating
                        </label>

                        <br />

                        <Rating
                          name="review-rating"
                          value={rating}
                          precision={1}
                          onChange={(event, newValue) =>
                            setRating(newValue || 0)
                          }
                        />

                      </div>

                      {/* SUBMIT BUTTON */}

                      <div className="form-group mt-3">

                        <Button
                          type="submit"
                          className="btn-blue btn-lg btn-big btn-round"
                          disabled={submittingReview}
                        >
                          {submittingReview
                            ? "Submitting..."
                            : "Submit Review"}
                        </Button>

                      </div>

                    </form>

                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        <br />

        {/* RELATED PRODUCTS */}

        <RelatedProducts
          title="RELATED PRODUCTS"
        />

        <RelatedProducts
          title="RECENTLY VIEWED PRODUCTS"
        />

      </div>
    </section>
  );
};

export default ProductDetails;