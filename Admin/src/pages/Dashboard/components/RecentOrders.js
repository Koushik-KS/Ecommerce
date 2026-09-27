
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:4000/api/orders";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH RECENT ORDERS
  // =========================

  const fetchRecentOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL);

      const responseData = response.data;

      let orderData = [];

      if (Array.isArray(responseData)) {
        orderData = responseData;
      } else if (
        responseData &&
        Array.isArray(responseData.orders)
      ) {
        orderData = responseData.orders;
      }

      const sortedOrders = [...orderData]
        .sort((a, b) => {
          const dateA = new Date(
            a.createdAt || a.orderDate || 0
          ).getTime();

          const dateB = new Date(
            b.createdAt || b.orderDate || 0
          ).getTime();

          return dateB - dateA;
        })
        .slice(0, 5);

      setOrders(sortedOrders);
    } catch (err) {
      console.error(
        "Error fetching recent orders:",
        err
      );

      const backendMessage =
        err.response?.data?.message;

      setError(
        backendMessage ||
          "Failed to load recent orders. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // =========================
  // LOAD ORDERS
  // =========================

  useEffect(() => {
    fetchRecentOrders();
  }, [fetchRecentOrders]);

  // =========================
  // FORMAT DATE
  // =========================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "N/A";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================
  // GET CUSTOMER NAME
  // =========================

  const getCustomerName = (order) => {
    return (
      order.customer?.fullName ||
      order.customer?.full_name ||
      order.customer?.name ||
      order.customer?.username ||
      order.customerName ||
      order.name ||
      order.user?.name ||
      order.user?.fullName ||
      "Unknown"
    );
  };

  // =========================
  // GET ORDER TOTAL
  // =========================

  const getOrderTotal = (order) => {
    const total =
      order.total ??
      order.totalAmount ??
      order.grandTotal ??
      order.amount ??
      0;

    const numericTotal = Number(total);

    return Number.isFinite(numericTotal)
      ? numericTotal
      : 0;
  };

  // =========================
  // STATUS CLASS
  // =========================

  const getStatusClass = (status) => {
    switch (String(status || "").toUpperCase()) {
      case "DELIVERED":
        return "bg-success";

      case "SHIPPED":
        return "bg-info";

      case "PROCESSING":
        return "bg-primary";

      case "CONFIRMED":
        return "bg-secondary";

      case "CANCELLED":
        return "bg-danger";

      case "PENDING":
      case "PENDING_CONFIRMATION":
        return "bg-warning text-dark";

      default:
        return "bg-warning text-dark";
    }
  };

  // =========================
  // RENDER
  // =========================

  return (
    <div className="card shadow border-0 p-3 mt-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="hd mb-0">
          Recent Orders
        </h3>

        <Link
          to="/orders"
          className="btn btn-primary btn-sm"
        >
          View All
        </Link>
      </div>

      {loading && (
        <p className="text-muted mb-0">
          Loading recent orders...
        </p>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        orders.length === 0 && (
          <p className="text-muted mb-0">
            No orders found.
          </p>
        )}

      {!loading &&
        !error &&
        orders.length > 0 && (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={
                      order._id ||
                      order.orderId ||
                      index
                    }
                  >
                    <td>{index + 1}</td>

                    <td>
                      <strong>
                        {order.orderId || "N/A"}
                      </strong>
                    </td>

                    {/* CUSTOMER */}
                    <td>
                      {getCustomerName(order)}
                    </td>

                    {/* TOTAL */}
                    <td className="text-danger fw-bold">
                      ₹
                      {getOrderTotal(
                        order
                      ).toLocaleString("en-IN")}
                    </td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={`badge ${getStatusClass(
                          order.status
                        )}`}
                      >
                        {order.status || "PENDING"}
                      </span>
                    </td>

                    {/* DATE */}
                    <td>
                      {formatDate(
                        order.createdAt ||
                          order.orderDate
                      )}
                    </td>

                    {/* ACTION */}
                    <td>
                      <Link
                        to={`/orders/${
                          order.orderId ||
                          order._id
                        }`}
                        className="btn btn-primary btn-sm"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
};

export default RecentOrders;