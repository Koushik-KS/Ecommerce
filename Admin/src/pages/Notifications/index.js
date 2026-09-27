
import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import { MdDoneAll } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FaBell } from "react-icons/fa";

const API_URL = "http://localhost:4000";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // =====================================================
  // FETCH NOTIFICATIONS
  // =====================================================

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await fetch(
        `${API_URL}/api/notifications`
      );

      const data = await response.json();

      console.log(
        "Notification API response:",
        data
      );

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to fetch notifications."
        );
      }

      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (error) {
      console.error(
        "Fetch notifications error:",
        error
      );

      setErrorMessage(
        "Unable to load notifications."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // =====================================================
  // MARK ONE NOTIFICATION AS READ
  // =====================================================

  const markNotificationAsRead = async (
    notificationId
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/api/notifications/${notificationId}/read`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to mark notification as read."
        );
      }

      setNotifications(
        (previousNotifications) =>
          previousNotifications.map(
            (notification) =>
              notification._id === notificationId
                ? {
                    ...notification,
                    isRead: true,
                  }
                : notification
          )
      );

      setUnreadCount((previousCount) =>
        Math.max(0, previousCount - 1)
      );
    } catch (error) {
      console.error(
        "Mark notification as read error:",
        error
      );
    }
  };

  // =====================================================
  // MARK ALL NOTIFICATIONS AS READ
  // =====================================================

  const markAllNotificationsAsRead = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/notifications/read-all`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to mark all notifications as read."
        );
      }

      setNotifications(
        (previousNotifications) =>
          previousNotifications.map(
            (notification) => ({
              ...notification,
              isRead: true,
            })
          )
      );

      setUnreadCount(0);
    } catch (error) {
      console.error(
        "Mark all notifications as read error:",
        error
      );
    }
  };

  // =====================================================
  // DELETE NOTIFICATION
  // =====================================================

  const deleteNotification = async (
    notificationId
  ) => {
    try {
      const notificationToDelete =
        notifications.find(
          (notification) =>
            notification._id === notificationId
        );

      const response = await fetch(
        `${API_URL}/api/notifications/${notificationId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to delete notification."
        );
      }

      setNotifications(
        (previousNotifications) =>
          previousNotifications.filter(
            (notification) =>
              notification._id !== notificationId
          )
      );

      if (
        notificationToDelete &&
        !notificationToDelete.isRead
      ) {
        setUnreadCount((previousCount) =>
          Math.max(0, previousCount - 1)
        );
      }
    } catch (error) {
      console.error(
        "Delete notification error:",
        error
      );
    }
  };

  // =====================================================
  // FORMAT NOTIFICATION TIME
  // =====================================================

  const formatNotificationTime = (createdAt) => {
    if (!createdAt) {
      return "";
    }

    return new Date(createdAt).toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };

  // =====================================================
  // NOTIFICATION ICON
  // =====================================================

  const getNotificationIcon = (type) => {
    if (type === "ORDER") {
      return "🛒";
    }

    if (type === "ORDER_STATUS") {
      return "📦";
    }

    if (type === "REVIEW") {
      return "⭐";
    }

    if (type === "LOW_STOCK") {
      return "⚠️";
    }

    return "🔔";
  };

  // =====================================================
  // LOAD NOTIFICATIONS
  // =====================================================

  useEffect(() => {
    fetchNotifications();
  }, []);

  // =====================================================
  // PAGE UI
  // =====================================================

  return (
    <div
      className="container-fluid"
      style={{
        padding: "85px 24px 30px",
        minHeight: "100vh",
      }}
    >

      {/* PAGE HEADER */}

      <div
        className="d-flex align-items-center justify-content-between mb-4"
        style={{
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <div>
          <h2
            style={{
              fontWeight: "700",
              marginBottom: "8px",
              color: "#263238",
            }}
          >
            Notifications
          </h2>

          <p
            style={{
              color: "#777",
              marginBottom: 0,
              fontSize: "14px",
            }}
          >
            Manage all your store notifications
          </p>
        </div>

        <div
          className="d-flex align-items-center"
          style={{
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              backgroundColor: "#e53935",
              color: "#ffffff",
              borderRadius: "20px",
              padding: "7px 14px",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            {unreadCount} Unread
          </span>

          <Button
            variant="contained"
            onClick={fetchNotifications}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* ACTION BAR */}

      <div
        className="d-flex align-items-center justify-content-between mb-3"
        style={{
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <h4
          style={{
            margin: 0,
            fontWeight: "600",
            color: "#263238",
          }}
        >
          All Notifications
        </h4>

        {unreadCount > 0 && (
          <Button
            variant="outlined"
            size="small"
            onClick={markAllNotificationsAsRead}
          >
            <MdDoneAll
              style={{
                marginRight: "5px",
              }}
            />

            Mark all as read
          </Button>
        )}
      </div>

      {/* NOTIFICATION CONTAINER */}

      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow:
            "0 2px 12px rgba(0, 0, 0, 0.08)",
          overflow: "hidden",
          width: "100%",
        }}
      >
        {isLoading ? (
          <div
            className="p-5 text-center"
            style={{
              color: "#777",
            }}
          >
            Loading notifications...
          </div>
        ) : errorMessage ? (
          <div
            className="p-5 text-center"
            style={{
              color: "#d32f2f",
            }}
          >
            {errorMessage}
          </div>
        ) : notifications.length === 0 ? (
          <div
            className="p-5 text-center"
            style={{
              color: "#777",
            }}
          >
            <FaBell
              style={{
                fontSize: "35px",
                marginBottom: "15px",
                color: "#aaa",
              }}
            />

            <h5>No notifications available</h5>

            <p
              style={{
                marginBottom: 0,
              }}
            >
              New orders, reviews, and updates
              will appear here.
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <React.Fragment key={notification._id}>
              <div
                className="d-flex align-items-start"
                style={{
                  gap: "15px",
                  padding: "20px",
                  backgroundColor:
                    notification.isRead
                      ? "#ffffff"
                      : "#f0f7ff",
                }}
              >

                {/* NOTIFICATION ICON */}

                <div
                  style={{
                    minWidth: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    backgroundColor: "#eef2ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                  }}
                >
                  {getNotificationIcon(
                    notification.type
                  )}
                </div>

                {/* NOTIFICATION CONTENT */}

                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{
                      flexWrap: "wrap",
                      gap: "5px",
                    }}
                  >
                    <h5
                      style={{
                        fontSize: "16px",
                        fontWeight:
                          notification.isRead
                            ? "500"
                            : "700",
                        marginBottom: "5px",
                        color: "#263238",
                      }}
                    >
                      {notification.title}
                    </h5>

                    {!notification.isRead && (
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#1976d2",
                          fontWeight: "600",
                          backgroundColor: "#e3f2fd",
                          borderRadius: "10px",
                          padding: "3px 8px",
                        }}
                      >
                        NEW
                      </span>
                    )}
                  </div>

                  <p
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      marginBottom: "8px",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {notification.message}
                  </p>

                  <p
                    style={{
                      fontSize: "12px",
                      color: "#888",
                      marginBottom: "12px",
                    }}
                  >
                    {formatNotificationTime(
                      notification.createdAt
                    )}
                  </p>

                  {/* ACTION BUTTONS */}

                  <div
                    className="d-flex align-items-center"
                    style={{
                      gap: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    {!notification.isRead && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() =>
                          markNotificationAsRead(
                            notification._id
                          )
                        }
                      >
                        <MdDoneAll
                          style={{
                            marginRight: "4px",
                          }}
                        />

                        Mark as read
                      </Button>
                    )}

                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() =>
                        deleteNotification(
                          notification._id
                        )
                      }
                    >
                      <MdDeleteOutline
                        style={{
                          marginRight: "4px",
                        }}
                      />

                      Delete
                    </Button>
                  </div>
                </div>
              </div>

              <Divider />
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;