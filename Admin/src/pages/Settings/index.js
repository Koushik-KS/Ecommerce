
import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  FiSettings,
  FiTruck,
  FiShoppingBag,
  FiUser,
  FiSave,
  FiMapPin,
  FiPhone,
  FiMail,
  FiInfo,
  FiHome,
  FiClock,
  FiCheckCircle,
  FiShield,
} from "react-icons/fi";

const API_URL = "http://localhost:4000";

const defaultSettings = {
  general: {
    storeName: "Sparsha Kitchen",
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

const menuItems = [
  {
    id: "general",
    label: "General Settings",
    icon: <FiSettings />,
  },
  {
    id: "delivery",
    label: "Delivery & Shipping",
    icon: <FiTruck />,
  },
  {
    id: "order",
    label: "Order Settings",
    icon: <FiShoppingBag />,
  },
  {
    id: "admin",
    label: "Admin Account",
    icon: <FiUser />,
  },
];

function Settings() {
  const [activeSection, setActiveSection] = useState("general");

  const [settings, setSettings] = useState(defaultSettings);

  const [admin, setAdmin] = useState({
    name: "Koushik Shetty",
    email: "admin@example.com",
    role: "Administrator",
    status: "Active",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API_URL}/api/settings`);

      if (response.data.success) {
        setSettings((previousSettings) => ({
          ...previousSettings,
          ...(response.data.settings || {}),
          general: {
            ...previousSettings.general,
            ...(response.data.settings?.general || {}),
          },
          delivery: {
            ...previousSettings.delivery,
            ...(response.data.settings?.delivery || {}),
          },
          order: {
            ...previousSettings.order,
            ...(response.data.settings?.order || {}),
          },
        }));

        if (response.data.admin) {
          setAdmin(response.data.admin);
        }
      }
    } catch (err) {
      console.error("Fetch settings error:", err);
      setError("Unable to load settings. Please check the backend server.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    setSettings((previousSettings) => ({
      ...previousSettings,
      [section]: {
        ...previousSettings[section],
        [field]: value,
      },
    }));

    setMessage("");
    setError("");
  };

  const handleNumberChange = (section, field, value) => {
    const numberValue = value === "" ? 0 : Number(value);

    handleInputChange(section, field, numberValue);
  };

  const handleToggleChange = (section, field) => {
    setSettings((previousSettings) => ({
      ...previousSettings,
      [section]: {
        ...previousSettings[section],
        [field]: !previousSettings[section][field],
      },
    }));

    setMessage("");
    setError("");
  };

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

        if (response.data.settings) {
          setSettings((previousSettings) => ({
            ...previousSettings,
            ...response.data.settings,
          }));
        }
      }
    } catch (err) {
      console.error("Save settings error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to save settings. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const renderTextField = (
    section,
    field,
    label,
    placeholder = "",
    type = "text"
  ) => {
    return (
      <div className="settings-field">
        <label>{label}</label>

        <input
          type={type}
          value={settings[section]?.[field] ?? ""}
          placeholder={placeholder}
          onChange={(event) =>
            handleInputChange(section, field, event.target.value)
          }
        />
      </div>
    );
  };

  const renderNumberField = (
    section,
    field,
    label,
    placeholder = "0"
  ) => {
    return (
      <div className="settings-field">
        <label>{label}</label>

        <input
          type="number"
          min="0"
          value={settings[section]?.[field] ?? 0}
          placeholder={placeholder}
          onChange={(event) =>
            handleNumberChange(section, field, event.target.value)
          }
        />
      </div>
    );
  };

  const renderToggle = (section, field, title, description) => {
    return (
      <div className="settings-toggle-row">
        <div className="settings-toggle-info">
          <h4>{title}</h4>
          <p>{description}</p>
        </div>

        <label className="settings-switch">
          <input
            type="checkbox"
            checked={Boolean(settings[section]?.[field])}
            onChange={() => handleToggleChange(section, field)}
          />

          <span className="settings-slider"></span>
        </label>
      </div>
    );
  };

  const renderGeneralSettings = () => {
    return (
      <div className="settings-form">
        <h3>
          <FiHome /> General Settings
        </h3>

        <p className="section-description">
          Manage your store information and business contact details.
        </p>

        <div className="settings-grid">
          {renderTextField(
            "general",
            "storeName",
            "Store Name",
            "Enter store name"
          )}

          {renderTextField(
            "general",
            "email",
            "Email Address",
            "Enter email address",
            "email"
          )}

          {renderTextField(
            "general",
            "phone",
            "Phone Number",
            "Enter phone number",
            "tel"
          )}

          {renderTextField(
            "general",
            "city",
            "City",
            "Enter city"
          )}

          {renderTextField(
            "general",
            "state",
            "State",
            "Enter state"
          )}

          {renderTextField(
            "general",
            "pincode",
            "Pincode",
            "Enter pincode"
          )}

          <div className="settings-field full-width">
            <label>
              <FiMapPin /> Address
            </label>

            <textarea
              value={settings.general.address}
              placeholder="Enter complete business address"
              onChange={(event) =>
                handleInputChange(
                  "general",
                  "address",
                  event.target.value
                )
              }
            ></textarea>
          </div>

          <div className="settings-field full-width">
            <label>
              <FiInfo /> Store Description
            </label>

            <textarea
              value={settings.general.description}
              placeholder="Enter store description"
              onChange={(event) =>
                handleInputChange(
                  "general",
                  "description",
                  event.target.value
                )
              }
            ></textarea>
          </div>
        </div>
      </div>
    );
  };

  const renderDeliverySettings = () => {
    return (
      <div className="settings-form">
        <h3>
          <FiTruck /> Delivery & Shipping
        </h3>

        <p className="section-description">
          Configure delivery charges, minimum order amounts, and delivery
          availability.
        </p>

        <div className="settings-grid">
          {renderNumberField(
            "delivery",
            "deliveryCharge",
            "Delivery Charge (₹)"
          )}

          {renderNumberField(
            "delivery",
            "freeDeliveryAbove",
            "Free Delivery Above (₹)"
          )}

          {renderNumberField(
            "delivery",
            "minimumOrderAmount",
            "Minimum Order Amount (₹)"
          )}

          {renderTextField(
            "delivery",
            "estimatedDeliveryTime",
            "Estimated Delivery Time",
            "Example: 30-45 minutes"
          )}
        </div>

        <div className="settings-toggle-list">
          {renderToggle(
            "delivery",
            "deliveryEnabled",
            "Enable Delivery",
            "Allow customers to place delivery orders."
          )}

          {renderToggle(
            "delivery",
            "freeDeliveryEnabled",
            "Enable Free Delivery",
            "Allow free delivery when the minimum amount is reached."
          )}
        </div>
      </div>
    );
  };

  const renderOrderSettings = () => {
    return (
      <div className="settings-form">
        <h3>
          <FiShoppingBag /> Order Settings
        </h3>

        <p className="section-description">
          Manage order acceptance and available payment options.
        </p>

        <div className="settings-grid">
          <div className="settings-field">
            <label>Default Order Status</label>

            <select
              value={settings.order.defaultStatus}
              onChange={(event) =>
                handleInputChange(
                  "order",
                  "defaultStatus",
                  event.target.value
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
        </div>

        <div className="settings-toggle-list">
          {renderToggle(
            "order",
            "acceptOrders",
            "Accept Orders",
            "Allow customers to place new orders."
          )}

          {renderToggle(
            "order",
            "cashOnDelivery",
            "Cash on Delivery",
            "Allow customers to pay through cash on delivery."
          )}

          {renderToggle(
            "order",
            "autoCancelEnabled",
            "Automatic Order Cancellation",
            "Enable automatic cancellation based on your backend rules."
          )}
        </div>
      </div>
    );
  };

  const renderAdminAccount = () => {
    return (
      <div className="settings-form">
        <h3>
          <FiShield /> Admin Account
        </h3>

        <p className="section-description">
          View your administrator account information.
        </p>

        <div className="admin-account-card">
          <div className="admin-avatar">
            <FiUser size={30} />
          </div>

          <div className="admin-account-details">
            <h3>{admin.name}</h3>

            <div className="admin-account-meta">
              <p>
                <FiMail /> <strong>Email:</strong> {admin.email}
              </p>

              <p>
                <FiShield /> <strong>Role:</strong> {admin.role}
              </p>

              <p>
                <FiCheckCircle /> <strong>Status:</strong> {admin.status}
              </p>
            </div>
          </div>
        </div>

        <div className="admin-account-notice">
          <FiInfo /> Your administrator password is protected and is not
          displayed on this page. To change the password, use a separate
          secure password management feature.
        </div>
      </div>
    );
  };

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

  if (loading) {
    return (
      <div className="settings-loading">
        Loading settings...
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>Settings</h2>

        <p>
          Manage your Sparsha Kitchen store settings from one place.
        </p>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}

      <div className="settings-container">
        <aside className="settings-sidebar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`settings-nav-item ${
                activeSection === item.id ? "active" : ""
              }`}
              onClick={() => {
                setActiveSection(item.id);
                setMessage("");
                setError("");
              }}
            >
              <span className="settings-nav-icon">
                {item.icon}
              </span>

              <span>{item.label}</span>
            </button>
          ))}
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
                <FiSave />

                {saving ? "Saving..." : "Save Settings"}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Settings;