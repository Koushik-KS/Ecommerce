
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import { MyContext } from "../../App";

const Checkout = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const cartItems = context.cartItems || [];

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
  );

  // Delivery charge
  const deliveryCharge = 0;

  // Total amount
  const total = subtotal + deliveryCharge;

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));

    // Remove error while typing
    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: ""
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Place order
  const placeOrder = async (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      navigate("/cart");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert cart items into backend order items
      const orderItems = cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        brand: item.brand || "",
        image: item.image || "",
        price: Number(item.price),
        quantity: Number(item.quantity)
      }));

      // Prepare order data
      const orderDetails = {
        customer: formData,
        items: orderItems,
        subtotal,
        deliveryCharge,
        total
      };

      // Send order to backend
      const response = await axios.post(
        "http://localhost:4000/api/orders",
        orderDetails
      );

      if (response.data.success) {
        const savedOrder = response.data.order;

        // Clear cart after successful order
        context.setCartItems([]);

        // Navigate to order success page
        navigate("/order-success", {
          state: {
            order: savedOrder
          }
        });
      } else {
        alert(response.data.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Place order error:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Unable to place order. Please try again.";

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Empty cart page
  if (cartItems.length === 0) {
    return (
      <div className="container text-center py-5">
        <h2>Your cart is empty 🛒</h2>

        <p className="text-muted mt-3">
          Add products before proceeding to checkout.
        </p>

        <Link to="/">
          <Button
            variant="contained"
            className="btn-blue mt-3"
          >
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="font-weight-bold mb-4">
        Checkout
      </h2>

      <form onSubmit={placeOrder}>
        <div className="row">
          {/* Delivery Details */}
          <div className="col-md-7">
            <div className="card p-4 mb-4">
              <h4 className="font-weight-bold mb-4">
                Delivery Details
              </h4>

              {/* Full Name */}
              <div className="form-group mb-3">
                <label>Full Name</label>

                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />

                {errors.fullName && (
                  <small className="text-danger">
                    {errors.fullName}
                  </small>
                )}
              </div>

              {/* Mobile Number */}
              <div className="form-group mb-3">
                <label>Mobile Number</label>

                <input
                  type="tel"
                  name="mobile"
                  className="form-control"
                  placeholder="Enter 10-digit mobile number"
                  maxLength="10"
                  value={formData.mobile}
                  onChange={handleChange}
                />

                {errors.mobile && (
                  <small className="text-danger">
                    {errors.mobile}
                  </small>
                )}
              </div>

              {/* Email */}
              <div className="form-group mb-3">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />

                {errors.email && (
                  <small className="text-danger">
                    {errors.email}
                  </small>
                )}
              </div>

              {/* Address */}
              <div className="form-group mb-3">
                <label>Complete Address</label>

                <textarea
                  name="address"
                  className="form-control"
                  rows="3"
                  placeholder="House number, street, area"
                  value={formData.address}
                  onChange={handleChange}
                />

                {errors.address && (
                  <small className="text-danger">
                    {errors.address}
                  </small>
                )}
              </div>

              {/* City and State */}
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label>City</label>

                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                    />

                    {errors.city && (
                      <small className="text-danger">
                        {errors.city}
                      </small>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label>State</label>

                    <input
                      type="text"
                      name="state"
                      className="form-control"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                    />

                    {errors.state && (
                      <small className="text-danger">
                        {errors.state}
                      </small>
                    )}
                  </div>
                </div>
              </div>

              {/* Pincode */}
              <div className="form-group mb-3">
                <label>Pincode</label>

                <input
                  type="text"
                  name="pincode"
                  className="form-control"
                  placeholder="Enter 6-digit pincode"
                  maxLength="6"
                  value={formData.pincode}
                  onChange={handleChange}
                />

                {errors.pincode && (
                  <small className="text-danger">
                    {errors.pincode}
                  </small>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-md-5">
            <div className="card p-4">
              <h4 className="font-weight-bold mb-4">
                Order Summary
              </h4>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between mb-3"
                >
                  <div>
                    <p className="mb-1">
                      {item.name}
                    </p>

                    <small className="text-muted">
                      Quantity: {item.quantity}
                    </small>
                  </div>

                  <strong>
                    ₹{Number(item.price) * Number(item.quantity)}
                  </strong>
                </div>
              ))}

              <hr />

              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>

                <strong>₹{subtotal}</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Delivery</span>

                <strong className="text-success">
                  Free
                </strong>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <h5>Total</h5>

                <h5 className="text-danger">
                  ₹{total}
                </h5>
              </div>

              {/* Payment Information */}
              <div className="alert alert-info">
                <strong>Payment Method:</strong>
                <br />
                Cash on Delivery
              </div>

              {/* Place Order Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="btn-blue"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Placing Order..."
                  : "Place Order"}
              </Button>

              {/* Return to Cart */}
              <Link
                to="/cart"
                className="btn btn-outline-secondary mt-3"
              >
                Return to Cart
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;