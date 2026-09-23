import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import {
  createContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

// =========================
// COMPONENTS
// =========================

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ProductModal from "./Components/ProductModal";

// =========================
// PAGES
// =========================

import Home from "./Pages/Home";
import Listing from "./Pages/Home/Listing";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/OrderSuccess";
import Track from "./Pages/Track";
import Contact from "./Pages/Contact";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

// =========================
// CREATE CONTEXT
// =========================

const MyContext = createContext();

function App() {
  // =========================
  // COUNTRY STATE
  // =========================

  const [countryList, setCountryList] = useState([]);

  const [selectCountry, setSelectCountry] =
    useState("");

  // =========================
  // PRODUCT MODAL STATE
  // =========================

  const [
    isOpenProductModal,
    setisOpenProductModal,
  ] = useState(false);

  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState(null);

  // =========================
  // HEADER AND FOOTER
  // =========================

  const [
    isHeaderFooterShow,
    setisHeaderFooterShow,
  ] = useState(true);

  // =========================
  // LOGIN STATE
  // =========================

  const [isLogin, setIsLogin] = useState(() => {
    return Boolean(localStorage.getItem("token"));
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    try {
      return savedUser
        ? JSON.parse(savedUser)
        : null;
    } catch (error) {
      console.error(
        "Error loading user from localStorage:",
        error
      );

      return null;
    }
  });

  // =========================
  // CART STATE
  // =========================

  const [cartItems, setCartItems] = useState(() => {
    const savedCart =
      localStorage.getItem("cartItems");

    try {
      return savedCart
        ? JSON.parse(savedCart)
        : [];
    } catch (error) {
      console.error(
        "Error loading cart from localStorage:",
        error
      );

      return [];
    }
  });

  // =========================
  // GET COUNTRIES
  // =========================

  useEffect(() => {
    getCountry(
      "https://countriesnow.space/api/v0.1/countries/"
    );
  }, []);

  // =========================
  // SAVE CART TO LOCAL STORAGE
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // =========================
  // COUNTRY API
  // =========================

  const getCountry = async (url) => {
    try {
      const response = await axios.get(url);

      setCountryList(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching countries:",
        error
      );
    }
  };

  // =========================
  // LOGOUT FUNCTION
  // =========================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setIsLogin(false);
  };

  // =========================
  // CONTEXT VALUES
  // =========================

  const values = {
    countryList,
    selectCountry,
    setSelectCountry,

    isOpenProductModal,
    setisOpenProductModal,

    selectedProduct,
    setSelectedProduct,

    isHeaderFooterShow,
    setisHeaderFooterShow,

    isLogin,
    setIsLogin,

    user,
    setUser,

    logout,

    cartItems,
    setCartItems,
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        {/* HEADER */}
        {isHeaderFooterShow && <Header />}

        {/* ROUTES */}
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/cat/:id"
            element={<Listing />}
          />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />

          <Route
            path="/track"
            element={<Track />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/signIn"
            element={<SignIn />}
          />

          <Route
            path="/signUp"
            element={<SignUp />}
          />
        </Routes>

        {/* FOOTER */}
        {isHeaderFooterShow && <Footer />}

        {/* PRODUCT MODAL */}
        {isOpenProductModal && <ProductModal />}
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;

export { MyContext };