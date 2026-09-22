
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState("");

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const API_URL = "http://localhost:4000/api/orders";

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data.orders || []);
    } catch (err) {
      console.error("Fetch orders error:", err);
      setError(err.message || "Unable to load orders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      setUpdatingOrderId(orderId);

      const response = await fetch(
        `${API_URL}/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to update order status"
        );
      }

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order.orderId === orderId
            ? {
                ...order,
                status: data.order.status,
              }
            : order
        )
      );

      alert("Order status updated successfully!");
    } catch (err) {
      console.error("Update status error:", err);
      alert(err.message || "Failed to update order status");
    } finally {
      setUpdatingOrderId("");
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-IN");
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-warning text-dark";

      case "CONFIRMED":
        return "bg-primary";

      case "PROCESSING":
        return "bg-info text-dark";

      case "SHIPPED":
        return "bg-secondary";

      case "DELIVERED":
        return "bg-success";

      case "CANCELLED":
        return "bg-danger";

      default:
        return "bg-dark";
    }
  };

  // Search and filter orders
  const filteredOrders = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return orders.filter((order) => {
      const customerName =
        order.customer?.fullName ||
        order.customer?.name ||
        "";

      const customerMobile =
        order.customer?.mobile ||
        order.customer?.phone ||
        "";

      const orderId = order.orderId || "";

      const matchesSearch =
        orderId.toLowerCase().includes(search) ||
        customerName.toLowerCase().includes(search) ||
        customerMobile.toString().includes(search);

      const matchesStatus =
        statusFilter === "ALL" ||
        order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  return (
    <div className="right-content w-100">
      <div className="container-fluid py-4">

        {/* Page Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="font-weight-bold">Orders</h2>

            <p className="text-muted mb-0">
              Manage customer orders and update order status.
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={fetchOrders}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Refresh Orders"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {/* Loading Message */}
        {isLoading && (
          <div className="text-center py-5">
            <h5>Loading orders...</h5>
          </div>
        )}

        {/* Orders Table */}
        {!isLoading && !error && (
          <div className="card shadow-sm border-0">
            <div className="card-body">

              {/* Table Header */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Customer Orders</h4>

                <span className="badge bg-primary">
                  Showing: {filteredOrders.length} / {orders.length}
                </span>
              </div>

              {/* Search and Filter */}
              <div className="row g-3 mb-4">

                {/* Search */}
                <div className="col-md-7">
                  <label
                    htmlFor="orderSearch"
                    className="form-label fw-bold"
                  >
                    Search Orders
                  </label>

                  <input
                    id="orderSearch"
                    type="text"
                    className="form-control"
                    placeholder="Search Order ID, customer name or mobile..."
                    value={searchTerm}
                    onChange={(event) =>
                      setSearchTerm(event.target.value)
                    }
                  />
                </div>

                {/* Status Filter */}
                <div className="col-md-3">
                  <label
                    htmlFor="statusFilter"
                    className="form-label fw-bold"
                  >
                    Filter by Status
                  </label>

                  <select
                    id="statusFilter"
                    className="form-select"
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(event.target.value)
                    }
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="col-md-2 d-flex align-items-end">
                  <button
                    className="btn btn-secondary w-100"
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("ALL");
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Empty Orders */}
              {orders.length === 0 ? (
                <div className="text-center py-5">
                  <h5>No orders found</h5>

                  <p className="text-muted">
                    Customer orders will appear here.
                  </p>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-5">
                  <h5>No matching orders</h5>

                  <p className="text-muted">
                    Try another search or status filter.
                  </p>

                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("ALL");
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle">

                    <thead className="table-primary">
                      <tr>
                        <th>#</th>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Mobile</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Update Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredOrders.map((order, index) => (
                        <tr
                          key={order._id || order.orderId}
                        >
                          <td>{index + 1}</td>

                          <td>
                            <strong>
                              {order.orderId || "N/A"}
                            </strong>
                          </td>

                          <td>
                            {order.customer?.fullName ||
                              order.customer?.name ||
                              "N/A"}
                          </td>

                          <td>
                            {order.customer?.mobile ||
                              order.customer?.phone ||
                              "N/A"}
                          </td>

                          <td>
                            {order.items?.reduce(
                              (total, item) =>
                                total +
                                Number(item.quantity || 0),
                              0
                            )}
                          </td>

                          <td>
                            <strong className="text-danger">
                              ₹
                              {Number(
                                order.total || 0
                              ).toLocaleString("en-IN")}
                            </strong>
                          </td>

                          <td>
                            <small>
                              {formatDate(order.createdAt)}
                            </small>
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
                            <select
                              className="form-select"
                              value={order.status || "PENDING"}
                              disabled={
                                updatingOrderId === order.orderId
                              }
                              onChange={(event) => {
                                const newStatus =
                                  event.target.value;

                                if (
                                  newStatus !== order.status
                                ) {
                                  updateOrderStatus(
                                    order.orderId,
                                    newStatus
                                  );
                                }
                              }}
                            >
                              <option value="PENDING">
                                PENDING
                              </option>

                              <option value="CONFIRMED">
                                CONFIRMED
                              </option>

                              <option value="PROCESSING">
                                PROCESSING
                              </option>

                              <option value="SHIPPED">
                                SHIPPED
                              </option>

                              <option value="DELIVERED">
                                DELIVERED
                              </option>

                              <option value="CANCELLED">
                                CANCELLED
                              </option>
                            </select>

                            {updatingOrderId === order.orderId && (
                              <small className="text-muted">
                                Updating...
                              </small>
                            )}
                          </td>

                          <td>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() =>
                                navigate(
                                  `/orders/${order.orderId}`
                                )
                              }
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Orders;