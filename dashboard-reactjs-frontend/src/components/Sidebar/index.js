
import Button from "@mui/material/Button";

import { RiDashboardFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { FaProductHunt } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);
  const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);

  // =====================================================
  // OPEN / CLOSE SUBMENU
  // =====================================================

  const isOpenSubmenu = (index) => {
    if (activeTab === index) {
      setIsToggleSubmenu(!isToggleSubmenu);
    } else {
      setActiveTab(index);
      setIsToggleSubmenu(true);
    }
  };

  // =====================================================
  // CHECK ACTIVE PRODUCT ROUTE
  // =====================================================

  const isProductRoute =
    location.pathname.startsWith("/products") ||
    location.pathname.startsWith("/product/") ||
    location.pathname.startsWith("/category/");

  // =====================================================
  // PRODUCT VIEW
  // Opens the last product selected through Eye button
  // =====================================================

  const handleProductView = (event) => {
    event.preventDefault();

    setActiveTab(1);
    setIsToggleSubmenu(true);

    const lastViewedProductId = localStorage.getItem(
      "lastViewedProductId"
    );

    if (lastViewedProductId) {
      navigate(
        `/product/details/${lastViewedProductId}`
      );
    } else {
      alert(
        "Please click the Eye button for a product first."
      );

      navigate("/products");
    }
  };

  return (
    <div className="sidebar">
      <ul>
        {/* =====================================================
            DASHBOARD
        ===================================================== */}

        <li>
          <Link to="/dashboard">
            <Button
              className={`w-100 ${
                location.pathname === "/dashboard" ||
                location.pathname === "/"
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                setActiveTab(0);
                setIsToggleSubmenu(false);
              }}
            >
              <span className="icon">
                <RiDashboardFill />
              </span>

              Dashboard

              <span className="arrow">
                <IoIosArrowForward />
              </span>
            </Button>
          </Link>
        </li>

        {/* =====================================================
            PRODUCTS
        ===================================================== */}

        <li>
          <Button
            className={`w-100 ${
              activeTab === 1 && isToggleSubmenu
                ? "active"
                : isProductRoute
                ? "active"
                : ""
            }`}
            onClick={() => isOpenSubmenu(1)}
          >
            <span className="icon">
              <FaProductHunt />
            </span>

            Products

            <span className="arrow">
              <IoIosArrowForward />
            </span>
          </Button>

          <div
            className={`submenuWrapper ${
              (activeTab === 1 && isToggleSubmenu) ||
              isProductRoute
                ? "colapse"
                : "colapsed"
            }`}
          >
            <ul className="submenu">
              {/* =====================================================
                  PRODUCT LIST
              ===================================================== */}

              <li>
                <Link
                  to="/products"
                  onClick={() => {
                    setActiveTab(1);
                    setIsToggleSubmenu(true);
                  }}
                >
                  Product List
                </Link>
              </li>

              {/* =====================================================
                  PRODUCT VIEW
                  Opens the same Product Details page as Eye button
              ===================================================== */}

              <li>
                <a
                  href="/product/details"
                  onClick={handleProductView}
                >
                  Product View
                </a>
              </li>

              {/* =====================================================
                  PRODUCT UPLOAD
              ===================================================== */}

              <li>
                <Link
                  to="/product/upload"
                  onClick={() => {
                    setActiveTab(1);
                    setIsToggleSubmenu(true);
                  }}
                >
                  Product Upload
                </Link>
              </li>

              {/* =====================================================
                  CATEGORY CREATE
              ===================================================== */}

              <li>
                <Link
                  to="/category/create"
                  onClick={() => {
                    setActiveTab(1);
                    setIsToggleSubmenu(true);
                  }}
                >
                  Category Create
                </Link>
              </li>
            </ul>
          </div>
        </li>

        {/* =====================================================
            ORDERS
        ===================================================== */}

        <li>
          <Link to="/orders">
            <Button
              className={`w-100 ${
                location.pathname.startsWith("/orders")
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                setActiveTab(2);
                setIsToggleSubmenu(false);
              }}
            >
              <span className="icon">
                <IoCartOutline />
              </span>

              Orders

              <span className="arrow">
                <IoIosArrowForward />
              </span>
            </Button>
          </Link>
        </li>

        {/* =====================================================
            MESSAGES
        ===================================================== */}

        <li>
          <Link to="/messages">
            <Button
              className={`w-100 ${
                location.pathname.startsWith("/messages")
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                setActiveTab(3);
                setIsToggleSubmenu(false);
              }}
            >
              <span className="icon">
                <MdMessage />
              </span>

              Messages

              <span className="arrow">
                <IoIosArrowForward />
              </span>
            </Button>
          </Link>
        </li>

        {/* =====================================================
            NOTIFICATIONS
        ===================================================== */}

        <li>
          <Link to="/notifications">
            <Button
              className={`w-100 ${
                location.pathname.startsWith(
                  "/notifications"
                )
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                setActiveTab(4);
                setIsToggleSubmenu(false);
              }}
            >
              <span className="icon">
                <FaBell />
              </span>

              Notifications

              <span className="arrow">
                <IoIosArrowForward />
              </span>
            </Button>
          </Link>
        </li>

        {/* =====================================================
            SETTINGS
        ===================================================== */}

        <li>
          <Link to="/settings">
            <Button
              className={`w-100 ${
                location.pathname.startsWith("/settings")
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                setActiveTab(5);
                setIsToggleSubmenu(false);
              }}
            >
              <span className="icon">
                <IoSettings />
              </span>

              Settings

              <span className="arrow">
                <IoIosArrowForward />
              </span>
            </Button>
          </Link>
        </li>
      </ul>

      <br />

      {/* =====================================================
          LOGOUT
      ===================================================== */}

      <div className="logoutWrapper">
        <div className="logoutBox">
          <Button variant="contained">
            <AiOutlineLogout />

            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;