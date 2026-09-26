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
import Wishlist from "./Pages/Wishlist";
import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/OrderSuccess";
import Track from "./Pages/Track";
import Contact from "./Pages/Contact";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import SearchResults from "./Pages/SearchResults";

// =========================
// PASSWORD RESET PAGES
// =========================

import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";

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
    return Boolean(
      localStorage.getItem("token")
    );
  });

  const [user, setUser] = useState(() => {
    const savedUser =
      localStorage.getItem("user");

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
  // WISHLIST STATE
  // =========================

  const [wishlistItems, setWishlistItems] =
    useState(() => {
      const savedWishlist =
        localStorage.getItem(
          "wishlistItems"
        );

      try {
        return savedWishlist
          ? JSON.parse(savedWishlist)
          : [];
      } catch (error) {
        console.error(
          "Error loading wishlist from localStorage:",
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
  // SAVE CART
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // =========================
  // SAVE WISHLIST
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);

  // =========================
  // COUNTRY API
  // =========================

  const getCountry = async (url) => {
    try {
      const response = await axios.get(url);

      setCountryList(
        response.data.data
      );
    } catch (error) {
      console.error(
        "Error fetching countries:",
        error
      );
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setIsLogin(false);
  };

  // =========================
  // NORMALIZE PRODUCT ID
  // =========================

  const getProductId = (product) => {
    if (!product) {
      return "";
    }

    return String(
      product._id ||
        product.id ||
        ""
    );
  };

  // =========================
  // ADD PRODUCT TO CART
  // =========================

  const addToCart = (
    product,
    quantity = 1
  ) => {
    const productId =
      getProductId(product);

    if (!product || !productId) {
      console.error(
        "Invalid product data for cart"
      );

      return;
    }

    const validQuantity =
      Number(quantity);

    if (
      !Number.isFinite(
        validQuantity
      ) ||
      validQuantity < 1
    ) {
      return;
    }

    setCartItems(
      (previousItems) => {
        const existingProduct =
          previousItems.find(
            (item) =>
              getProductId(item) ===
              productId
          );

        if (existingProduct) {
          return previousItems.map(
            (item) =>
              getProductId(item) ===
              productId
                ? {
                    ...item,
                    quantity:
                      Number(
                        item.quantity ||
                          1
                      ) +
                      Math.floor(
                        validQuantity
                      ),
                  }
                : item
          );
        }

        return [
          ...previousItems,
          {
            ...product,
            _id: productId,
            quantity:
              Math.floor(
                validQuantity
              ),
          },
        ];
      }
    );
  };

  // =========================
  // REMOVE PRODUCT FROM CART
  // =========================

  const removeFromCart = (
    productId
  ) => {
    const normalizedId =
      String(productId || "");

    setCartItems(
      (previousItems) =>
        previousItems.filter(
          (item) =>
            getProductId(item) !==
            normalizedId
        )
    );
  };

  // =========================
  // UPDATE PRODUCT QUANTITY
  // =========================

  const updateQuantity = (
    productId,
    quantity
  ) => {
    const normalizedId =
      String(productId || "");

    const newQuantity =
      Number(quantity);

    if (
      !Number.isFinite(
        newQuantity
      ) ||
      newQuantity < 1
    ) {
      return;
    }

    setCartItems(
      (previousItems) =>
        previousItems.map(
          (item) =>
            getProductId(item) ===
            normalizedId
              ? {
                  ...item,
                  quantity:
                    Math.floor(
                      newQuantity
                    ),
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
  // CART COUNT
  // =========================

  const cartCount =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(
          item.quantity || 0
        ),
      0
    );

  // =========================
  // CART TOTAL
  // =========================

  const cartTotal =
    cartItems.reduce(
      (total, item) => {
        const productPrice =
          Number(
            item.price ||
              item.salePrice ||
              0
          );

        const quantity =
          Number(
            item.quantity || 0
          );

        return (
          total +
          productPrice *
            quantity
        );
      },
      0
    );

  // =========================
  // ADD TO WISHLIST
  // =========================

  const addToWishlist = (
    product
  ) => {
    const productId =
      getProductId(product);

    if (!product || !productId) {
      console.error(
        "Invalid product data for wishlist:",
        product
      );

      return;
    }

    setWishlistItems(
      (previousItems) => {
        const productAlreadyExists =
          previousItems.some(
            (item) =>
              getProductId(item) ===
              productId
          );

        if (productAlreadyExists) {
          return previousItems;
        }

        return [
          ...previousItems,
          {
            ...product,
            _id: productId,
          },
        ];
      }
    );
  };

  // =========================
  // REMOVE FROM WISHLIST
  // =========================

  const removeFromWishlist = (
    productId
  ) => {
    const normalizedId =
      String(productId || "");

    setWishlistItems(
      (previousItems) =>
        previousItems.filter(
          (item) =>
            getProductId(item) !==
            normalizedId
        )
    );
  };

  // =========================
  // TOGGLE WISHLIST
  // =========================

  const toggleWishlist = (
    product
  ) => {
    const productId =
      getProductId(product);

    if (!product || !productId) {
      console.error(
        "Invalid product data for wishlist:",
        product
      );

      return;
    }

    setWishlistItems(
      (previousItems) => {
        const productExists =
          previousItems.some(
            (item) =>
              getProductId(item) ===
              productId
          );

        if (productExists) {
          return previousItems.filter(
            (item) =>
              getProductId(item) !==
              productId
          );
        }

        return [
          ...previousItems,
          {
            ...product,
            _id: productId,
          },
        ];
      }
    );
  };

  // =========================
  // CHECK WISHLIST
  // =========================

  const isInWishlist = (
    productId
  ) => {
    const normalizedId =
      String(productId || "");

    if (!normalizedId) {
      return false;
    }

    return wishlistItems.some(
      (item) =>
        getProductId(item) ===
        normalizedId
    );
  };

  // =========================
  // CLEAR WISHLIST
  // =========================

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  // =========================
  // WISHLIST COUNT
  // =========================

  const wishlistCount =
    wishlistItems.length;

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
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,

    wishlistItems,
    setWishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount,
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>

        {/* HEADER */}

        {isHeaderFooterShow && (
          <Header />
        )}

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
            element={
              <ProductDetails />
            }
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/order-success"
            element={
              <OrderSuccess />
            }
          />

          <Route
            path="/track"
            element={<Track />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          {/* SIGN IN */}

          <Route
            path="/signIn"
            element={<SignIn />}
          />

          {/* SIGN UP */}

          <Route
            path="/signUp"
            element={<SignUp />}
          />

          {/* FORGOT PASSWORD */}

          <Route
            path="/forgot-password"
            element={
              <ForgotPassword />
            }
          />

          {/* RESET PASSWORD */}

          <Route
            path="/reset-password"
            element={
              <ResetPassword />
            }
          />

          {/* SEARCH */}

          <Route
            path="/search"
            element={
              <SearchResults />
            }
          />

        </Routes>

        {/* FOOTER */}

        {isHeaderFooterShow && (
          <Footer />
        )}

        {/* PRODUCT MODAL */}

        {isOpenProductModal && (
          <ProductModal />
        )}

      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;

export { MyContext };