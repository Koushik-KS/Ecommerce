
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Components
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ProductModal from "./Components/ProductModal";

// Pages
import Home from "./Pages/Home";
import Listing from "./Pages/Home/Listing";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/OrderSuccess";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";


// Create Context
const MyContext = createContext();

function App() {
  // Country state
  const [countryList, setCountryList] = useState([]);

  const [selectCountry, setSelectCountry] = useState("");

  // Product modal state
  const [isOpenProductModal, setisOpenProductModal] = useState(false);

  // Header and footer visibility
  const [isHeaderFooterShow, setisHeaderFooterShow] = useState(true);

  // Login state
  const [isLogin, setIsLogin] = useState(false);

  // Cart state with localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");

    try {
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  // Get country list when the app loads
  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries/");
  }, []);

  // Save cart items to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Get country API data
  const getCountry = async (url) => {
    try {
      const res = await axios.get(url);

      setCountryList(res.data.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  // Context values
  const values = {
    countryList,
    selectCountry,
    setSelectCountry,

    isOpenProductModal,
    setisOpenProductModal,

    isHeaderFooterShow,
    setisHeaderFooterShow,

    isLogin,
    setIsLogin,

    cartItems,
    setCartItems
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>

        {/* Header */}
        {isHeaderFooterShow && <Header />}

        {/* Application Routes */}
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/cat/:id" element={<Listing />} />

          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/order-success" element={<OrderSuccess />} />

          <Route path="/signIn" element={<SignIn />} />

          <Route path="/signUp" element={<SignUp />} />
        </Routes>

        {/* Footer */}
        {isHeaderFooterShow && <Footer />}

        {/* Product Modal */}
        {isOpenProductModal && <ProductModal />}

      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;

export { MyContext };