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
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import ProductUpload from "./pages/ProductUpload";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/Orders/OrderDetails";
import Category from "./pages/Category";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

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

  const [
    isToggleSidebar,
    setIsToggleSidebar,
  ] = useState(false);

  // =====================================================
  // LOGIN STATE
  // =====================================================

  const [isLogin, setIsLogin] = useState(true);

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
  // THEME SETUP
  // =====================================================

  useEffect(() => {
    if (themeMode === true) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");

      localStorage.setItem(
        "themeMode",
        "light"
      );
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");

      localStorage.setItem(
        "themeMode",
        "dark"
      );
    }
  }, [themeMode]);

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
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>

        {/* =====================================================
            HEADER
        ===================================================== */}

        {isHideSidebarAndHeader !== true && (
          <Header />
        )}

        {/* =====================================================
            MAIN LAYOUT
        ===================================================== */}

        <div className="main d-flex">

          {/* =====================================================
              SIDEBAR
          ===================================================== */}

          {isHideSidebarAndHeader !== true && (
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

          {/* =====================================================
              MAIN CONTENT
          ===================================================== */}

          <div
            className={`content ${
              isHideSidebarAndHeader === true
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
                  DEFAULT ROUTE
              ================================================= */}

              <Route
                path="/"
                element={
                  <Navigate
                    to="/dashboard"
                    replace
                  />
                }
              />

              {/* =================================================
                  DASHBOARD
              ================================================= */}

              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              {/* =================================================
                  AUTHENTICATION
              ================================================= */}

              <Route
                path="/login"
                element={<Login />}
              />

              <Route
                path="/signUp"
                element={<SignUp />}
              />

              {/* =================================================
                  PRODUCTS
              ================================================= */}

              <Route
                path="/products"
                element={<Products />}
              />

              {/* =================================================
                  PRODUCT DETAILS
              ================================================= */}

              <Route
                path="/product/details/:id"
                element={<ProductDetails />}
              />

              <Route
                path="/product/details"
                element={
                  <Navigate
                    to="/products"
                    replace
                  />
                }
              />

              {/* Product Upload */}

              <Route
                path="/product/upload"
                element={<ProductUpload />}
              />

              {/* =================================================
                  ORDERS
              ================================================= */}

              <Route
                path="/orders"
                element={<Orders />}
              />

              <Route
                path="/orders/:orderId"
                element={<OrderDetails />}
              />

              {/* =================================================
                  CATEGORY
              ================================================= */}

              <Route
                path="/category/create"
                element={<Category />}
              />

              {/* =================================================
                  MESSAGES
              ================================================= */}

              <Route
                path="/messages"
                element={<Messages />}
              />

              {/* =================================================
                  NOTIFICATIONS
              ================================================= */}

              <Route
                path="/notifications"
                element={<Notifications />}
              />

              {/* =================================================
                  SETTINGS
              ================================================= */}

              <Route
                path="/settings"
                element={<Settings />}
              />

              {/* =================================================
                  UNKNOWN ROUTES
              ================================================= */}

              <Route
                path="*"
                element={
                  <Navigate
                    to="/dashboard"
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