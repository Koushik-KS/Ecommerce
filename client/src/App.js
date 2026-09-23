
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

  const [selectCountry, setSelectCountry] = useState("");

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
      return savedUser ? JSON.parse(savedUser) : null;
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
    const savedCart = localStorage.getItem("cartItems");

    try {
      return savedCart ? JSON.parse(savedCart) : [];
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
  // ADD PRODUCT TO CART
  // =========================

  const addToCart = (product, quantity = 1) => {
    if (!product || !product._id) {
      console.error("Invalid product data");

      return;
    }

    setCartItems((previousItems) => {
      const existingProduct = previousItems.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        return previousItems.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: (item.quantity || 1) + quantity,
              }
            : item
        );
      }

      return [
        ...previousItems,
        {
          ...product,
          quantity,
        },
      ];
    });
  };

  // =========================
  // REMOVE PRODUCT FROM CART
  // =========================

  const removeFromCart = (productId) => {
    setCartItems((previousItems) =>
      previousItems.filter(
        (item) => item._id !== productId
      )
    );
  };

  // =========================
  // UPDATE PRODUCT QUANTITY
  // =========================

  const updateQuantity = (productId, quantity) => {
    const newQuantity = Number(quantity);

    if (!Number.isFinite(newQuantity) || newQuantity < 1) {
      return;
    }

    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item._id === productId
          ? {
              ...item,
              quantity: Math.floor(newQuantity),
            }
          : item
      )
    );
  };

  // =========================
  // CLEAR CART
  // =========================

  const clearCart = () => {
    setCartItems([]);
  };

  // =========================
  // CART TOTAL QUANTITY
  // =========================

  const cartCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  // =========================
  // CART TOTAL PRICE
  // =========================

  const cartTotal = cartItems.reduce(
    (total, item) => {
      const productPrice = Number(
        item.price || item.salePrice || 0
      );

      const quantity = Number(item.quantity || 0);

      return total + productPrice * quantity;
    },
    0
  );

  // =========================
  // CONTEXT VALUES
  // =========================

  const values = {
    // Country
    countryList,
    selectCountry,
    setSelectCountry,

    // Product Modal
    isOpenProductModal,
    setisOpenProductModal,

    selectedProduct,
    setSelectedProduct,

    // Header and Footer
    isHeaderFooterShow,
    setisHeaderFooterShow,

    // Login
    isLogin,
    setIsLogin,

    user,
    setUser,

    logout,

    // Cart
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
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