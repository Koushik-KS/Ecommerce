
import { Link } from "react-router-dom";
import Logo from "../../assets/images/eshop.png";
import Button from "@mui/material/Button";
import CountryDropdown from "../CountryDropdown";
import { IoBagOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import SearchBox from "./SearcBox";
import Navigation from "./Navigation";
import { useContext } from "react";
import { MyContext } from "../../App";

const Header = () => {
  const context = useContext(MyContext);

  // Calculate total quantity of all cart items
  const totalQuantity = context.cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate total cart price
  const totalPrice = context.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Get wishlist count
  const wishlistCount = context.wishlistCount || 0;

  // Generate the logged-in user's initial
  const getUserInitial = () => {
    const userName = context.user?.name?.trim();

    if (!userName) {
      return "U";
    }

    return userName.charAt(0).toUpperCase();
  };

  return (
    <div className="headerWrapper">
      {/* Top Strip */}
      <div className="top-strip bg-blue">
        <div className="container">
          <p className="mb-0 mt-0">
            Due to the <b>ONTIME</b> Delivery
          </p>
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="row">
            {/* Logo */}
            <div className="logoWrapper d-flex align-items-center col-sm-2">
              <Link to="/">
                <img src={Logo} alt="Logo" />
              </Link>
            </div>

            {/* Header Right Section */}
            <div className="col-sm-10 d-flex align-items-center part2">
              {/* Country Dropdown */}
              {context.countryList.length !== 0 && (
                <CountryDropdown />
              )}

              {/* Search Box */}
              <SearchBox />

              {/* Sign In and Wishlist and Cart */}
              <div className="part3 d-flex align-items-center ml-auto">
                {/* User Profile / Sign In */}
                {context.isLogin !== true ? (
                  <Link to="/signIn">
                    <Button className="btn-blue btn-round mr-3">
                      Sign In
                    </Button>
                  </Link>
                ) : (
                  <Button
                    className="circle mr-3"
                    title={context.user?.name || "User Profile"}
                    sx={{
                      minWidth: "44px",
                      width: "44px",
                      height: "44px",
                      padding: 0,
                      borderRadius: "50%",
                      border: "1px solid #dddddd",
                      backgroundColor: "#ffffff",
                      color: "#333333",
                      fontSize: "20px",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#f0f4ff",
                      },
                    }}
                  >
                    {getUserInitial()}
                  </Button>
                )}

                {/* Wishlist Icon */}
                <div className="headerWishlist position-relative mr-3">
                  <Link to="/wishlist">
                    <Button
                      className="circle wishlistHeaderButton"
                      title="Wishlist"
                    >
                      <FaHeart />
                    </Button>
                  </Link>

                  {/* Dynamic Wishlist Count */}
                  <span className="wishlistCount d-flex align-items-center justify-content-center">
                    {wishlistCount}
                  </span>
                </div>

                {/* Cart */}
                <div className="ml-auto cartTab d-flex align-items-center">
                  {/* Dynamic Total Price */}
                  <span>
                    ₹{totalPrice}
                  </span>

                  {/* Cart Icon */}
                  <div className="position-relative ml-2">
                    <Link to="/cart">
                      <Button className="circle">
                        <IoBagOutline />
                      </Button>
                    </Link>

                    {/* Dynamic Cart Count */}
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

      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default Header;