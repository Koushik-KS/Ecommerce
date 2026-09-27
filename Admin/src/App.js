import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import {
  createContext,
  useEffect,
  useState,
} from "react";

// =====================================================
// COMPONENTS
// =====================================================

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

// =====================================================
// PAGES
// =====================================================

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import ProductUpload from "./pages/ProductUpload";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/Orders/OrderDetails";
import Category from "./pages/Category";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import AdminProfile from "./pages/AdminProfile";

// =====================================================
// CONTEXT
// =====================================================

const MyContext = createContext();

// =====================================================
// APP COMPONENT
// =====================================================

function App() {
  // =====================================================
  // SIDEBAR STATE
  // =====================================================

  const [isToggleSidebar, setIsToggleSidebar] = useState(false);

  // =====================================================
  // LOGIN STATE
  // =====================================================

  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("adminLoggedIn") === "true"
  );

  // =====================================================
  // HEADER AND SIDEBAR VISIBILITY
  // =====================================================

  const [
    isHideSidebarAndHeader,
    setisHideSidebarAndHeader,
  ] = useState(false);

  // =====================================================
  // THEME STATE
  // true = light mode
  // false = dark mode
  // =====================================================

  const [themeMode, setThemeMode] = useState(true);

  // =====================================================
  // MOBILE SCREEN STATE
  // =====================================================

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined"
      ? window.innerWidth <= 991
      : false
  );

  // =====================================================
  // DETECT MOBILE / TABLET SCREEN
  // =====================================================

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 991;

      setIsMobile(mobile);

      // Automatically reset sidebar when moving
      // from mobile/tablet to desktop.
      if (!mobile) {
        setIsToggleSidebar(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // =====================================================
  // CLOSE SIDEBAR WHEN MOBILE OVERLAY IS USED
  // =====================================================

  const closeMobileSidebar = () => {
    if (isMobile) {
      setIsToggleSidebar(true);
    }
  };

  // =====================================================
  // THEME SETUP
  // =====================================================

  useEffect(() => {
    if (themeMode === true) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");

      localStorage.setItem("themeMode", "light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");

      localStorage.setItem("themeMode", "dark");
    }
  }, [themeMode]);

  // =====================================================
  // LOGIN / LOGOUT VISIBILITY
  // =====================================================

  useEffect(() => {
    if (isLogin === true) {
      setisHideSidebarAndHeader(false);
    } else {
      setisHideSidebarAndHeader(true);

      // Make sure sidebar is closed after logout.
      setIsToggleSidebar(false);
    }
  }, [isLogin]);

  // =====================================================
  // CONTEXT VALUES
  // =====================================================

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,

    isLogin,
    setIsLogin,

    isHideSidebarAndHeader,
    setisHideSidebarAndHeader,

    themeMode,
    setThemeMode,

    // Mobile information can also be used by
    // Header / Sidebar components if required later.
    isMobile,
  };

  // =====================================================
  // PROTECTED ROUTE
  // =====================================================

  const ProtectedRoute = ({ children }) => {
    if (isLogin !== true) {
      return (
        <Navigate
          to="/login"
          replace
        />
      );
    }

    return children;
  };

  // =====================================================
  // MOBILE SIDEBAR OVERLAY
  // =====================================================

  const mobileOverlayStyle = {
    position: "fixed",
    top: isMobile && window.innerWidth <= 767 ? "60px" : "64px",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "calc(100vh - 60px)",
    background: "rgba(0, 0, 0, 0.38)",
    zIndex: 1050,
    cursor: "pointer",
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>

        {/* =================================================
            HEADER
        ================================================= */}

        {isLogin === true && (
          <Header />
        )}

        {/* =================================================
            MAIN LAYOUT
        ================================================= */}

        <div
          className={`main d-flex ${
            isMobile ? "mobile-layout" : ""
          }`}
        >

          {/* =================================================
              SIDEBAR
          ================================================= */}

          {isLogin === true && (
            <div
              className={`sidebarWrapper ${
                isToggleSidebar === true
                  ? "toggle"
                  : ""
              }`}
            >
              <Sidebar />
            </div>
          )}

          {/* =================================================
              MOBILE SIDEBAR OVERLAY
          ================================================= */}

          {isLogin === true &&
            isMobile === true &&
            isToggleSidebar === false && (
              <div
                className="mobile-sidebar-overlay"
                style={mobileOverlayStyle}
                onClick={closeMobileSidebar}
                aria-hidden="true"
              />
            )}

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div
            className={`content ${
              isLogin !== true
                ? "full"
                : ""
            } ${
              isToggleSidebar === true
                ? "toggle"
                : ""
            }`}
          >

            <Routes>

              {/* =================================================
                  LOGIN
              ================================================= */}

              <Route
                path="/login"
                element={
                  isLogin === true ? (
                    <Navigate
                      to="/dashboard"
                      replace
                    />
                  ) : (
                    <Login />
                  )
                }
              />

              {/* =================================================
                  DEFAULT ROUTE
              ================================================= */}

              <Route
                path="/"
                element={
                  <Navigate
                    to={
                      isLogin === true
                        ? "/dashboard"
                        : "/login"
                    }
                    replace
                  />
                }
              />

              {/* =================================================
                  DASHBOARD
              ================================================= */}

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* =================================================
                  PRODUCTS
              ================================================= */}

              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                }
              />

              {/* =================================================
                  PRODUCT DETAILS
              ================================================= */}

              <Route
                path="/product/details/:id"
                element={
                  <ProtectedRoute>
                    <ProductDetails />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/product/details"
                element={
                  <ProtectedRoute>
                    <Navigate
                      to="/products"
                      replace
                    />
                  </ProtectedRoute>
                }
              />

              {/* =================================================
                  PRODUCT UPLOAD
              ================================================= */}

              <Route
                path="/product/upload"
                element={
                  <ProtectedRoute>
                    <ProductUpload />
                  </ProtectedRoute>
                }
              />

              {/* =================================================
                  ORDERS
              ================================================= */}

              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/orders/:orderId"
                element={
                  <ProtectedRoute>
                    <OrderDetails />
                  </ProtectedRoute>
                }
              />

              {/* =================================================
                  CATEGORY
              ================================================= */}

              <Route
                path="/category/create"
                element={
                  <ProtectedRoute>
                    <Category />
                  </ProtectedRoute>
                }
              />

              {/* =================================================
                  MESSAGES
              ================================================= */}

              <Route
                path="/messages"
                element={
                  <ProtectedRoute>
                    <Messages />
                  </ProtectedRoute>
                }
              />

              {/* =================================================
                  NOTIFICATIONS
              ================================================= */}

              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                }
              />

              {/* =================================================
                  SETTINGS
              ================================================= */}

              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />

              {/* =================================================
                  ADMIN PROFILE
              ================================================= */}

              <Route
                path="/my-account"
                element={
                  <ProtectedRoute>
                    <AdminProfile />
                  </ProtectedRoute>
                }
              />

              {/* =================================================
                  UNKNOWN ROUTES
              ================================================= */}

              <Route
                path="*"
                element={
                  <Navigate
                    to={
                      isLogin === true
                        ? "/dashboard"
                        : "/login"
                    }
                    replace
                  />
                }
              />

            </Routes>

          </div>
        </div>

      </MyContext.Provider>
    </BrowserRouter>
  );
}

// =====================================================
// EXPORTS
// =====================================================

export default App;

export { MyContext };