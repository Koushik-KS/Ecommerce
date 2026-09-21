
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import Button from "@mui/material/Button";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";

const Cart = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const cartItems = context.cartItems || [];

  // Increase product quantity
  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    context.setCartItems(updatedCart);
  };

  // Decrease product quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );

    context.setCartItems(updatedCart);
  };

  // Remove product from cart
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );

    context.setCartItems(updatedCart);
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Delivery charge
  const deliveryCharge = subtotal > 0 ? 0 : 0;

  // Total amount
  const total = subtotal + deliveryCharge;

  return (
    <div className="container py-4">

      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="font-weight-bold">
          Shopping Cart
        </h2>

        <Link to="/" className="text-decoration-none">
          Continue Shopping
        </Link>

      </div>

      {/* Empty Cart */}
      {cartItems.length === 0 ? (

        <div className="text-center py-5">

          <h3>
            Your Cart is Empty 🛒
          </h3>

          <p className="text-muted mt-3">
            You have not added any products to your cart yet.
          </p>

          <Link to="/">
            <Button
              variant="contained"
              className="btn-blue mt-3"
            >
              Start Shopping
            </Button>
          </Link>

        </div>

      ) : (

        <div className="row">

          {/* Cart Products */}
          <div className="col-md-8">

            {cartItems.map((item) => (

              <div
                className="card mb-3 p-3"
                key={item.id}
              >

                <div className="row align-items-center">

                  {/* Product Image */}
                  <div className="col-md-3 text-center">

                    {item.image ? (

                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "contain"
                        }}
                      />

                    ) : (

                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          width: "120px",
                          height: "120px",
                          backgroundColor: "#f5f5f5",
                          margin: "auto"
                        }}
                      >
                        <span>
                          No Image
                        </span>
                      </div>

                    )}

                  </div>

                  {/* Product Details */}
                  <div className="col-md-5">

                    <h5 className="font-weight-bold">
                      {item.name}
                    </h5>

                    <p className="text-muted mb-1">
                      Brand: {item.brand}
                    </p>

                    <h5 className="text-danger">
                      ₹{item.price}
                    </h5>

                  </div>

                  {/* Quantity Controls */}
                  <div className="col-md-3">

                    <div className="d-flex align-items-center justify-content-center">

                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        <FaMinus />
                      </Button>

                      <span
                        className="mx-3 font-weight-bold"
                        style={{
                          fontSize: "18px"
                        }}
                      >
                        {item.quantity}
                      </span>

                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                      >
                        <FaPlus />
                      </Button>

                    </div>

                    {/* Product Subtotal */}
                    <p className="text-center mt-2 font-weight-bold">
                      ₹{item.price * item.quantity}
                    </p>

                  </div>

                  {/* Remove Button */}
                  <div className="col-md-1 text-center">

                    <Button
                      color="error"
                      onClick={() =>
                        removeItem(item.id)
                      }
                    >
                      <FaTrash />
                    </Button>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* Cart Summary */}
          <div className="col-md-4">

            <div className="card p-4">

              <h4 className="font-weight-bold mb-4">
                Cart Summary
              </h4>

              <div className="d-flex justify-content-between mb-3">

                <span>
                  Subtotal
                </span>

                <strong>
                  ₹{subtotal}
                </strong>

              </div>

              <div className="d-flex justify-content-between mb-3">

                <span>
                  Delivery Charge
                </span>

                <strong className="text-success">
                  Free
                </strong>

              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">

                <h5>
                  Total
                </h5>

                <h5 className="text-danger">
                  ₹{total}
                </h5>

              </div>

              {/* Checkout Button */}
              <Button
                variant="contained"
                fullWidth
                className="btn-blue"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Cart;