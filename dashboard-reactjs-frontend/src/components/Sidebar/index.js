
import Button from "@mui/material/Button";

import { RiDashboardFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { FaProductHunt } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";

import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);

  const isOpenSubmenu = (index) => {
    if (activeTab === index) {
      setIsToggleSubmenu(!isToggleSubmenu);
    } else {
      setActiveTab(index);
      setIsToggleSubmenu(true);
    }
  };

  return (
    <div className="sidebar">
      <ul>
        {/* =========================
            DASHBOARD
        ========================= */}
        <li>
          <Link to="/">
            <Button
              className={`w-100 ${
                activeTab === 0 ? "active" : ""
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

        {/* =========================
            PRODUCTS
        ========================= */}
        <li>
          <Button
            className={`w-100 ${
              activeTab === 1 && isToggleSubmenu
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
              activeTab === 1 && isToggleSubmenu
                ? "colapse"
                : "colapsed"
            }`}
          >
            <ul className="submenu">
              <li>
                <Link to="/products">
                  Product List
                </Link>
              </li>

              <li>
                <Link to="/product/details">
                  Product View
                </Link>
              </li>

              <li>
                <Link to="/product/upload">
                  Product Upload
                </Link>
              </li>

              <li>
                <Link to="/category/create">
                  Category Create
                </Link>
              </li>
            </ul>
          </div>
        </li>

        {/* =========================
            ORDERS
        ========================= */}
        <li>
          <Link to="/orders">
            <Button
              className={`w-100 ${
                activeTab === 2 ? "active" : ""
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

        {/* =========================
            MESSAGES
        ========================= */}
        <li>
          <Link to="/messages">
            <Button
              className={`w-100 ${
                activeTab === 3 ? "active" : ""
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

        {/* =========================
            NOTIFICATIONS
        ========================= */}
        <li>
          <Link to="/notifications">
            <Button
              className={`w-100 ${
                activeTab === 4 ? "active" : ""
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

        {/* =========================
            SETTINGS
        ========================= */}
        <li>
          <Link to="/settings">
            <Button
              className={`w-100 ${
                activeTab === 5 ? "active" : ""
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

      {/* =========================
          LOGOUT
      ========================= */}
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