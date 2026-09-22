
import React, { useContext, useState } from "react";

import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";

import { IoClose } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import { MdCompareArrows } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

import QuantityBox from "../QuantityBox";
import ProductZoom from "../ProductZoom";

import { MyContext } from "../../App";

const ProductModal = () => {
  const context = useContext(MyContext);

  const [quantity, setQuantity] = useState(1);

  // =========================
  // SELECTED PRODUCT
  // =========================
  const product = context.selectedProduct;

  // =========================
  // CLOSE MODAL
  // =========================
  const closeModal = () => {
    context.setisOpenProductModal(false);
  };

  // =========================
  // CHECK PRODUCT
  // =========================
  if (!product) {
    return (
      <Dialog
        open={true}
        onClose={closeModal}
        maxWidth="sm"
        fullWidth
      >
        <div className="p-4 text-center">
          <h5>Product details not available</h5>

          <Button
            variant="contained"
            onClick={closeModal}
          >
            Close
          </Button>
        </div>
      </Dialog>
    );
  }

  // =========================
  // PRODUCT INFORMATION
  // =========================
  const productId = product._id || product.id;

  const productName = product.name || "Product";

  const productBrand = product.brand || "No brand";

  const productDescription =
    product.description || "No description available.";

  const productPrice = Number(product.price || 0);

  const productRating = Number(product.rating || 0);

  const productStock = Number(
    product.countInStock ?? 0
  );

  const productImages = Array.isArray(product.images)
    ? product.images.filter((image) => image)
    : [];

  const productImage =
    productImages.length > 0
      ? productImages[0]
      : "https://via.placeholder.com/500x500?text=No+Image";

  // Optional regular price
  const regularPrice = Number(
    product.regularPrice || 0
  );

  // Calculate discount
  const discount =
    regularPrice > productPrice && productPrice > 0
      ? Math.round(
          ((regularPrice - productPrice) / regularPrice) *
            100
        )
      : 0;

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = () => {
    if (productStock <= 0) {
      alert("This product is currently out of stock.");
      return;
    }

    if (quantity <= 0) {
      alert("Please select a valid quantity.");
      return;
    }

    if (quantity > productStock) {
      alert(
        `Only ${productStock} item(s) available in stock.`
      );

      return;
    }

    const currentCartItems = Array.isArray(
      context.cartItems
    )
      ? context.cartItems
      : [];

    const existingProduct = currentCartItems.find(
      (item) => item.id === productId
    );

    let updatedCart;

    // =========================
    // UPDATE EXISTING PRODUCT
    // =========================
    if (existingProduct) {
      const existingQuantity = Number(
        existingProduct.quantity || 0
      );

      const updatedQuantity =
        existingQuantity + quantity;

      if (updatedQuantity > productStock) {
        alert(
          `Only ${productStock} item(s) available in stock.`
        );

        return;
      }

      updatedCart = currentCartItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: updatedQuantity,
            }
          : item
      );
    } else {
      // =========================
      // ADD NEW PRODUCT
      // =========================
      updatedCart = [
        ...currentCartItems,
        {
          id: productId,
          _id: product._id,

          name: productName,
          brand: productBrand,
          description: productDescription,

          price: productPrice,
          regularPrice: regularPrice,

          rating: productRating,
          category: product.category,

          image: productImage,
          images: productImages,

          quantity: quantity,
        },
      ];
    }

    // Save updated cart
    context.setCartItems(updatedCart);

    alert("Product added to cart successfully!");

    // Close modal
    closeModal();
  };

  return (
    <Dialog
      open={true}
      className="productModal"
      onClose={closeModal}
      maxWidth="md"
      fullWidth
    >
      {/* =========================
          CLOSE BUTTON
      ========================= */}
      <Button
        className="close_"
        onClick={closeModal}
        aria-label="Close product details"
      >
        <IoClose />
      </Button>

      <div className="p-3">
        {/* =========================
            PRODUCT NAME
        ========================= */}
        <h4 className="mb-1 font-weight-bold">
          {productName}
        </h4>

        {/* =========================
            BRAND AND RATING
        ========================= */}
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center mr-4">
            <span>Brand:</span>

            <span className="ml-2">
              <b>{productBrand}</b>
            </span>
          </div>

          <Rating
            value={productRating}
            size="small"
            precision={0.5}
            readOnly
          />
        </div>

        <hr />

        {/* =========================
            PRODUCT DETAILS
        ========================= */}
        <div className="row mt-2 productDetaileModal">
          {/* =========================
              PRODUCT IMAGE ZOOM
          ========================= */}
          <div className="col-md-5">
            <ProductZoom product={product} />
          </div>

          {/* =========================
              PRODUCT INFORMATION
          ========================= */}
          <div className="col-md-7">
            {/* =========================
                PRICE
            ========================= */}
            <div className="d-flex info align-items-center mb-3">
              {regularPrice > productPrice && (
                <span className="oldPrice lg ml-2">
                  ₹
                  {regularPrice.toLocaleString("en-IN")}
                </span>
              )}

              <span className="netPrice text-danger lg ml-2">
                ₹{productPrice.toLocaleString("en-IN")}
              </span>
            </div>

            {/* =========================
                STOCK STATUS
            ========================= */}
            {productStock > 0 ? (
              <span className="badge bg-success">
                IN STOCK ({productStock})
              </span>
            ) : (
              <span className="badge bg-danger">
                OUT OF STOCK
              </span>
            )}

            {/* =========================
                DESCRIPTION
            ========================= */}
            <p className="mt-3">
              {productDescription}
            </p>

            {/* =========================
                QUANTITY AND ADD TO CART
            ========================= */}
            <div className="d-flex align-items-center">
              <QuantityBox
                onChange={(value) => {
                  setQuantity(Number(value) || 1);
                }}
              />

              <Button
                className="btn-blue btn-lg btn-big btn-round ml-3"
                onClick={addToCart}
                disabled={productStock <= 0}
              >
                <FaShoppingCart />

                &nbsp;

                {productStock <= 0
                  ? "Out Of Stock"
                  : "Add To Cart"}
              </Button>
            </div>

            {/* =========================
                WISHLIST AND COMPARE
            ========================= */}
            <div className="d-flex align-items-center mt-5 actions">
              <Button
                className="btn-round btn-sml"
                variant="outlined"
              >
                <IoMdHeart />

                &nbsp; ADD TO WISHLIST
              </Button>

              <Button
                className="btn-round btn-sml ml-3"
                variant="outlined"
              >
                <MdCompareArrows />

                &nbsp; Compare
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductModal;