
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:4000/api/orders";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRecentOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL);

      const orderData = Array.isArray(response.data)
        ? response.data
        : response.data.orders || [];

      const sortedOrders = [...orderData]
        .sort(
          (a, b) =>
            new Date(b.createdAt || b.orderDate) -
            new Date(a.createdAt || a.orderDate)
        )
        .slice(0, 5);

      setOrders(sortedOrders);
    } catch (err) {
      console.error("Error fetching recent orders:", err);
      setError("Failed to load recent orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentOrders();
  }, []);

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
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
      default:
        return "bg-warning text-dark";
    }
  };

  return (
    <div className="card shadow border-0 p-3 mt-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="hd mb-0">Recent Orders</h3>

        <Link to="/orders" className="btn btn-primary btn-sm">
          View All
        </Link>
      </div>

      {loading && (
        <p className="text-muted mb-0">Loading recent orders...</p>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && orders.length === 0 && (
        <p className="text-muted mb-0">No orders found.</p>
      )}

      {!loading && !error && orders.length > 0 && (
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
                <tr key={order._id || order.orderId}>
                  <td>{index + 1}</td>

                  <td>
                    <strong>{order.orderId || "N/A"}</strong>
                  </td>

                  <td>
                <td>
  {order.customer?.fullName ||
    order.customer?.full_name ||
    order.customer?.name ||
    order.customerName ||
    order.name ||
    "Unknown"}
</td>
                  </td>

                  <td className="text-danger fw-bold">
                    ₹{Number(order.total || 0).toLocaleString("en-IN")}
                  </td>

                  <td>
                    <span
                      className={`badge ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status || "PENDING"}
                    </span>
                  </td>

                  <td>
                    {formatDate(order.createdAt || order.orderDate)}
                  </td>

                  <td>
                    <Link
                      to={`/orders/${order.orderId}`}
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