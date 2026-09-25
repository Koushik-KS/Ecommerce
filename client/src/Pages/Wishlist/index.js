
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaRegHeart, FaShoppingCart, FaTrash } from "react-icons/fa";

import { MyContext } from "../../App";

const Wishlist = () => {
  const navigate = useNavigate();

  const {
    wishlistItems,
    removeFromWishlist,
    addToCart,
    clearWishlist,
  } = useContext(MyContext);

  // =====================================================
  // ADD PRODUCT TO CART
  // =====================================================

  const handleAddToCart = (product) => {
    if (!product) {
      return;
    }

    const stock = Number(product.countInStock || 0);

    if (stock <= 0) {
      alert("This product is currently out of stock.");
      return;
    }

    addToCart(product, 1);

    alert(
      `${product.name || "Product"} added to cart successfully!`
    );
  };

  // =====================================================
  // REMOVE PRODUCT FROM WISHLIST
  // =====================================================

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
  };

  // =====================================================
  // CLEAR WISHLIST
  // =====================================================

  const handleClearWishlist = () => {
    if (wishlistItems.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to clear your Wishlist?"
    );

    if (confirmed) {
      clearWishlist();
    }
  };

  // =====================================================
  // EMPTY WISHLIST
  // =====================================================

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <section className="section wishlistPage">
        <div className="container text-center">

          <div className="card p-5">
            <FaRegHeart
              size={60}
              color="#e53935"
            />

            <h2 className="mt-4">
              Your Wishlist is Empty
            </h2>

            <p className="text-muted">
              Save your favorite products here.
            </p>

            <Button
              variant="contained"
              className="btn-blue mt-3"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </Button>
          </div>

        </div>
      </section>
    );
  }

  // =====================================================
  // WISHLIST PAGE
  // =====================================================

  return (
    <section className="section wishlistPage">
      <div className="container">

        {/* PAGE HEADER */}

        <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">

          <div>
            <h2 className="hd">
              My Wishlist
            </h2>

            <p className="text-muted">
              {wishlistItems.length} product
              {wishlistItems.length > 1 ? "s" : ""} saved
            </p>
          </div>

          <Button
            variant="outlined"
            color="error"
            onClick={handleClearWishlist}
          >
            <FaTrash className="mr-2" />
            Clear Wishlist
          </Button>

        </div>

        {/* WISHLIST PRODUCTS */}

        <div className="row">

          {wishlistItems.map((product) => {

            const productId =
              product._id || product.id;

            const productPrice = Number(
              product.price || 0
            );

            const productRegularPrice = Number(
              product.regularPrice ||
                productPrice
            );

            const productStock = Number(
              product.countInStock || 0
            );

            const isInStock = productStock > 0;

            const productImage =
              product.images?.[0] ||
              product.image ||
              product.thumbnail ||
              "";

            return (
              <div
                className="col-lg-3 col-md-4 col-sm-6 mb-4"
                key={productId}
              >

                <div className="card h-100 wishlistCard">

                  {/* PRODUCT IMAGE */}

                  <div
                    className="wishlistImageWrapper"
                    onClick={() =>
                      navigate(`/product/${productId}`)
                    }
                    style={{
                      cursor: "pointer",
                      height: "220px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "15px",
                    }}
                  >

                    {productImage ? (
                      <img
                        src={productImage}
                        alt={product.name || "Product"}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "190px",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <div className="text-muted">
                        No Image
                      </div>
                    )}

                  </div>

                  {/* PRODUCT INFORMATION */}

                  <div className="card-body d-flex flex-column">

                    <h5
                      className="text-capitalize"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        navigate(`/product/${productId}`)
                      }
                    >
                      {product.name || "Product"}
                    </h5>

                    <p className="text-muted mb-2">
                      {product.brand?.name ||
                        product.brand ||
                        "Not specified"}
                    </p>

                    {/* PRICE */}

                    <div className="mb-2">

                      {productRegularPrice > productPrice && (
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "#888",
                            marginRight: "10px",
                          }}
                        >
                          ₹
                          {productRegularPrice.toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      )}

                      <strong
                        style={{
                          color: "#e53935",
                          fontSize: "18px",
                        }}
                      >
                        ₹
                        {productPrice.toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                    </div>

                    {/* STOCK STATUS */}

                    <p
                      className={
                        isInStock
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {isInStock
                        ? `In Stock (${productStock})`
                        : "Out of Stock"}
                    </p>

                    {/* ACTION BUTTONS */}

                    <div className="mt-auto">

                      <Button
                        fullWidth
                        variant="contained"
                        className="btn-blue mb-2"
                        disabled={!isInStock}
                        onClick={() =>
                          handleAddToCart(product)
                        }
                      >
                        <FaShoppingCart className="mr-2" />
                        Add to Cart
                      </Button>

                      <Button
                        fullWidth
                        variant="outlined"
                        color="error"
                        onClick={() =>
                          handleRemove(productId)
                        }
                      >
                        <FaTrash className="mr-2" />
                        Remove
                      </Button>

                    </div>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default Wishlist;