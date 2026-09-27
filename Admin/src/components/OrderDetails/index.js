import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// =====================================================
// BACKEND API URL
// =====================================================

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://ecommerce-hsm4.onrender.com";

// =====================================================
// ORDER DETAILS COMPONENT
// =====================================================

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===================================================
  // FETCH ORDER
  // ===================================================

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/orders/${orderId}`
      );

      const data = await response.json();

      console.log("Order API response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch order"
        );
      }

      setOrder(data.order || data);
    } catch (err) {
      console.error("Fetch order error:", err);

      setError(
        err.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // ===================================================
  // LOAD ORDER
  // ===================================================

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <div className="right-content w-100">
        <div className="card shadow border-0 p-4">
          <h4>Loading order details...</h4>
        </div>
      </div>
    );
  }

  // ===================================================
  // ERROR
  // ===================================================

  if (error) {
    return (
      <div className="right-content w-100">
        <div className="card shadow border-0 p-4">
          <h4 className="text-danger">
            Error
          </h4>

          <p>{error}</p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/orders")}
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  // ===================================================
  // ORDER NOT FOUND
  // ===================================================

  if (!order) {
    return (
      <div className="right-content w-100">
        <div className="card shadow border-0 p-4">
          <h4>Order not found</h4>

          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/orders")}
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  // ===================================================
  // CUSTOMER / ITEMS
  // ===================================================

  const customer = order.customer || {};
  const items = order.items || [];

  // ===================================================
  // CALCULATE SUBTOTAL IF NEEDED
  // ===================================================

  const calculatedSubtotal = items.reduce(
    (total, item) => {
      const price = Number(item.price || 0);
      const quantity = Number(
        item.quantity || 1
      );

      return total + price * quantity;
    },
    0
  );

  const subtotal =
    Number(order.subtotal) ||
    calculatedSubtotal;

  const deliveryCharge = Number(
    order.deliveryCharge || 0
  );

  const grandTotal =
    Number(order.total) ||
    subtotal + deliveryCharge;

  // ===================================================
  // RETURN UI
  // ===================================================

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 p-4">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h4 className="mb-1">
              Order Details
            </h4>

            <p className="text-muted mb-0">
              Order ID:{" "}
              <strong>
                {order.orderId || order._id || "N/A"}
              </strong>
            </p>
          </div>

          <button
            className="btn btn-secondary"
            onClick={() => navigate("/orders")}
          >
            ← Back to Orders
          </button>

        </div>

        <hr />

        {/* =================================================
            CUSTOMER INFORMATION
        ================================================= */}

        <h5 className="mb-3">
          Customer Information
        </h5>

        <div className="row mb-4">

          <div className="col-md-6 mb-3">
            <strong>Name:</strong>

            <p className="mb-0">
              {customer.name || "N/A"}
            </p>
          </div>

          <div className="col-md-6 mb-3">
            <strong>Mobile:</strong>

            <p className="mb-0">
              {customer.mobile || "N/A"}
            </p>
          </div>

          <div className="col-md-6 mb-3">
            <strong>Email:</strong>

            <p className="mb-0">
              {customer.email || "N/A"}
            </p>
          </div>

          <div className="col-md-6 mb-3">
            <strong>Address:</strong>

            <p className="mb-0">
              {customer.address || "N/A"}
            </p>
          </div>

        </div>

        <hr />

        {/* =================================================
            ORDER INFORMATION
        ================================================= */}

        <h5 className="mb-3">
          Order Information
        </h5>

        <div className="row mb-4">

          <div className="col-md-4 mb-3">
            <strong>Status:</strong>

            <p className="mb-0">
              <span className="badge bg-info">
                {order.status || "PENDING"}
              </span>
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <strong>Payment:</strong>

            <p className="mb-0">
              {order.paymentMethod ||
                "Cash on Delivery"}
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <strong>Order Date:</strong>

            <p className="mb-0">
              {order.createdAt
                ? new Date(
                    order.createdAt
                  ).toLocaleString("en-IN")
                : "N/A"}
            </p>
          </div>

        </div>

        <hr />

        {/* =================================================
            ORDERED PRODUCTS
        ================================================= */}

        <h5 className="mb-3">
          Ordered Products
        </h5>

        <div className="table-responsive">

          <table className="table table-bordered align-middle">

            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>

              {items.length > 0 ? (

                items.map((item, index) => {

                  const price = Number(
                    item.price || 0
                  );

                  const quantity = Number(
                    item.quantity || 1
                  );

                  const itemTotal =
                    price * quantity;

                  return (
                    <tr
                      key={
                        item._id || index
                      }
                    >

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        {item.name ||
                          item.title ||
                          "Product"}
                      </td>

                      <td>
                        ₹{price.toFixed(2)}
                      </td>

                      <td>
                        {quantity}
                      </td>

                      <td>
                        ₹{itemTotal.toFixed(2)}
                      </td>

                    </tr>
                  );
                })

              ) : (

                <tr>
                  <td
                    colSpan="5"
                    className="text-center"
                  >
                    No products found
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* =================================================
            PRICE SUMMARY
        ================================================= */}

        <div className="row justify-content-end mt-4">

          <div className="col-md-5">

            <div className="border rounded p-3">

              {/* SUBTOTAL */}

              <div className="d-flex justify-content-between mb-2">

                <span>
                  Subtotal:
                </span>

                <strong>
                  ₹{subtotal.toFixed(2)}
                </strong>

              </div>

              {/* DELIVERY */}

              <div className="d-flex justify-content-between mb-2">

                <span>
                  Delivery Charge:
                </span>

                <strong>
                  ₹{deliveryCharge.toFixed(2)}
                </strong>

              </div>

              <hr />

              {/* GRAND TOTAL */}

              <div className="d-flex justify-content-between">

                <strong>
                  Grand Total:
                </strong>

                <strong className="text-success">
                  ₹{grandTotal.toFixed(2)}
                </strong>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderDetails;