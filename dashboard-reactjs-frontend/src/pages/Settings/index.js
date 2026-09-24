
import React, { useEffect, useState } from "react";
import axios from "axios";


const API_URL = "http://localhost:4000";

const defaultSettings = {
  general: {
    storeName: "",
    description: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  },

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

const Settings = () => {
  const [activeSection, setActiveSection] = useState("general");

  const [settings, setSettings] = useState(defaultSettings);

  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =====================================================
  // LOAD SETTINGS
  // =====================================================

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/api/settings`
      );

      if (response.data.success) {
        setSettings({
          general: {
            ...defaultSettings.general,
            ...(response.data.settings.general || {}),
          },

          delivery: {
            ...defaultSettings.delivery,
            ...(response.data.settings.delivery || {}),
          },

          order: {
            ...defaultSettings.order,
            ...(response.data.settings.order || {}),
          },
        });

        setAdmin({
          name: response.data.admin?.name || "",
          email: response.data.admin?.email || "",
          role: response.data.admin?.role || "",
          status: response.data.admin?.status || "",
        });
      }
    } catch (err) {
      console.error("Failed to load settings:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load settings. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (section, field, value) => {
    setSettings((previousSettings) => ({
      ...previousSettings,

      [section]: {
        ...previousSettings[section],
        [field]: value,
      },
    }));
  };

  // =====================================================
  // HANDLE NUMBER CHANGE
  // =====================================================

  const handleNumberChange = (section, field, value) => {
    const numberValue =
      value === "" ? 0 : Number(value);

    handleChange(section, field, numberValue);
  };

  // =====================================================
  // SAVE SETTINGS
  // =====================================================

  const saveSettings = async () => {
    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response = await axios.put(
        `${API_URL}/api/settings`,
        settings
      );

      if (response.data.success) {
        setMessage("Settings saved successfully.");

        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } catch (err) {
      console.error("Failed to save settings:", err);

      setError(
        err.response?.data?.message ||
          "Failed to save settings. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // GENERAL SETTINGS
  // =====================================================

  const renderGeneralSettings = () => {
    const general = settings.general;

    return (
      <div className="settings-form">
        <div className="settings-section-header">
          <h2>General Settings</h2>
          <p>
            Manage your store information and contact details.
          </p>
        </div>

        <div className="settings-grid">
          <div className="settings-field">
            <label>Store Name</label>

            <input
              type="text"
              value={general.storeName}
              onChange={(e) =>
                handleChange(
                  "general",
                  "storeName",
                  e.target.value
                )
              }
              placeholder="Enter store name"
            />
          </div>

          <div className="settings-field">
            <label>Email Address</label>

            <input
              type="email"
              value={general.email}
              onChange={(e) =>
                handleChange(
                  "general",
                  "email",
                  e.target.value
                )
              }
              placeholder="Enter store email"
            />
          </div>

          <div className="settings-field">
            <label>Phone Number</label>

            <input
              type="text"
              value={general.phone}
              onChange={(e) =>
                handleChange(
                  "general",
                  "phone",
                  e.target.value
                )
              }
              placeholder="Enter phone number"
            />
          </div>

          <div className="settings-field">
            <label>City</label>

            <input
              type="text"
              value={general.city}
              onChange={(e) =>
                handleChange(
                  "general",
                  "city",
                  e.target.value
                )
              }
              placeholder="Enter city"
            />
          </div>

          <div className="settings-field">
            <label>State</label>

            <input
              type="text"
              value={general.state}
              onChange={(e) =>
                handleChange(
                  "general",
                  "state",
                  e.target.value
                )
              }
              placeholder="Enter state"
            />
          </div>

          <div className="settings-field">
            <label>Pincode</label>

            <input
              type="text"
              value={general.pincode}
              onChange={(e) =>
                handleChange(
                  "general",
                  "pincode",
                  e.target.value
                )
              }
              placeholder="Enter pincode"
            />
          </div>
        </div>

        <div className="settings-field full-width">
          <label>Store Address</label>

          <textarea
            value={general.address}
            onChange={(e) =>
              handleChange(
                "general",
                "address",
                e.target.value
              )
            }
            placeholder="Enter store address"
            rows="3"
          />
        </div>

        <div className="settings-field full-width">
          <label>Store Description</label>

          <textarea
            value={general.description}
            onChange={(e) =>
              handleChange(
                "general",
                "description",
                e.target.value
              )
            }
            placeholder="Enter store description"
            rows="4"
          />
        </div>
      </div>
    );
  };

  // =====================================================
  // DELIVERY SETTINGS
  // =====================================================

  const renderDeliverySettings = () => {
    const delivery = settings.delivery;

    return (
      <div className="settings-form">
        <div className="settings-section-header">
          <h2>Delivery & Shipping</h2>

          <p>
            Manage delivery charges, minimum orders,
            and delivery availability.
          </p>
        </div>

        <div className="settings-grid">
          <div className="settings-field">
            <label>Delivery Charge (₹)</label>

            <input
              type="number"
              min="0"
              value={delivery.deliveryCharge}
              onChange={(e) =>
                handleNumberChange(
                  "delivery",
                  "deliveryCharge",
                  e.target.value
                )
              }
            />
          </div>

          <div className="settings-field">
            <label>Free Delivery Above (₹)</label>

            <input
              type="number"
              min="0"
              value={delivery.freeDeliveryAbove}
              onChange={(e) =>
                handleNumberChange(
                  "delivery",
                  "freeDeliveryAbove",
                  e.target.value
                )
              }
            />
          </div>

          <div className="settings-field">
            <label>Minimum Order Amount (₹)</label>

            <input
              type="number"
              min="0"
              value={delivery.minimumOrderAmount}
              onChange={(e) =>
                handleNumberChange(
                  "delivery",
                  "minimumOrderAmount",
                  e.target.value
                )
              }
            />
          </div>

          <div className="settings-field">
            <label>Estimated Delivery Time</label>

            <input
              type="text"
              value={delivery.estimatedDeliveryTime}
              onChange={(e) =>
                handleChange(
                  "delivery",
                  "estimatedDeliveryTime",
                  e.target.value
                )
              }
              placeholder="Example: 30-45 minutes"
            />
          </div>
        </div>

        <div className="settings-toggle-list">
          <div className="settings-toggle-row">
            <div>
              <h4>Enable Delivery</h4>

              <p>
                Allow customers to place delivery orders.
              </p>
            </div>

            <label className="settings-switch">
              <input
                type="checkbox"
                checked={delivery.deliveryEnabled}
                onChange={(e) =>
                  handleChange(
                    "delivery",
                    "deliveryEnabled",
                    e.target.checked
                  )
                }
              />

              <span className="settings-slider"></span>
            </label>
          </div>

          <div className="settings-toggle-row">
            <div>
              <h4>Enable Free Delivery</h4>

              <p>
                Enable free delivery when the order
                reaches the required amount.
              </p>
            </div>

            <label className="settings-switch">
              <input
                type="checkbox"
                checked={delivery.freeDeliveryEnabled}
                onChange={(e) =>
                  handleChange(
                    "delivery",
                    "freeDeliveryEnabled",
                    e.target.checked
                  )
                }
              />

              <span className="settings-slider"></span>
            </label>
          </div>
        </div>
      </div>
    );
  };

  // =====================================================
  // ORDER SETTINGS
  // =====================================================

  const renderOrderSettings = () => {
    const order = settings.order;

    return (
      <div className="settings-form">
        <div className="settings-section-header">
          <h2>Order Settings</h2>

          <p>
            Manage order availability and payment options.
          </p>
        </div>

        <div className="settings-field">
          <label>Default Order Status</label>

          <select
            value={order.defaultStatus}
            onChange={(e) =>
              handleChange(
                "order",
                "defaultStatus",
                e.target.value
              )
            }
          >
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PROCESSING">Processing</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        <div className="settings-toggle-list">
          <div className="settings-toggle-row">
            <div>
              <h4>Accept Orders</h4>

              <p>
                Allow customers to place new orders.
              </p>
            </div>

            <label className="settings-switch">
              <input
                type="checkbox"
                checked={order.acceptOrders}
                onChange={(e) =>
                  handleChange(
                    "order",
                    "acceptOrders",
                    e.target.checked
                  )
                }
              />

              <span className="settings-slider"></span>
            </label>
          </div>

          <div className="settings-toggle-row">
            <div>
              <h4>Cash on Delivery</h4>

              <p>
                Allow customers to pay when the order
                is delivered.
              </p>
            </div>

            <label className="settings-switch">
              <input
                type="checkbox"
                checked={order.cashOnDelivery}
                onChange={(e) =>
                  handleChange(
                    "order",
                    "cashOnDelivery",
                    e.target.checked
                  )
                }
              />

              <span className="settings-slider"></span>
            </label>
          </div>

          <div className="settings-toggle-row">
            <div>
              <h4>Automatic Order Cancellation</h4>

              <p>
                Enable automatic cancellation for
                eligible orders.
              </p>
            </div>

            <label className="settings-switch">
              <input
                type="checkbox"
                checked={order.autoCancelEnabled}
                onChange={(e) =>
                  handleChange(
                    "order",
                    "autoCancelEnabled",
                    e.target.checked
                  )
                }
              />

              <span className="settings-slider"></span>
            </label>
          </div>
        </div>
      </div>
    );
  };

  // =====================================================
  // ADMIN ACCOUNT
  // =====================================================

  const renderAdminAccount = () => {
    return (
      <div className="settings-form">
        <div className="settings-section-header">
          <h2>Admin Account</h2>

          <p>
            View your administrator account information.
          </p>
        </div>

        <div className="admin-account-card">
          <div className="admin-avatar">
            {admin.name
              ? admin.name.charAt(0).toUpperCase()
              : "A"}
          </div>

          <div className="admin-account-details">
            <h3>{admin.name || "Administrator"}</h3>

            <p>{admin.email || "Email not available"}</p>

            <div className="admin-account-meta">
              <span>
                <strong>Role:</strong>{" "}
                {admin.role || "Administrator"}
              </span>

              <span>
                <strong>Status:</strong>{" "}
                {admin.status || "Active"}
              </span>
            </div>
          </div>
        </div>

        <div className="admin-account-notice">
          <strong>Account Security</strong>

          <p>
            Your administrator password is protected
            and is not displayed on this page.
          </p>
        </div>
      </div>
    );
  };

  // =====================================================
  // RENDER ACTIVE SECTION
  // =====================================================

  const renderActiveSection = () => {
    switch (activeSection) {
      case "general":
        return renderGeneralSettings();

      case "delivery":
        return renderDeliverySettings();

      case "order":
        return renderOrderSettings();

      case "admin":
        return renderAdminAccount();

      default:
        return renderGeneralSettings();
    }
  };

  // =====================================================
  // LOADING SCREEN
  // =====================================================

  if (loading) {
    return (
      <div className="settings-page">
        <div className="settings-loading">
          Loading settings...
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div>
          <h1>Settings</h1>

          <p>
            Manage your store and administrator settings.
          </p>
        </div>

        <button
          type="button"
          className="settings-refresh-btn"
          onClick={fetchSettings}
        >
          ↻ Refresh
        </button>
      </div>

      {message && (
        <div className="settings-alert settings-success">
          {message}
        </div>
      )}

      {error && (
        <div className="settings-alert settings-error">
          {error}
        </div>
      )}

      <div className="settings-container">
        <aside className="settings-sidebar">
          <button
            type="button"
            className={
              activeSection === "general"
                ? "settings-nav-item active"
                : "settings-nav-item"
            }
            onClick={() => setActiveSection("general")}
          >
            <span>⚙️</span>
            General Settings
          </button>

          <button
            type="button"
            className={
              activeSection === "delivery"
                ? "settings-nav-item active"
                : "settings-nav-item"
            }
            onClick={() => setActiveSection("delivery")}
          >
            <span>🚚</span>
            Delivery & Shipping
          </button>

          <button
            type="button"
            className={
              activeSection === "order"
                ? "settings-nav-item active"
                : "settings-nav-item"
            }
            onClick={() => setActiveSection("order")}
          >
            <span>📦</span>
            Order Settings
          </button>

          <button
            type="button"
            className={
              activeSection === "admin"
                ? "settings-nav-item active"
                : "settings-nav-item"
            }
            onClick={() => setActiveSection("admin")}
          >
            <span>👤</span>
            Admin Account
          </button>
        </aside>

        <main className="settings-content">
          {renderActiveSection()}

          {activeSection !== "admin" && (
            <div className="settings-actions">
              <button
                type="button"
                className="settings-save-btn"
                onClick={saveSettings}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Settings;