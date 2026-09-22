
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const API_URL = "http://localhost:4000/api/orders";

const STATUS_OPTIONS = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

const OrderDetails = () => {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch selected order
  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL);

      const orderData = Array.isArray(response.data)
        ? response.data
        : response.data.orders || [];

      const selectedOrder = orderData.find(
        (item) =>
          item.orderId === orderId ||
          item._id === orderId
      );

      if (!selectedOrder) {
        setError("Order not found.");
        return;
      }

      setOrder(selectedOrder);
    } catch (err) {
      console.error("Order details error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load order details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  // Update order status
  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;

    if (!order?.orderId) {
      setError("Order ID is missing.");
      return;
    }

    try {
      setUpdatingStatus(true);
      setError("");
      setSuccessMessage("");

      await axios.patch(
        `${API_URL}/${order.orderId}/status`,
        {
          status: newStatus,
        }
      );

      setOrder((previousOrder) => ({
        ...previousOrder,
        status: newStatus,
      }));

      setSuccessMessage(
        `Order status updated to ${newStatus}.`
      );
    } catch (err) {
      console.error("Status update error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to update order status."
      );
    } finally {
      setUpdatingStatus(false);
    }
  };

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="right-content w-100 d-flex justify-content-center align-items-center">
        <CircularProgress />
      </div>
    );
  }

  if (error && !order) {
    return (
      <div className="right-content w-100">
        <Alert severity="error">
          {error}
        </Alert>

        <Link to="/orders" className="btn btn-primary mt-3">
          Back to Orders
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="right-content w-100">
        <Alert severity="error">
          Order not found.
        </Alert>

        <Link to="/orders" className="btn btn-primary mt-3">
          Back to Orders
        </Link>
      </div>
    );
  }

  const customer = order.customer || {};

  const customerName =
    customer.fullName ||
    customer.full_name ||
    customer.name ||
    order.customerName ||
    "N/A";

  const customerMobile =
    customer.mobile ||
    customer.phone ||
    customer.phoneNumber ||
    order.mobile ||
    "N/A";

  const customerEmail =
    customer.email ||
    order.email ||
    "N/A";

  const deliveryAddress =
    customer.address ||
    order.address ||
    order.deliveryAddress ||
    "Address not available";

  return (
    <div className="right-content w-100">
      {/* Page Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 className="hd">Order Details</h2>

          <p className="text-muted mb-0">
            View and manage order information
          </p>
        </div>

        <Link to="/orders" className="btn btn-primary">
          Back to Orders
        </Link>
      </div>

      {/* Messages */}
      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" className="mb-4">
          {successMessage}
        </Alert>
      )}

      {/* Order Header */}
      <div className="card shadow border-0 p-4 mb-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <h3 className="mb-2">
              {order.orderId || order._id}
            </h3>

            <p className="text-muted mb-0">
              Order Date:{" "}
              {formatDate(order.createdAt || order.orderDate)}
            </p>
          </div>

          <span className="badge bg-primary p-2">
            {order.status || "PENDING"}
          </span>
        </div>
      </div>

      {/* Update Order Status */}
      <div className="card shadow border-0 p-4 mb-4">
        <h3 className="hd">Update Order Status</h3>

        <div className="row align-items-end mt-3">
          <div className="col-md-6">
            <label
              htmlFor="orderStatus"
              className="form-label fw-bold"
            >
              Current Order Status
            </label>

            <select
              id="orderStatus"
              className="form-select"
              value={order.status || "PENDING"}
              onChange={handleStatusChange}
              disabled={updatingStatus}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6 mt-3 mt-md-0">
            {updatingStatus && (
              <div className="d-flex align-items-center gap-2 text-muted">
                <CircularProgress size={20} />
                Updating status...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="card shadow border-0 p-4 mb-4">
        <h3 className="hd">Customer Information</h3>

        <div className="row mt-3">
          <div className="col-md-4 mb-3">
            <strong>Customer Name</strong>
            <p className="mb-0">{customerName}</p>
          </div>

          <div className="col-md-4 mb-3">
            <strong>Mobile Number</strong>
            <p className="mb-0">{customerMobile}</p>
          </div>

          <div className="col-md-4 mb-3">
            <strong>Email</strong>
            <p className="mb-0">{customerEmail}</p>
          </div>

          <div className="col-md-12 mb-3">
            <strong>Delivery Address</strong>
            <p className="mb-0">{deliveryAddress}</p>
          </div>
        </div>
      </div>

      {/* Ordered Products */}
      <div className="card shadow border-0 p-4 mb-4">
        <h3 className="hd">Ordered Products</h3>

        <div className="table-responsive mt-3">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {order.items?.length > 0 ? (
                order.items.map((item, index) => {
                  const productName =
                    item.name ||
                    item.productName ||
                    item.title ||
                    item.product?.name ||
                    "Unknown Product";

                  const quantity = Number(item.quantity || 1);
                  const price = Number(item.price || 0);

                  return (
                    <tr key={item._id || index}>
                      <td>{index + 1}</td>

                      <td>{productName}</td>

                      <td>{quantity}</td>

                      <td>{formatCurrency(price)}</td>

                      <td className="text-danger fw-bold">
                        {formatCurrency(price * quantity)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="card shadow border-0 p-4 mb-4">
        <h3 className="hd">Payment Summary</h3>

        <div className="row mt-3">
          <div className="col-md-6 ms-auto">
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>

              <strong>
                {formatCurrency(order.subtotal)}
              </strong>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Delivery Charge</span>

              <strong>
                {formatCurrency(order.deliveryCharge)}
              </strong>
            </div>

            <hr />

            <div className="d-flex justify-content-between">
              <strong>Grand Total</strong>

              <strong className="text-danger">
                {formatCurrency(order.total)}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Final Action */}
      <div className="mb-4">
        <Link to="/orders" className="btn btn-primary">
          Return to Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderDetails;