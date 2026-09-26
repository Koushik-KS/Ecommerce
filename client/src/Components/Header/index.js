import { Link, useNavigate } from "react-router-dom";

import Logo from "../../assets/images/eshop.png";

import Button from "@mui/material/Button";

import CountryDropdown from "../CountryDropdown";

import { IoBagOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import {
  MdPerson,
  MdLocalShipping,
  MdLogout,
  MdEmail,
  MdPhone,
} from "react-icons/md";

import SearchBox from "./SearcBox";
import Navigation from "./Navigation";

import { useContext, useState } from "react";

import { MyContext } from "../../App";

const Header = () => {
  const context = useContext(MyContext);

  const navigate = useNavigate();

  // =====================================================
  // PROFILE MENU STATE
  // =====================================================

  const [profileOpen, setProfileOpen] = useState(false);

  // =====================================================
  // MY PROFILE STATE
  // =====================================================

  const [showProfile, setShowProfile] = useState(false);

  // =====================================================
  // CART TOTAL QUANTITY
  // =====================================================

  const totalQuantity = context.cartItems.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  // =====================================================
  // CART TOTAL PRICE
  // =====================================================

  const totalPrice = context.cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  // =====================================================
  // WISHLIST COUNT
  // =====================================================

  const wishlistCount =
    context.wishlistCount || 0;

  // =====================================================
  // USER NAME
  // =====================================================

  const getUserName = () => {
    return (
      context.user?.name ||
      context.user?.fullName ||
      "User"
    );
  };

  // =====================================================
  // USER INITIAL
  // =====================================================

  const getUserInitial = () => {
    const userName = String(
      getUserName()
    ).trim();

    if (!userName) {
      return "U";
    }

    return userName
      .charAt(0)
      .toUpperCase();
  };

  // =====================================================
  // USER EMAIL
  // =====================================================

  const getUserEmail = () => {
    return (
      context.user?.email ||
      "Email not available"
    );
  };

  // =====================================================
  // USER MOBILE
  // =====================================================

  const getUserMobile = () => {
    return (
      context.user?.mobile ||
      context.user?.phone ||
      context.user?.phoneNumber ||
      "Mobile not available"
    );
  };

  // =====================================================
  // CLOSE PROFILE MENU
  // =====================================================

  const closeProfileMenu = () => {
    setProfileOpen(false);
    setShowProfile(false);
  };

  // =====================================================
  // OPEN MY PROFILE
  // =====================================================

  const handleMyProfile = () => {
    setShowProfile(true);
  };

  // =====================================================
  // BACK FROM PROFILE
  // =====================================================

  const handleBackToMenu = () => {
    setShowProfile(false);
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    setProfileOpen(false);
    setShowProfile(false);

    // Use context logout if available
    if (typeof context.logout === "function") {
      context.logout();

      navigate("/signIn");

      return;
    }

    // Use context setIsLogin if available
    if (
      typeof context.setIsLogin ===
      "function"
    ) {
      context.setIsLogin(false);
    }

    // Remove common authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    localStorage.removeItem("accessToken");

    navigate("/signIn");
  };

  return (
    <div className="headerWrapper">

      {/* =================================================
          TOP STRIP
      ================================================= */}

      <div className="top-strip bg-blue">

        <div className="container">

          <p className="mb-0 mt-0">
            Due to the <b>ONTIME</b> Delivery
          </p>

        </div>

      </div>

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="header">

        <div className="container">

          <div className="row">

            {/* =================================================
                LOGO
            ================================================= */}

            <div className="logoWrapper d-flex align-items-center col-sm-2">

              <Link to="/">

                <img
                  src={Logo}
                  alt="Logo"
                />

              </Link>

            </div>

            {/* =================================================
                HEADER RIGHT SECTION
            ================================================= */}

            <div className="col-sm-10 d-flex align-items-center part2">

              {/* =================================================
                  COUNTRY DROPDOWN
              ================================================= */}

              {context.countryList.length !== 0 && (
                <CountryDropdown />
              )}

              {/* =================================================
                  SEARCH BOX
              ================================================= */}

              <SearchBox />

              {/* =================================================
                  RIGHT SIDE
              ================================================= */}

              <div className="part3 d-flex align-items-center ml-auto">

                {/* =================================================
                    USER PROFILE
                ================================================= */}

                {context.isLogin !== true ? (

                  <Link to="/signIn">

                    <Button className="btn-blue btn-round mr-3">
                      Sign In
                    </Button>

                  </Link>

                ) : (

                  <div
                    className="position-relative mr-3"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >

                    {/* =================================================
                        PROFILE BUTTON
                    ================================================= */}

                    <Button
                      className="circle"
                      title={getUserName()}
                      onClick={() =>
                        setProfileOpen(
                          (previous) =>
                            !previous
                        )
                      }
                      sx={{
                        minWidth: "44px",
                        width: "44px",
                        height: "44px",
                        padding: 0,
                        borderRadius: "50%",
                        border:
                          "1px solid #dddddd",
                        backgroundColor:
                          "#ffffff",
                        color: "#333333",
                        fontSize: "20px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                          "center",
                        textTransform:
                          "none",

                        "&:hover": {
                          backgroundColor:
                            "#f0f4ff",
                        },
                      }}
                    >
                      {getUserInitial()}
                    </Button>

                    {/* =================================================
                        PROFILE DROPDOWN
                    ================================================= */}

                    {profileOpen && (

                      <div
                        style={{
                          position:
                            "absolute",
                          top: "55px",
                          right: "0",
                          width: "270px",
                          backgroundColor:
                            "#ffffff",
                          border:
                            "1px solid #e5e7eb",
                          borderRadius:
                            "12px",
                          boxShadow:
                            "0 10px 30px rgba(0,0,0,0.15)",
                          zIndex: 9999,
                          overflow:
                            "hidden",
                        }}
                      >

                        {/* =================================================
                            PROFILE HEADER
                        ================================================= */}

                        <div
                          style={{
                            padding:
                              "18px",
                            background:
                              "linear-gradient(135deg, #f5f7ff, #ffffff)",
                            borderBottom:
                              "1px solid #eeeeee",
                          }}
                        >

                          <div
                            style={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: "12px",
                            }}
                          >

                            {/* USER INITIAL */}

                            <div
                              style={{
                                width:
                                  "48px",
                                height:
                                  "48px",
                                minWidth:
                                  "48px",
                                borderRadius:
                                  "50%",
                                backgroundColor:
                                  "#2563eb",
                                color:
                                  "#ffffff",
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                justifyContent:
                                  "center",
                                fontSize:
                                  "20px",
                                fontWeight:
                                  "600",
                              }}
                            >
                              {getUserInitial()}
                            </div>

                            {/* USER NAME */}

                            <div
                              style={{
                                minWidth:
                                  "0",
                              }}
                            >

                              <div
                                style={{
                                  fontSize:
                                    "16px",
                                  fontWeight:
                                    "600",
                                  color:
                                    "#222222",
                                  whiteSpace:
                                    "nowrap",
                                  overflow:
                                    "hidden",
                                  textOverflow:
                                    "ellipsis",
                                }}
                              >
                                {getUserName()}
                              </div>

                              <div
                                style={{
                                  fontSize:
                                    "12px",
                                  color:
                                    "#777777",
                                  marginTop:
                                    "2px",
                                }}
                              >
                                My Account
                              </div>

                            </div>

                          </div>

                        </div>

                        {/* =================================================
                            PROFILE DETAILS
                        ================================================= */}

                        {showProfile ? (

                          <div>

                            {/* PROFILE TITLE */}

                            <div
                              style={{
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                padding:
                                  "13px 16px",
                                borderBottom:
                                  "1px solid #eeeeee",
                              }}
                            >

                              <button
                                type="button"
                                onClick={
                                  handleBackToMenu
                                }
                                style={{
                                  border:
                                    "none",
                                  background:
                                    "transparent",
                                  padding: 0,
                                  cursor:
                                    "pointer",
                                  fontSize:
                                    "14px",
                                  color:
                                    "#2563eb",
                                  fontWeight:
                                    "600",
                                }}
                              >
                                ← Back
                              </button>

                              <span
                                style={{
                                  marginLeft:
                                    "15px",
                                  fontWeight:
                                    "600",
                                  color:
                                    "#333333",
                                }}
                              >
                                My Profile
                              </span>

                            </div>

                            {/* NAME */}

                            <div
                              style={{
                                padding:
                                  "14px 16px 5px",
                              }}
                            >

                              <div
                                style={{
                                  fontSize:
                                    "11px",
                                  color:
                                    "#888888",
                                  marginBottom:
                                    "4px",
                                }}
                              >
                                NAME
                              </div>

                              <div
                                style={{
                                  fontSize:
                                    "14px",
                                  fontWeight:
                                    "600",
                                  color:
                                    "#333333",
                                }}
                              >
                                {getUserName()}
                              </div>

                            </div>

                            {/* EMAIL */}

                            <div
                              style={{
                                padding:
                                  "10px 16px",
                              }}
                            >

                              <div
                                style={{
                                  display:
                                    "flex",
                                  alignItems:
                                    "center",
                                  gap:
                                    "7px",
                                  fontSize:
                                    "11px",
                                  color:
                                    "#888888",
                                  marginBottom:
                                    "4px",
                                }}
                              >

                                <MdEmail
                                  size={15}
                                />

                                EMAIL

                              </div>

                              <div
                                style={{
                                  fontSize:
                                    "13px",
                                  color:
                                    "#333333",
                                  wordBreak:
                                    "break-word",
                                }}
                              >
                                {getUserEmail()}
                              </div>

                            </div>

                            {/* MOBILE */}

                            <div
                              style={{
                                padding:
                                  "10px 16px 16px",
                              }}
                            >

                              <div
                                style={{
                                  display:
                                    "flex",
                                  alignItems:
                                    "center",
                                  gap:
                                    "7px",
                                  fontSize:
                                    "11px",
                                  color:
                                    "#888888",
                                  marginBottom:
                                    "4px",
                                }}
                              >

                                <MdPhone
                                  size={15}
                                />

                                MOBILE

                              </div>

                              <div
                                style={{
                                  fontSize:
                                    "13px",
                                  color:
                                    "#333333",
                                }}
                              >
                                {getUserMobile()}
                              </div>

                            </div>

                          </div>

                        ) : (

                          /* =================================================
                              MAIN PROFILE MENU
                          ================================================= */

                          <div>

                            {/* =================================================
                                MY PROFILE
                            ================================================= */}

                            <button
                              type="button"
                              onClick={
                                handleMyProfile
                              }
                              style={{
                                width:
                                  "100%",
                                border:
                                  "none",
                                backgroundColor:
                                  "#ffffff",
                                textAlign:
                                  "left",
                                padding:
                                  "13px 16px",
                                color:
                                  "#333333",
                                fontSize:
                                  "14px",
                                cursor:
                                  "pointer",
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                gap:
                                  "12px",
                                borderBottom:
                                  "1px solid #f1f1f1",
                              }}
                              onMouseEnter={(
                                event
                              ) => {
                                event.currentTarget.style.backgroundColor =
                                  "#f5f7ff";
                              }}
                              onMouseLeave={(
                                event
                              ) => {
                                event.currentTarget.style.backgroundColor =
                                  "#ffffff";
                              }}
                            >

                              <MdPerson
                                size={21}
                                style={{
                                  color:
                                    "#2563eb",
                                }}
                              />

                              <span>
                                My Profile
                              </span>

                            </button>

                            {/* =================================================
                                TRACK ORDER
                            ================================================= */}

                            <Link
                              to="/track"
                              onClick={
                                closeProfileMenu
                              }
                              style={{
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                gap:
                                  "12px",
                                padding:
                                  "13px 16px",
                                color:
                                  "#333333",
                                textDecoration:
                                  "none",
                                fontSize:
                                  "14px",
                                borderBottom:
                                  "1px solid #f1f1f1",
                              }}
                              onMouseEnter={(
                                event
                              ) => {
                                event.currentTarget.style.backgroundColor =
                                  "#f5f7ff";
                              }}
                              onMouseLeave={(
                                event
                              ) => {
                                event.currentTarget.style.backgroundColor =
                                  "#ffffff";
                              }}
                            >

                              <MdLocalShipping
                                size={21}
                                style={{
                                  color:
                                    "#16a34a",
                                }}
                              />

                              <span>
                                Track Order
                              </span>

                            </Link>

                            {/* =================================================
                                LOGOUT
                            ================================================= */}

                            <button
                              type="button"
                              onClick={
                                handleLogout
                              }
                              style={{
                                width:
                                  "100%",
                                border:
                                  "none",
                                backgroundColor:
                                  "#ffffff",
                                textAlign:
                                  "left",
                                padding:
                                  "13px 16px",
                                color:
                                  "#dc3545",
                                fontSize:
                                  "14px",
                                cursor:
                                  "pointer",
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                gap:
                                  "12px",
                              }}
                              onMouseEnter={(
                                event
                              ) => {
                                event.currentTarget.style.backgroundColor =
                                  "#fff5f5";
                              }}
                              onMouseLeave={(
                                event
                              ) => {
                                event.currentTarget.style.backgroundColor =
                                  "#ffffff";
                              }}
                            >

                              <MdLogout
                                size={21}
                              />

                              <span>
                                Logout
                              </span>

                            </button>

                          </div>

                        )}

                      </div>

                    )}

                  </div>

                )}

                {/* =================================================
                    WISHLIST
                ================================================= */}

                <div className="headerWishlist position-relative mr-3">

                  <Link to="/wishlist">

                    <Button
                      className="circle wishlistHeaderButton"
                      title="Wishlist"
                    >

                      <FaHeart />

                    </Button>

                  </Link>

                  {/* WISHLIST COUNT */}

                  <span className="wishlistCount d-flex align-items-center justify-content-center">
                    {wishlistCount}
                  </span>

                </div>

                {/* =================================================
                    CART
                ================================================= */}

                <div className="ml-auto cartTab d-flex align-items-center">

                  {/* TOTAL PRICE */}

                  <span>
                    ₹{totalPrice}
                  </span>

                  {/* CART */}

                  <div className="position-relative ml-2">

                    <Link to="/cart">

                      <Button className="circle">

                        <IoBagOutline />

                      </Button>

                    </Link>

                    {/* CART COUNT */}

                    <span className="count d-flex align-items-center justify-content-center">
                      {totalQuantity}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </header>

      {/* =================================================
          NAVIGATION
      ================================================= */}

      <Navigation />

    </div>
  );
};

export default Header;