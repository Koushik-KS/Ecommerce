
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaCheckCircle, FaShoppingBag } from "react-icons/fa";

const OrderSuccess = () => {
  const location = useLocation();

  const order = location.state?.order;

  // If order details are unavailable
  if (!order) {
    return (
      <div className="container text-center py-5">

        <h3>
          Order details are unavailable
        </h3>

        <p className="text-muted mt-3">
          Please check your orders through the order tracking feature.
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
    <div className="container py-5">

      <div
        className="card mx-auto p-4 text-center"
        style={{
          maxWidth: "650px"
        }}
      >

        {/* Success Icon */}
        <div className="mb-3">

          <FaCheckCircle
            style={{
              fontSize: "70px",
              color: "#28a745"
            }}
          />

        </div>

        {/* Heading */}
        <h2 className="font-weight-bold">
          Order Placed Successfully!
        </h2>

        <p className="text-muted mt-2">
          Thank you for shopping with us.
        </p>

        <hr />

        {/* Order Details */}
        <div className="text-left mt-3">

          <div className="d-flex justify-content-between mb-3">

            <span>
              Order ID
            </span>

            <strong>
              {order.orderId}
            </strong>

          </div>

          <div className="d-flex justify-content-between mb-3">

            <span>
              Order Status
            </span>

            <strong className="text-warning">
              {order.status}
            </strong>

          </div>

          <div className="d-flex justify-content-between mb-3">

            <span>
              Total Amount
            </span>

            <strong className="text-danger">
              ₹{order.total}
            </strong>

          </div>

          <div className="d-flex justify-content-between mb-3">

            <span>
              Payment
            </span>

            <strong>
              Cash on Delivery
            </strong>

          </div>

        </div>

        <hr />

        {/* Customer Details */}
        <h5 className="font-weight-bold text-left mt-3">
          Delivery Details
        </h5>

        <div className="text-left mt-3">

          <p className="mb-1">
            <strong>Name:</strong> {order.customer.fullName}
          </p>

          <p className="mb-1">
            <strong>Mobile:</strong> {order.customer.mobile}
          </p>

          <p className="mb-1">
            <strong>Address:</strong> {order.customer.address}
          </p>

          <p className="mb-1">
            <strong>City:</strong> {order.customer.city}
          </p>

          <p className="mb-1">
            <strong>State:</strong> {order.customer.state}
          </p>

          <p className="mb-1">
            <strong>Pincode:</strong> {order.customer.pincode}
          </p>

        </div>

        <hr />

        {/* Buttons */}
        <div className="d-flex justify-content-center flex-wrap gap-2 mt-3">

          <Link to="/">
            <Button
              variant="contained"
              className="btn-blue"
            >
              <FaShoppingBag className="mr-2" />
              Continue Shopping
            </Button>
          </Link>

        </div>

      </div>

    </div>
  );
};

export default OrderSuccess;