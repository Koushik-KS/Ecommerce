
import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.jpg";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";

import { MdMenuOpen } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { IoIosCart } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { MdDoneAll } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";

import { BsShieldFillExclamation } from "react-icons/bs";

import SearchBox from "../SearchBox";
import { MyContext } from "../../App";
import UserAvatarImgComponent from "../userAvatarImg";

// =====================================================
// API URL
// =====================================================

const API_URL = "http://localhost:4000";

// =====================================================
// HEADER COMPONENT
// =====================================================

const Header = () => {
  const context = useContext(MyContext);

  // ===================================================
  // ACCOUNT MENU STATE
  // ===================================================

  const [anchorEl, setAnchorEl] = useState(null);

  const openMyAcc = Boolean(anchorEl);

  // ===================================================
  // NOTIFICATION MENU STATE
  // ===================================================

  const [
    notificationAnchorEl,
    setNotificationAnchorEl,
  ] = useState(null);

  const [
    notifications,
    setNotifications,
  ] = useState([]);

  const [
    unreadCount,
    setUnreadCount,
  ] = useState(0);

  const [
    isLoadingNotifications,
    setIsLoadingNotifications,
  ] = useState(false);

  const [
    notificationError,
    setNotificationError,
  ] = useState("");

  const openNotifications = Boolean(
    notificationAnchorEl
  );

  // ===================================================
  // ACCOUNT MENU HANDLERS
  // ===================================================

  const handleOpenMyAccDrop = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMyAccDrop = () => {
    setAnchorEl(null);
  };

  // ===================================================
  // NOTIFICATION MENU HANDLERS
  // ===================================================

  const handleOpenNotificationsDrop = (event) => {
    setNotificationAnchorEl(event.currentTarget);

    fetchNotifications();
  };

  const handleCloseNotificationsDrop = () => {
    setNotificationAnchorEl(null);
  };

  // ===================================================
  // FETCH ALL NOTIFICATIONS
  // ===================================================

  const fetchNotifications = async () => {
    try {
      setIsLoadingNotifications(true);
      setNotificationError("");

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

      setNotificationError(
        "Unable to load notifications."
      );
    } finally {
      setIsLoadingNotifications(false);
    }
  };

  // ===================================================
  // FETCH UNREAD COUNT
  // ===================================================

  const fetchUnreadCount = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/notifications/unread-count`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to fetch unread count."
        );
      }

      setUnreadCount(data.unreadCount || 0);
    } catch (error) {
      console.error(
        "Fetch unread count error:",
        error
      );
    }
  };

  // ===================================================
  // MARK ONE NOTIFICATION AS READ
  // ===================================================

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

  // ===================================================
  // MARK ALL NOTIFICATIONS AS READ
  // ===================================================

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

  // ===================================================
  // DELETE ONE NOTIFICATION
  // ===================================================

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

  // ===================================================
  // FORMAT NOTIFICATION TIME
  // ===================================================

  const formatNotificationTime = (createdAt) => {
    if (!createdAt) {
      return "";
    }

    const notificationDate = new Date(
      createdAt
    );

    return notificationDate.toLocaleString(
      "en-IN",
      {
        dateStyle: "short",
        timeStyle: "short",
      }
    );
  };

  // ===================================================
  // NOTIFICATION ICON
  // ===================================================

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

  // ===================================================
  // LOAD NOTIFICATIONS ON COMPONENT LOAD
  // ===================================================

  useEffect(() => {
    fetchNotifications();

    const notificationInterval = setInterval(
      () => {
        fetchUnreadCount();
      },
      30000
    );

    return () => {
      clearInterval(notificationInterval);
    };
  }, []);

  // ===================================================
  // RETURN UI
  // ===================================================

  return (
    <header className="d-flex align-items-center">
      <div className="container-fluid w-100">
        <div className="row d-flex align-items-center w-100">

          {/* LOGO */}

          <div className="col-sm-2 part1">
            <Link
              to="/"
              className="d-flex align-items-center logo"
            >
              <img
                src={logo}
                alt="Store Logo"
                style={{
                  width: "60px",
                  height: "60px",
                }}
              />

              <span
                style={{
                  marginLeft: "4px",
                }}
              >
                STORE
              </span>
            </Link>
          </div>

          {/* MENU AND SEARCH */}

          <div className="col-sm-4 d-flex align-items-center part2">
            <Button
              className="rounded-circle"
              onClick={() =>
                context.setIsToggleSidebar(
                  !context.isToggleSidebar
                )
              }
            >
              {context.isToggleSidebar === false ? (
                <MdMenuOpen />
              ) : (
                <IoMenu />
              )}
            </Button>

            <SearchBox />
          </div>

          {/* RIGHT SECTION */}

          <div
            className="col-sm-6 d-flex align-items-center justify-content-end part3"
            style={{
              gap: "8px",
            }}
          >

            {/* THEME BUTTON */}

            <Button
              className="rounded-circle"
              onClick={() =>
                context.setThemeMode(
                  !context.themeMode
                )
              }
            >
              <CiLight />
            </Button>

            {/* CART BUTTON */}

            <Button className="rounded-circle">
              <IoIosCart />
            </Button>

            {/* EMAIL BUTTON */}

            <Button className="rounded-circle">
              <MdOutlineMailOutline />
            </Button>

            {/* NOTIFICATION BUTTON */}

            <div
              className="dropdownWrapper position-relative"
            >
              <Button
                className="rounded-circle"
                onClick={
                  handleOpenNotificationsDrop
                }
                aria-label="Open notifications"
              >
                <FaRegBell />

                {unreadCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-2px",
                      right: "-2px",
                      backgroundColor: "#e53935",
                      color: "#ffffff",
                      borderRadius: "50%",
                      minWidth: "19px",
                      height: "19px",
                      padding: "2px",
                      fontSize: "11px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {unreadCount > 99
                      ? "99+"
                      : unreadCount}
                  </span>
                )}
              </Button>

              {/* NOTIFICATION MENU */}

              <Menu
                anchorEl={notificationAnchorEl}
                id="notifications"
                open={openNotifications}
                onClose={
                  handleCloseNotificationsDrop
                }
                transformOrigin={{
                  horizontal: "right",
                  vertical: "top",
                }}
                anchorOrigin={{
                  horizontal: "right",
                  vertical: "bottom",
                }}
                PaperProps={{
                  style: {
                    width: "390px",
                    maxWidth: "95vw",
                    maxHeight: "520px",
                  },
                }}
              >

                {/* MENU HEADER */}

                <div
                  className="px-3 pt-2 pb-2 d-flex align-items-center justify-content-between"
                >
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "18px",
                    }}
                  >
                    Notifications
                  </h4>

                  {unreadCount > 0 && (
                    <Button
                      size="small"
                      onClick={
                        markAllNotificationsAsRead
                      }
                    >
                      <MdDoneAll
                        style={{
                          marginRight: "4px",
                        }}
                      />

                      Mark all read
                    </Button>
                  )}
                </div>

                <Divider />

                {/* NOTIFICATION LIST */}

                <div
                  style={{
                    maxHeight: "360px",
                    overflowY: "auto",
                  }}
                >
                  {isLoadingNotifications ? (
                    <div
                      className="p-3 text-center"
                      style={{
                        minWidth: "300px",
                      }}
                    >
                      Loading notifications...
                    </div>
                  ) : notificationError ? (
                    <div
                      className="p-3 text-center"
                      style={{
                        minWidth: "300px",
                        color: "#d32f2f",
                      }}
                    >
                      {notificationError}
                    </div>
                  ) : notifications.length === 0 ? (
                    <div
                      className="p-3 text-center"
                      style={{
                        minWidth: "300px",
                      }}
                    >
                      No notifications available.
                    </div>
                  ) : (
                    notifications.map(
                      (notification) => (
                        <MenuItem
                          key={notification._id}
                          style={{
                            whiteSpace: "normal",
                            alignItems: "flex-start",
                            backgroundColor:
                              notification.isRead
                                ? "transparent"
                                : "#f0f7ff",
                            padding: "12px",
                          }}
                          onClick={() => {
                            if (
                              !notification.isRead
                            ) {
                              markNotificationAsRead(
                                notification._id
                              );
                            }
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              gap: "10px",
                            }}
                          >

                            {/* NOTIFICATION ICON */}

                            <div
                              style={{
                                fontSize: "22px",
                                minWidth: "30px",
                              }}
                            >
                              {getNotificationIcon(
                                notification.type
                              )}
                            </div>

                            {/* NOTIFICATION DETAILS */}

                            <div
                              style={{
                                flex: 1,
                                minWidth: 0,
                              }}
                            >
                              <h4
                                style={{
                                  fontSize: "14px",
                                  fontWeight:
                                    notification.isRead
                                      ? "500"
                                      : "700",
                                  margin: "0 0 5px",
                                }}
                              >
                                {notification.title}
                              </h4>

                              <p
                                style={{
                                  fontSize: "13px",
                                  margin: "0 0 5px",
                                  overflowWrap:
                                    "anywhere",
                                }}
                              >
                                {notification.message}
                              </p>

                              <p
                                style={{
                                  fontSize: "11px",
                                  color: "#777",
                                  margin: 0,
                                }}
                              >
                                {formatNotificationTime(
                                  notification.createdAt
                                )}
                              </p>
                            </div>

                            {/* DELETE BUTTON */}

                            <Button
                              size="small"
                              onClick={(event) => {
                                event.stopPropagation();

                                deleteNotification(
                                  notification._id
                                );
                              }}
                              style={{
                                minWidth: "30px",
                                padding: "4px",
                              }}
                              aria-label="Delete notification"
                            >
                              <MdDeleteOutline />
                            </Button>
                          </div>
                        </MenuItem>
                      )
                    )
                  )}
                </div>

                <Divider />

                {/* FOOTER */}

                <div
                  className="px-3 pt-2 pb-2"
                >
                  <Button
                    className="btn-blue w-100"
                    onClick={() => {
                      fetchNotifications();
                    }}
                  >
                    Refresh Notifications
                  </Button>
                </div>
              </Menu>
            </div>

            {/* SIGN IN OR ADMIN ACCOUNT */}

            {context.isLogin !== true ? (
              <Link to="/login">
                <Button className="btn-blue btn-round">
                  Sign In
                </Button>
              </Link>
            ) : (
              <div className="myAccWrapper">
                <Button
                  className="myAcc d-flex align-items-center"
                  onClick={handleOpenMyAccDrop}
                >
                  <div>
                    <UserAvatarImgComponent
                      img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTx3SRpQ8G8mKf3SUHnnn5mzgz7jx2WnePnA&s"
                    />
                  </div>

                  <div className="userInfo">
                    <h4>Koushik Shetty</h4>

                    <p className="mb-0">
                      @koushikshetty
                    </p>
                  </div>
                </Button>

                {/* ACCOUNT MENU */}

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={openMyAcc}
                  onClose={handleCloseMyAccDrop}
                  onClick={handleCloseMyAccDrop}
                  transformOrigin={{
                    horizontal: "right",
                    vertical: "top",
                  }}
                  anchorOrigin={{
                    horizontal: "right",
                    vertical: "bottom",
                  }}
                >
                  <MenuItem
                    onClick={handleCloseMyAccDrop}
                  >
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>

                    My Account
                  </MenuItem>

                  <MenuItem
                    onClick={handleCloseMyAccDrop}
                  >
                    <ListItemIcon>
                      <BsShieldFillExclamation />
                    </ListItemIcon>

                    Reset Password
                  </MenuItem>

                  <MenuItem
                    onClick={handleCloseMyAccDrop}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>

                    Logout
                  </MenuItem>
                </Menu>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;