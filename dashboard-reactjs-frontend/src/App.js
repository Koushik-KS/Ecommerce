
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

// =====================================================
// CONTEXT
// =====================================================

const MyContext = createContext();

// =====================================================
// APP COMPONENT
// =====================================================

function App() {
  // Sidebar toggle state
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);

  // Login state
  const [isLogin, setIsLogin] = useState(true);

  // Hide Header and Sidebar
  const [
    isHideSidebarAndHeader,
    setisHideSidebarAndHeader,
  ] = useState(false);

  // Theme mode
  const [themeMode, setThemeMode] = useState(true);

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
        {/* =========================
            HEADER
        ========================= */}

        {isHideSidebarAndHeader !== true && <Header />}

        {/* =========================
            MAIN LAYOUT
        ========================= */}

        <div className="main d-flex">
          {/* =========================
              SIDEBAR
          ========================= */}

          {isHideSidebarAndHeader !== true && (
            <div
              className={`sidebarWrapper ${
                isToggleSidebar === true ? "toggle" : ""
              }`}
            >
              <Sidebar />
            </div>
          )}

          {/* =========================
              MAIN CONTENT
          ========================= */}

          <div
            className={`content ${
              isHideSidebarAndHeader === true ? "full" : ""
            } ${
              isToggleSidebar === true ? "toggle" : ""
            }`}
          >
            <Routes>
              {/* =================================================
                  DASHBOARD
              ================================================= */}

              <Route
                path="/"
                element={<Navigate to="/dashboard" replace />}
              />

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

              {/* Product List */}

              <Route
                path="/products"
                element={<Products />}
              />

              {/* 
                Sidebar Product View

                A product ID is required to display
                a particular product.

                Clicking Product View in the sidebar
                opens the Product List first.
              */}

              <Route
                path="/product/details"
                element={
                  <Navigate
                    to="/products"
                    replace
                  />
                }
              />

              {/* 
                Product Details

                The Eye button from Product List
                must navigate to:

                /product/details/:id
              */}

              <Route
                path="/product/details/:id"
                element={<ProductDetails />}
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

              {/* Order Details */}

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