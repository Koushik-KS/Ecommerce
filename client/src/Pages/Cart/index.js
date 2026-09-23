
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaArrowLeft,
  FaCreditCard,
} from "react-icons/fa";

const Cart = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const {
    cartItems = [],
    removeFromCart,
    updateQuantity,
  } = context;

  // Get product ID
  const getProductId = (item) => item._id || item.id;

  // Get product price
  const getProductPrice = (item) => {
    return Number(item.price || item.salePrice || 0);
  };

  // Increase quantity
  const increaseQuantity = (item) => {
    const productId = getProductId(item);
    const currentQuantity = Number(item.quantity || 1);

    const stock = Number(
      item.stock ?? item.countInStock ?? item.quantityAvailable ?? 999999
    );

    if (currentQuantity < stock) {
      updateQuantity(productId, currentQuantity + 1);
    }
  };

  // Decrease quantity
  const decreaseQuantity = (item) => {
    const productId = getProductId(item);
    const currentQuantity = Number(item.quantity || 1);

    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  // Remove item from cart
  const removeItem = (item) => {
    const productId = getProductId(item);
    removeFromCart(productId);
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    const price = getProductPrice(item);
    const quantity = Number(item.quantity || 1);

    return total + price * quantity;
  }, 0);

  // Delivery charge
  const deliveryCharge = subtotal > 0 ? 0 : 0;

  // Total amount
  const total = subtotal + deliveryCharge;

  // Total products quantity
  const totalItems = cartItems.reduce((total, item) => {
    return total + Number(item.quantity || 1);
  }, 0);

  // Format currency
  const formatPrice = (amount) => {
    return amount.toLocaleString("en-IN");
  };

  return (
    <div className="container py-4">

      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">

        <div>
          <h2 className="font-weight-bold mb-1">
            Shopping Cart
          </h2>

          <p className="text-muted mb-0">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <Link
          to="/"
          className="text-decoration-none d-flex align-items-center mt-2"
        >
          <FaArrowLeft className="mr-2" />
          Continue Shopping
        </Link>

      </div>

      {/* Empty Cart */}
      {cartItems.length === 0 ? (

        <div
          className="text-center py-5 px-3"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #eeeeee",
          }}
        >

          <FaShoppingCart
            size={65}
            color="#bdbdbd"
          />

          <h3 className="font-weight-bold mt-4">
            Your Cart is Empty
          </h3>

          <p className="text-muted mt-3">
            You have not added any products to your cart yet.
          </p>

          <Link to="/" className="text-decoration-none">

            <Button
              variant="contained"
              className="btn-blue mt-3"
              startIcon={<FaShoppingCart />}
            >
              Start Shopping
            </Button>

          </Link>

        </div>

      ) : (

        <div className="row">

          {/* Cart Products */}
          <div className="col-lg-8 mb-4">

            {cartItems.map((item) => {

              const productId = getProductId(item);
              const price = getProductPrice(item);
              const quantity = Number(item.quantity || 1);

              const stock = Number(
                item.stock ??
                item.countInStock ??
                item.quantityAvailable ??
                999999
              );

              const itemSubtotal = price * quantity;

              return (

                <div
                  className="card mb-3 p-3"
                  key={productId}
                  style={{
                    border: "1px solid #eeeeee",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                  }}
                >

                  <div className="row align-items-center">

                    {/* Product Image */}
                    <div className="col-12 col-sm-3 text-center mb-3 mb-sm-0">

                      {item.image || item.images?.[0] ? (

                        <img
                          src={item.image || item.images?.[0]}
                          alt={item.name || item.title || "Product"}
                          style={{
                            width: "130px",
                            height: "130px",
                            maxWidth: "100%",
                            objectFit: "contain",
                            borderRadius: "8px",
                          }}
                        />

                      ) : (

                        <div
                          className="d-flex align-items-center justify-content-center mx-auto"
                          style={{
                            width: "130px",
                            height: "130px",
                            maxWidth: "100%",
                            backgroundColor: "#f7f7f7",
                            borderRadius: "8px",
                          }}
                        >
                          <span className="text-muted">
                            No Image
                          </span>
                        </div>

                      )}

                    </div>

                    {/* Product Details */}
                    <div className="col-12 col-sm-5 mb-3 mb-sm-0">

                      <h5 className="font-weight-bold mb-2">
                        {item.name || item.title || "Product"}
                      </h5>

                      {item.brand && (

                        <p className="text-muted mb-2">
                          Brand: {item.brand}
                        </p>

                      )}

                      <h5 className="text-danger font-weight-bold mb-1">
                        ₹{formatPrice(price)}
                      </h5>

                      <small className="text-muted">
                        Price per item
                      </small>

                    </div>

                    {/* Quantity Controls */}
                    <div className="col-8 col-sm-3">

                      <div className="d-flex align-items-center justify-content-center">

                        <IconButton
                          size="small"
                          onClick={() => decreaseQuantity(item)}
                          disabled={quantity <= 1}
                          sx={{
                            border: "1px solid #dddddd",
                            borderRadius: "6px",
                          }}
                        >
                          <FaMinus size={11} />
                        </IconButton>

                        <span
                          className="mx-3 font-weight-bold"
                          style={{
                            fontSize: "17px",
                            minWidth: "20px",
                            textAlign: "center",
                          }}
                        >
                          {quantity}
                        </span>

                        <IconButton
                          size="small"
                          onClick={() => increaseQuantity(item)}
                          disabled={quantity >= stock}
                          sx={{
                            border: "1px solid #dddddd",
                            borderRadius: "6px",
                          }}
                        >
                          <FaPlus size={11} />
                        </IconButton>

                      </div>

                      <p className="text-center mt-3 mb-0 font-weight-bold">
                        ₹{formatPrice(itemSubtotal)}
                      </p>

                    </div>

                    {/* Remove Button */}
                    <div className="col-4 col-sm-1 text-center">

                      <IconButton
                        color="error"
                        onClick={() => removeItem(item)}
                        aria-label="Remove product"
                      >
                        <FaTrash size={16} />
                      </IconButton>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

          {/* Cart Summary */}
          <div className="col-lg-4">

            <div
              className="card p-4"
              style={{
                border: "1px solid #eeeeee",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                position: "sticky",
                top: "20px",
              }}
            >

              <h4 className="font-weight-bold mb-4">
                Cart Summary
              </h4>

              <div className="d-flex justify-content-between mb-3">

                <span className="text-muted">
                  Items
                </span>

                <strong>
                  {totalItems}
                </strong>

              </div>

              <div className="d-flex justify-content-between mb-3">

                <span className="text-muted">
                  Subtotal
                </span>

                <strong>
                  ₹{formatPrice(subtotal)}
                </strong>

              </div>

              <div className="d-flex justify-content-between mb-3">

                <span className="text-muted">
                  Delivery Charge
                </span>

                <strong className="text-success">
                  Free
                </strong>

              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-center mb-4">

                <h5 className="font-weight-bold mb-0">
                  Total
                </h5>

                <h5 className="text-danger font-weight-bold mb-0">
                  ₹{formatPrice(total)}
                </h5>

              </div>

              {/* Checkout Button */}
              <Button
                variant="contained"
                fullWidth
                className="btn-blue"
                startIcon={<FaCreditCard />}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>

              <Link
                to="/"
                className="text-center text-decoration-none d-block mt-3"
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Cart;