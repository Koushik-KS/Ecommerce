
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import { createContext, useEffect, useState } from "react";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProductDetails from "./pages/ProductDetails";
import ProductUpload from "./pages/ProductUpload";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/Orders/OrderDetails";
import Category from "./pages/Category";
const MyContext = createContext();

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [
    isHideSidebarAndHeader,
    setisHideSidebarAndHeader,
  ] = useState(false);

  const [themeMode, setThemeMode] = useState(true);

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

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        {/* Header */}
        {isHideSidebarAndHeader !== true && <Header />}

        <div className="main d-flex">
          {/* Sidebar */}
          {isHideSidebarAndHeader !== true && (
            <div
              className={`sidebarWrapper ${
                isToggleSidebar === true ? "toggle" : ""
              }`}
            >
              <Sidebar />
            </div>
          )}

          {/* Main Content */}
          <div
            className={`content ${
              isHideSidebarAndHeader === true ? "full" : ""
            } ${
              isToggleSidebar === true ? "toggle" : ""
            }`}
          >
            <Routes>
              {/* Dashboard */}
              <Route
                path="/"
                element={<Dashboard />}
              />

              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              {/* Authentication */}
              <Route
                path="/login"
                element={<Login />}
              />

              <Route
                path="/signUp"
                element={<SignUp />}
              />

              {/* Products */}
              <Route
                path="/products"
                element={<Products />}
              />

              <Route
                path="/product/details"
                element={<ProductDetails />}
              />

              <Route
                path="/product/upload"
                element={<ProductUpload />}
              />

              {/* Orders */}
              <Route
                path="/orders"
                element={<Orders />}
              />

              {/* Order Details */}
              <Route
                path="/orders/:orderId"
                element={<OrderDetails />}
              />
              <Route path="/category/create" element={<Category />} />
            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;

export { MyContext };