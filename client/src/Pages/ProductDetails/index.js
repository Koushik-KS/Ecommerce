
import ProductZoom from "../../Components/ProductZoom";
import Rating from "@mui/material/Rating";
import QuantityBox from "../../Components/QuantityBox";
import Button from "@mui/material/Button";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { MdOutlineCompareArrows } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedProducts from "./RelatedProducts";

const PRODUCT_API_URL = "http://localhost:4000/api/products";
const MESSAGE_API_URL = "http://localhost:4000/api/messages";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [activeSize, setActiveSize] = useState(null);
  const [activeTabs, setActiveTabs] = useState(0);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const [rating, setRating] = useState(0);

  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);

  const [error, setError] = useState("");

  // =====================================================
  // FETCH PRODUCT
  // =====================================================

  const fetchProduct = async () => {
    try {
      setLoadingProduct(true);
      setError("");

      const response = await fetch(`${PRODUCT_API_URL}/${id}`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch product.");
      }

      setProduct(data.data || data);
    } catch (error) {
      console.error("Fetch product error:", error);
      setError("Failed to load product.");
    } finally {
      setLoadingProduct(false);
    }
  };

  // =====================================================
  // FETCH PRODUCT REVIEWS
  // =====================================================

  const fetchReviews = async () => {
    try {
      setLoadingReviews(true);

      const response = await fetch(
        `${MESSAGE_API_URL}/product/${id}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch reviews.");
      }

      setReviews(data.data || []);
    } catch (error) {
      console.error("Fetch reviews error:", error);
    } finally {
      setLoadingReviews(false);
    }
  };

  // =====================================================
  // LOAD DATA WHEN PRODUCT ID CHANGES
  // =====================================================

  useEffect(() => {
    if (id) {
      fetchProduct();
      fetchReviews();
    }
  }, [id]);

  // =====================================================
  // SUBMIT REVIEW
  // =====================================================

  const handleSubmitReview = async (event) => {
    event.preventDefault();

    if (!customerName.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!customerEmail.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (!reviewMessage.trim()) {
      alert("Please write a review.");
      return;
    }

    if (rating < 1 || rating > 5) {
      alert("Please select a rating.");
      return;
    }

    try {
      setSubmittingReview(true);

      const response = await fetch(`${MESSAGE_API_URL}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim(),
          message: reviewMessage.trim(),
          rating,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit review.");
      }

      alert("Review submitted successfully!");

      setCustomerName("");
      setCustomerEmail("");
      setReviewMessage("");
      setRating(0);

      await fetchReviews();
    } catch (error) {
      console.error("Submit review error:", error);
      alert(error.message || "Failed to submit review.");
    } finally {
      setSubmittingReview(false);
    }
  };

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
          <h3>{error || "Product not found."}</h3>
        </div>
      </section>
    );
  }

  // =====================================================
  // PRODUCT DATA
  // =====================================================

  const productName = product.name || "Product";
  const productDescription =
    product.description || "No description available.";

  const productBrand = product.brand || "Not specified";

  const productPrice = product.price ?? 0;
  const productRegularPrice = product.regularPrice ?? productPrice;

  const productRating = Number(product.rating || 0);
  const productStock = Number(product.countInStock || 0);

  const isInStock = productStock > 0;

  const averageReviewRating =
    reviews.length > 0
      ? reviews.reduce(
          (total, review) => total + Number(review.rating || 0),
          0
        ) / reviews.length
      : productRating;

  return (
    <section className="productDetails section">
      <div className="container">
        <div className="row">
          {/* PRODUCT IMAGES */}
          <div className="col-md-4 pl-5">
            <ProductZoom product={product} />
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

                  <span>{productBrand}</span>
                </div>
              </li>

              <li className="list-inline-item">
                <div className="d-flex align-items-center">
                  <Rating
                    name="product-rating"
                    value={averageReviewRating}
                    precision={0.5}
                    readOnly
                    size="small"
                  />

                  <span className="text-light cursor ml-2">
                    {reviews.length} Reviews
                  </span>
                </div>
              </li>
            </ul>

            <div className="d-flex info mb-3">
              {productRegularPrice > productPrice && (
                <span className="oldPrice">
                  ₹{productRegularPrice}
                </span>
              )}

              <span className="netPrice text-danger ml-3">
                ₹{productPrice}
              </span>
            </div>

            <span
              className={`badge ${
                isInStock ? "badge-success" : "badge-danger"
              }`}
            >
              {isInStock ? "IN STOCK" : "OUT OF STOCK"}
            </span>

            <p className="mt-3">
              {productDescription}
            </p>

            {/* SIZE */}
            <div className="productSize d-flex align-items-center">
              <span>Size/Weight:</span>

              <ul className="list list-inline mb-0 pl-4">
                {["50g", "100g", "200g", "300g", "500g"].map(
                  (size, index) => (
                    <li
                      className="list-inline-item"
                      key={size}
                    >
                      <button
                        type="button"
                        className={`tag ${
                          activeSize === index ? "active" : ""
                        }`}
                        onClick={() => setActiveSize(index)}
                      >
                        {size}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* CART */}
            <div className="d-flex align-items-center mt-3">
              <QuantityBox />

              <Button
                className="btn-blue btn-lg btn-big btn-round"
                disabled={!isInStock}
              >
                <FaShoppingCart /> &nbsp; Add to Cart
              </Button>

              <Tooltip title="Add to Wishlist">
                <Button className="btn-blue btn-lg btn-circle ml-4">
                  <FaRegHeart />
                </Button>
              </Tooltip>

              <Tooltip title="Add to Compare">
                <Button className="btn-blue btn-lg btn-circle ml-2">
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
                  className={activeTabs === 0 ? "active" : ""}
                  onClick={() => setActiveTabs(0)}
                >
                  Description
                </Button>
              </li>

              <li className="list-inline-item">
                <Button
                  className={activeTabs === 1 ? "active" : ""}
                  onClick={() => setActiveTabs(1)}
                >
                  Additional Info
                </Button>
              </li>

              <li className="list-inline-item">
                <Button
                  className={activeTabs === 2 ? "active" : ""}
                  onClick={() => setActiveTabs(2)}
                >
                  Reviews
                </Button>
              </li>
            </ul>

            <br />

            {/* DESCRIPTION TAB */}
            {activeTabs === 0 && (
              <div className="tabContent">
                <p>{productDescription}</p>
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
                        <td>{productBrand}</td>
                      </tr>

                      <tr>
                        <th>Stock</th>
                        <td>{productStock}</td>
                      </tr>

                      <tr>
                        <th>Category</th>
                        <td>
                          {product.category?.name ||
                            product.category ||
                            "Not specified"}
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
                    <h3>Customer Reviews</h3>

                    <br />

                    {loadingReviews ? (
                      <p>Loading reviews...</p>
                    ) : reviews.length === 0 ? (
                      <p>No reviews yet. Be the first to review!</p>
                    ) : (
                      reviews.map((review) => (
                        <div
                          className="card p-4 mb-3 reviewsCard"
                          key={review._id}
                        >
                          <div className="d-flex align-items-center">
                            <h5 className="text-g">
                              {review.customerName}
                            </h5>

                            <div className="ml-auto">
                              <Rating
                                value={Number(review.rating || 0)}
                                precision={0.5}
                                readOnly
                              />
                            </div>
                          </div>

                          <small className="text-muted">
                            {review.createdAt
                              ? new Date(
                                  review.createdAt
                                ).toLocaleDateString()
                              : ""}
                          </small>

                          <p className="mt-2">
                            {review.message}
                          </p>

                          {review.reply && (
                            <div className="alert alert-info mt-3">
                              <strong>Admin Reply:</strong>

                              <p className="mb-0 mt-1">
                                {review.reply}
                              </p>
                            </div>
                          )}
                        </div>
                      ))
                    )}

                    {/* REVIEW FORM */}
                    <form
                      className="reviewForm"
                      onSubmit={handleSubmitReview}
                    >
                      <h4>Add a Review</h4>

                      <br />

                      <div className="form-group">
                        <textarea
                          className="form-control"
                          placeholder="Write a review"
                          value={reviewMessage}
                          onChange={(event) =>
                            setReviewMessage(event.target.value)
                          }
                          rows={4}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          value={customerName}
                          onChange={(event) =>
                            setCustomerName(event.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          value={customerEmail}
                          onChange={(event) =>
                            setCustomerEmail(event.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Select Rating</label>

                        <br />

                        <Rating
                          name="review-rating"
                          value={rating}
                          precision={0.5}
                          onChange={(event, newValue) =>
                            setRating(newValue || 0)
                          }
                        />
                      </div>

                      <br />

                      <div className="form-group">
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

        <RelatedProducts title="RELATED PRODUCTS" />

        <RelatedProducts title="RECENTLY VIEWED PRODUCTS" />
      </div>
    </section>
  );
};

export default ProductDetails;