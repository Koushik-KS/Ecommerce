import React, { useState } from "react";

// =====================================================
// API URL
// =====================================================

const API_URL =
  "https://ecommerce-hsm4.onrender.com/api/orders";

// =====================================================
// TRACK ORDER COMPONENT
// =====================================================

const Track = () => {
  const [orderId, setOrderId] = useState("");

  const [order, setOrder] =
    useState(null);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // =====================================================
  // TRACK ORDER
  // =====================================================

  const trackOrder = async (event) => {
    event.preventDefault();

    const trimmedOrderId =
      orderId.trim();

    if (!trimmedOrderId) {
      setError(
        "Please enter your order ID."
      );

      setOrder(null);

      return;
    }

    try {
      setIsLoading(true);

      setError("");

      setOrder(null);

      const response = await fetch(
        `${API_URL}/${encodeURIComponent(
          trimmedOrderId
        )}`
      );

      const responseText =
        await response.text();

      let data = {};

      try {
        data = responseText
          ? JSON.parse(responseText)
          : {};
      } catch (parseError) {
        console.error(
          "Track order JSON error:",
          parseError
        );

        throw new Error(
          "Invalid response from server."
        );
      }

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Order not found."
        );
      }

      setOrder(data.order);
    } catch (err) {
      console.error(
        "Track order error:",
        err
      );

      setError(
        err.message ||
          "Unable to track order."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleString(
      "en-IN"
    );
  };

  // =====================================================
  // STATUS CLASS
  // =====================================================

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

  // =====================================================
  // STATUS STEPS
  // =====================================================

  const getStatusSteps = () => {
    const steps = [
      "PENDING",
      "CONFIRMED",
      "PROCESSING",
      "SHIPPED",
      "DELIVERED",
    ];

    if (
      order?.status ===
      "CANCELLED"
    ) {
      return [];
    }

    return steps;
  };

  // =====================================================
  // STEP CLASS
  // =====================================================

  const getStepClass = (step) => {
    const steps =
      getStatusSteps();

    const currentIndex =
      steps.indexOf(
        order?.status
      );

    const stepIndex =
      steps.indexOf(step);

    if (
      currentIndex >=
        stepIndex &&
      currentIndex !== -1
    ) {
      return "bg-success text-white";
    }

    return "bg-light text-muted border";
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-9 col-md-11">

          {/* =================================================
              PAGE HEADING
          ================================================= */}

          <div className="text-center mb-4">
            <h2 className="fw-bold">
              Track Your Order
            </h2>

            <p className="text-muted">
              Enter your order ID to check
              your order status.
            </p>
          </div>

          {/* =================================================
              SEARCH FORM
          ================================================= */}

          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-4">

              <form
                onSubmit={trackOrder}
              >
                <label className="form-label fw-bold">
                  Order ID
                </label>

                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Example: ORD-20260921-6161"
                    value={orderId}
                    onChange={(event) =>
                      setOrderId(
                        event.target.value
                      )
                    }
                    disabled={isLoading}
                  />

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={
                      isLoading
                    }
                  >
                    {isLoading
                      ? "Tracking..."
                      : "Track Order"}
                  </button>
                </div>
              </form>

            </div>
          </div>

          {/* =================================================
              ERROR MESSAGE
          ================================================= */}

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          {/* =================================================
              ORDER DETAILS
          ================================================= */}

          {order && (
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">

                {/* =================================================
                    ORDER HEADER
                ================================================= */}

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">

                  <div>
                    <h4 className="fw-bold mb-1">
                      Order Details
                    </h4>

                    <p className="text-muted mb-0">
                      Order ID:{" "}
                      <strong>
                        {order.orderId}
                      </strong>
                    </p>
                  </div>

                  <span
                    className={`badge ${getStatusClass(
                      order.status
                    )} p-2`}
                  >
                    {order.status}
                  </span>

                </div>

                {/* =================================================
                    DELIVERY PROGRESS
                ================================================= */}

                {order.status ===
                "CANCELLED" ? (
                  <div className="alert alert-danger">
                    This order has been
                    cancelled.
                  </div>
                ) : (
                  <div className="mb-4">

                    <h5 className="fw-bold mb-3">
                      Order Progress
                    </h5>

                    <div className="row g-2">

                      {getStatusSteps().map(
                        (step) => (
                          <div
                            className="col"
                            key={step}
                          >
                            <div
                              className={`text-center rounded p-2 small ${getStepClass(
                                step
                              )}`}
                            >
                              {step}
                            </div>
                          </div>
                        )
                      )}

                    </div>

                  </div>
                )}

                <hr />

                {/* =================================================
                    CUSTOMER INFORMATION
                ================================================= */}

                <h5 className="fw-bold mb-3">
                  Customer Information
                </h5>

                <div className="row mb-3">

                  <div className="col-md-6 mb-3">
                    <strong>
                      Name:
                    </strong>

                    <p className="mb-0">
                      {order.customer
                        ?.fullName ||
                        order.customer
                          ?.name ||
                        "N/A"}
                    </p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <strong>
                      Mobile:
                    </strong>

                    <p className="mb-0">
                      {order.customer
                        ?.mobile ||
                        "N/A"}
                    </p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <strong>
                      Email:
                    </strong>

                    <p className="mb-0">
                      {order.customer
                        ?.email ||
                        "N/A"}
                    </p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <strong>
                      Order Date:
                    </strong>

                    <p className="mb-0">
                      {formatDate(
                        order.createdAt
                      )}
                    </p>
                  </div>

                  <div className="col-12 mb-3">
                    <strong>
                      Address:
                    </strong>

                    <p className="mb-0">
                      {order.customer
                        ?.address ||
                        "N/A"}
                    </p>
                  </div>

                </div>

                <hr />

                {/* =================================================
                    ORDERED PRODUCTS
                ================================================= */}

                <h5 className="fw-bold mb-3">
                  Ordered Products
                </h5>

                <div className="table-responsive">

                  <table className="table table-bordered align-middle">

                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>
                          Product
                        </th>
                        <th>
                          Price
                        </th>
                        <th>
                          Quantity
                        </th>
                        <th>
                          Total
                        </th>
                      </tr>
                    </thead>

                    <tbody>

                      {order.items?.map(
                        (
                          item,
                          index
                        ) => {
                          const price =
                            Number(
                              item.price ||
                                0
                            );

                          const quantity =
                            Number(
                              item.quantity ||
                                0
                            );

                          return (
                            <tr
                              key={
                                item._id ||
                                index
                              }
                            >
                              <td>
                                {index +
                                  1}
                              </td>

                              <td>
                                {item.name ||
                                  item.productName ||
                                  "Product"}
                              </td>

                              <td>
                                ₹
                                {price.toLocaleString(
                                  "en-IN"
                                )}
                              </td>

                              <td>
                                {quantity}
                              </td>

                              <td>
                                ₹
                                {(
                                  price *
                                  quantity
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </td>
                            </tr>
                          );
                        }
                      )}

                    </tbody>

                  </table>

                </div>

                {/* =================================================
                    ORDER SUMMARY
                ================================================= */}

                <div className="row justify-content-end">

                  <div className="col-md-6">

                    <div className="border rounded p-3">

                      <div className="d-flex justify-content-between mb-2">

                        <span>
                          Subtotal:
                        </span>

                        <strong>
                          ₹
                          {Number(
                            order.subtotal ||
                              0
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </div>

                      <div className="d-flex justify-content-between mb-2">

                        <span>
                          Delivery Charge:
                        </span>

                        <strong>
                          ₹
                          {Number(
                            order.deliveryCharge ||
                              0
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </div>

                      <hr />

                      <div className="d-flex justify-content-between">

                        <strong>
                          Grand Total:
                        </strong>

                        <strong className="text-success">
                          ₹
                          {Number(
                            order.total ||
                              0
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Track;