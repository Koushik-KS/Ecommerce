import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import { MyContext } from "../../App";

// =====================================================
// API URL
// =====================================================

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api`;

const SETTINGS_API_URL = `${API_BASE_URL}/settings`;
const ORDERS_API_URL = `${API_BASE_URL}/orders`;

// =====================================================
// DEFAULT SETTINGS
// =====================================================

const defaultSettings = {
  delivery: {
    deliveryCharge: 0,
    freeDeliveryAbove: 500,
    minimumOrderAmount: 100,
    estimatedDeliveryTime: "30-45 minutes",
    deliveryEnabled: true,
    freeDeliveryEnabled: true,
  },

  order: {
    acceptOrders: true,
    defaultStatus: "PENDING",
    cashOnDelivery: true,
    autoCancelEnabled: false,
  },
};

// =====================================================
// CHECKOUT COMPONENT
// =====================================================

const Checkout = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  // =====================================================
  // CART
  // =====================================================

  const cartItems = context.cartItems || [];

  // =====================================================
  // CUSTOMER FORM
  // =====================================================

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // =====================================================
  // SETTINGS
  // =====================================================

  const [settings, setSettings] =
    useState(defaultSettings);

  const [isLoadingSettings, setIsLoadingSettings] =
    useState(true);

  const [settingsError, setSettingsError] =
    useState("");

  // =====================================================
  // FORM STATES
  // =====================================================

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  // =====================================================
  // LOAD ADMIN SETTINGS
  // =====================================================

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoadingSettings(true);
        setSettingsError("");

        const response = await axios.get(
          SETTINGS_API_URL
        );

        if (
          response.data?.success &&
          response.data?.settings
        ) {
          const backendSettings =
            response.data.settings;

          setSettings({
            delivery: {
              ...defaultSettings.delivery,
              ...(backendSettings.delivery || {}),
            },

            order: {
              ...defaultSettings.order,
              ...(backendSettings.order || {}),
            },
          });
        }
      } catch (error) {
        console.error(
          "Fetch settings error:",
          error
        );

        setSettingsError(
          "Unable to load store settings. Please try again."
        );
      } finally {
        setIsLoadingSettings(false);
      }
    };

    fetchSettings();
  }, []);

  // =====================================================
  // CALCULATE SUBTOTAL
  // =====================================================

  const subtotal = cartItems.reduce(
    (total, item) => {
      const price = Number(
        item.price ||
          item.salePrice ||
          item.product?.price ||
          0
      );

      const quantity = Number(
        item.quantity || 1
      );

      return total + price * quantity;
    },
    0
  );

  // =====================================================
  // SETTINGS
  // =====================================================

  const deliverySettings =
    settings.delivery ||
    defaultSettings.delivery;

  const orderSettings =
    settings.order ||
    defaultSettings.order;

  // =====================================================
  // DELIVERY SETTINGS
  // =====================================================

  const deliveryEnabled =
    deliverySettings.deliveryEnabled !== false;

  const freeDeliveryEnabled =
    deliverySettings.freeDeliveryEnabled !== false;

  const deliveryChargeAmount = Number(
    deliverySettings.deliveryCharge || 0
  );

  const freeDeliveryAbove = Number(
    deliverySettings.freeDeliveryAbove || 0
  );

  const minimumOrderAmount = Number(
    deliverySettings.minimumOrderAmount || 0
  );

  const estimatedDeliveryTime =
    deliverySettings.estimatedDeliveryTime ||
    "30-45 minutes";

  // =====================================================
  // ORDER SETTINGS
  // =====================================================

  const acceptOrders =
    orderSettings.acceptOrders !== false;

  const cashOnDelivery =
    orderSettings.cashOnDelivery !== false;

  // =====================================================
  // FREE DELIVERY
  // =====================================================

  const isEligibleForFreeDelivery =
    freeDeliveryEnabled &&
    freeDeliveryAbove > 0 &&
    subtotal >= freeDeliveryAbove;

  // =====================================================
  // DELIVERY CHARGE
  // =====================================================

  const deliveryCharge =
    !deliveryEnabled ||
    isEligibleForFreeDelivery
      ? 0
      : deliveryChargeAmount;

  // =====================================================
  // TOTAL
  // =====================================================

  const total =
    subtotal + deliveryCharge;

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

  // =====================================================
  // VALIDATE FORM
  // =====================================================

  const validateForm = () => {
    const newErrors = {};

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName =
        "Full name is required";
    }

    // Mobile
    if (
      !/^[6-9]\d{9}$/.test(
        formData.mobile
      )
    ) {
      newErrors.mobile =
        "Enter a valid 10-digit mobile number";
    }

    // Email
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Enter a valid email address";
    }

    // Address
    if (!formData.address.trim()) {
      newErrors.address =
        "Address is required";
    }

    // City
    if (!formData.city.trim()) {
      newErrors.city =
        "City is required";
    }

    // State
    if (!formData.state.trim()) {
      newErrors.state =
        "State is required";
    }

    // Pincode
    if (
      !/^\d{6}$/.test(
        formData.pincode
      )
    ) {
      newErrors.pincode =
        "Enter a valid 6-digit pincode";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // =====================================================
  // GET PRODUCT ID
  // =====================================================

  const getProductId = (item) => {
    return (
      item.productId ||
      item._id ||
      item.id ||
      item.product?._id ||
      item.product?.id ||
      null
    );
  };

  // =====================================================
  // PLACE ORDER
  // =====================================================

  const placeOrder = async (event) => {
    event.preventDefault();

    // Empty cart
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      navigate("/cart");
      return;
    }

    // Settings loading
    if (isLoadingSettings) {
      alert(
        "Please wait while store settings are loading."
      );
      return;
    }

    // Settings error
    if (settingsError) {
      alert(
        "Store settings could not be loaded. Please try again."
      );
      return;
    }

    // Orders disabled
    if (!acceptOrders) {
      alert(
        "Sorry, orders are currently unavailable. Please try again later."
      );
      return;
    }

    // Delivery disabled
    if (!deliveryEnabled) {
      alert(
        "Delivery is currently unavailable. Please try again later."
      );
      return;
    }

    // Minimum order
    if (
      subtotal < minimumOrderAmount
    ) {
      alert(
        `Minimum order amount is ₹${minimumOrderAmount}. Your current subtotal is ₹${subtotal.toFixed(
          2
        )}.`
      );
      return;
    }

    // COD disabled
    if (!cashOnDelivery) {
      alert(
        "Cash on Delivery is currently unavailable. Please try again later."
      );
      return;
    }

    // Form validation
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // =================================================
      // CREATE ORDER ITEMS
      // =================================================

      const orderItems =
        cartItems.map(
          (item, index) => {
            const productId =
              getProductId(item);

            if (!productId) {
              throw new Error(
                `Product ID is missing for item ${
                  index + 1
                }. Please remove this product and add it again.`
              );
            }

            return {
              productId:
                String(productId),

              name:
                item.name ||
                item.product?.name ||
                "Product",

              brand:
                item.brand ||
                item.product?.brand ||
                "",

              image:
                item.image ||
                item.product?.image ||
                "",

              price: Number(
                item.price ||
                  item.salePrice ||
                  item.product?.price ||
                  0
              ),

              quantity: Number(
                item.quantity || 1
              ),
            };
          }
        );

      // =================================================
      // ORDER DETAILS
      // =================================================

      const orderDetails = {
        customer: formData,

        items: orderItems,

        subtotal: Number(
          subtotal.toFixed(2)
        ),

        deliveryCharge: Number(
          deliveryCharge.toFixed(2)
        ),

        total: Number(
          total.toFixed(2)
        ),
      };

      console.log(
        "Order details being sent:",
        orderDetails
      );

      // =================================================
      // SEND ORDER
      // =================================================

      const response =
        await axios.post(
          ORDERS_API_URL,
          orderDetails
        );

      // =================================================
      // SUCCESS
      // =================================================

      if (response.data?.success) {
        const savedOrder =
          response.data.order;

        // Clear cart
        if (
          typeof context.setCartItems ===
          "function"
        ) {
          context.setCartItems([]);
        }

        // Navigate to success page
        navigate(
          "/order-success",
          {
            state: {
              order: savedOrder,
            },
          }
        );
      } else {
        alert(
          response.data?.message ||
            "Failed to place order."
        );
      }
    } catch (error) {
      console.error(
        "Place order error:",
        error
      );

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Unable to place order. Please try again.";

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // =====================================================
  // EMPTY CART
  // =====================================================

  if (cartItems.length === 0) {
    return (
      <div className="container text-center py-5">
        <h2>
          Your cart is empty 🛒
        </h2>

        <p className="text-muted mt-3">
          Add products before proceeding
          to checkout.
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

  // =====================================================
  // LOADING SETTINGS
  // =====================================================

  if (isLoadingSettings) {
    return (
      <div className="container text-center py-5">
        <h4>
          Loading checkout settings...
        </h4>

        <p className="text-muted">
          Please wait.
        </p>
      </div>
    );
  }

  // =====================================================
  // SETTINGS ERROR
  // =====================================================

  if (settingsError) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-danger">
          {settingsError}
        </div>

        <Button
          variant="contained"
          className="btn-blue"
          onClick={() =>
            window.location.reload()
          }
        >
          Try Again
        </Button>
      </div>
    );
  }

  // =====================================================
  // CHECKOUT PAGE
  // =====================================================

  return (
    <div className="container py-4">

      <h2 className="font-weight-bold mb-4">
        Checkout
      </h2>

      {/* ORDERS DISABLED */}

      {!acceptOrders && (
        <div className="alert alert-warning">
          Orders are currently unavailable.
          Please try again later.
        </div>
      )}

      {/* DELIVERY DISABLED */}

      {!deliveryEnabled && (
        <div className="alert alert-warning">
          Delivery is currently unavailable.
          Please try again later.
        </div>
      )}

      {/* MINIMUM ORDER */}

      {subtotal < minimumOrderAmount && (
        <div className="alert alert-info">
          Minimum order amount is ₹
          {minimumOrderAmount}.
          Add ₹
          {(
            minimumOrderAmount -
            subtotal
          ).toFixed(2)}{" "}
          more to place your order.
        </div>
      )}

      {/* =================================================
          CHECKOUT FORM
      ================================================= */}

      <form onSubmit={placeOrder}>

        <div className="row">

          {/* =================================================
              DELIVERY DETAILS
          ================================================= */}

          <div className="col-md-7">

            <div className="card p-4 mb-4">

              <h4 className="font-weight-bold mb-4">
                Delivery Details
              </h4>

              {/* FULL NAME */}

              <div className="form-group mb-3">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={
                    formData.fullName
                  }
                  onChange={
                    handleChange
                  }
                />

                {errors.fullName && (
                  <small className="text-danger">
                    {
                      errors.fullName
                    }
                  </small>
                )}

              </div>

              {/* MOBILE */}

              <div className="form-group mb-3">

                <label>
                  Mobile Number
                </label>

                <input
                  type="tel"
                  name="mobile"
                  className="form-control"
                  placeholder="Enter 10-digit mobile number"
                  maxLength="10"
                  value={
                    formData.mobile
                  }
                  onChange={
                    handleChange
                  }
                />

                {errors.mobile && (
                  <small className="text-danger">
                    {errors.mobile}
                  </small>
                )}

              </div>

              {/* EMAIL */}

              <div className="form-group mb-3">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                />

                {errors.email && (
                  <small className="text-danger">
                    {errors.email}
                  </small>
                )}

              </div>

              {/* ADDRESS */}

              <div className="form-group mb-3">

                <label>
                  Complete Address
                </label>

                <textarea
                  name="address"
                  className="form-control"
                  rows="3"
                  placeholder="House number, street, area"
                  value={
                    formData.address
                  }
                  onChange={
                    handleChange
                  }
                />

                {errors.address && (
                  <small className="text-danger">
                    {
                      errors.address
                    }
                  </small>
                )}

              </div>

              {/* CITY + STATE */}

              <div className="row">

                <div className="col-md-6">

                  <div className="form-group mb-3">

                    <label>
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      placeholder="City"
                      value={
                        formData.city
                      }
                      onChange={
                        handleChange
                      }
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

                    <label>
                      State
                    </label>

                    <input
                      type="text"
                      name="state"
                      className="form-control"
                      placeholder="State"
                      value={
                        formData.state
                      }
                      onChange={
                        handleChange
                      }
                    />

                    {errors.state && (
                      <small className="text-danger">
                        {
                          errors.state
                        }
                      </small>
                    )}

                  </div>

                </div>

              </div>

              {/* PINCODE */}

              <div className="form-group mb-3">

                <label>
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  className="form-control"
                  placeholder="Enter 6-digit pincode"
                  maxLength="6"
                  value={
                    formData.pincode
                  }
                  onChange={
                    handleChange
                  }
                />

                {errors.pincode && (
                  <small className="text-danger">
                    {
                      errors.pincode
                    }
                  </small>
                )}

              </div>

            </div>

          </div>

          {/* =================================================
              ORDER SUMMARY
          ================================================= */}

          <div className="col-md-5">

            <div className="card p-4">

              <h4 className="font-weight-bold mb-4">
                Order Summary
              </h4>

              {/* CART ITEMS */}

              {cartItems.map(
                (item, index) => {
                  const itemPrice =
                    Number(
                      item.price ||
                        item.salePrice ||
                        item.product?.price ||
                        0
                    );

                  const itemQuantity =
                    Number(
                      item.quantity || 1
                    );

                  return (
                    <div
                      key={
                        item.productId ||
                        item._id ||
                        item.id ||
                        index
                      }
                      className="d-flex justify-content-between mb-3"
                    >

                      <div>

                        <p className="mb-1">
                          {item.name ||
                            item.product
                              ?.name ||
                            "Product"}
                        </p>

                        <small className="text-muted">
                          Quantity:{" "}
                          {
                            itemQuantity
                          }
                        </small>

                      </div>

                      <strong>
                        ₹
                        {(
                          itemPrice *
                          itemQuantity
                        ).toFixed(2)}
                      </strong>

                    </div>
                  );
                }
              )}

              <hr />

              {/* SUBTOTAL */}

              <div className="d-flex justify-content-between mb-3">

                <span>
                  Subtotal
                </span>

                <strong>
                  ₹
                  {subtotal.toFixed(
                    2
                  )}
                </strong>

              </div>

              {/* DELIVERY */}

              <div className="d-flex justify-content-between mb-3">

                <span>
                  Delivery
                </span>

                {deliveryCharge ===
                0 ? (
                  <strong className="text-success">
                    Free
                  </strong>
                ) : (
                  <strong>
                    ₹
                    {deliveryCharge.toFixed(
                      2
                    )}
                  </strong>
                )}

              </div>

              {/* FREE DELIVERY MESSAGE */}

              {isEligibleForFreeDelivery && (
                <small className="text-success mb-3 d-block">
                  Free delivery applied!
                </small>
              )}

              {/* ESTIMATED DELIVERY */}

              <div className="d-flex justify-content-between mb-3">

                <span>
                  Estimated Delivery
                </span>

                <strong>
                  {
                    estimatedDeliveryTime
                  }
                </strong>

              </div>

              <hr />

              {/* TOTAL */}

              <div className="d-flex justify-content-between mb-4">

                <h5>
                  Total
                </h5>

                <h5 className="text-danger">
                  ₹
                  {total.toFixed(
                    2
                  )}
                </h5>

              </div>

              {/* PAYMENT */}

              <div className="alert alert-info">

                <strong>
                  Payment Method:
                </strong>

                <br />

                {cashOnDelivery
                  ? "Cash on Delivery"
                  : "Cash on Delivery unavailable"}

              </div>

              {/* PLACE ORDER */}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="btn-blue"
                disabled={
                  isSubmitting ||
                  !acceptOrders ||
                  !deliveryEnabled ||
                  !cashOnDelivery ||
                  subtotal <
                    minimumOrderAmount
                }
              >
                {isSubmitting
                  ? "Placing Order..."
                  : "Place Order"}
              </Button>

              {/* RETURN CART */}

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