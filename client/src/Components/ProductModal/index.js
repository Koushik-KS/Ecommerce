
import React, { useContext, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { IoClose } from "react-icons/io5";
import Rating from "@mui/material/Rating";
import { IoMdHeart } from "react-icons/io";
import { MdCompareArrows } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

import QuantityBox from "../QuantityBox";
import { MyContext } from "../../App";
import ProductZoom from "../ProductZoom";

const ProductModal = () => {
  const context = useContext(MyContext);

  const [quantity, setQuantity] = useState(1);

  // Product details
  const product = {
    id: "badam-crunchy-nutty",
    name: "Purely Natural Badam Crunchy & Nutty",
    brand: "Vedaka",
    oldPrice: 1729,
    price: 1529,

    // Actual product image
    image:
      "https://m.media-amazon.com/images/I/818LBp+THNL._SX679_.jpg"
  };

  // Add product to cart
  const addToCart = () => {
    const existingProduct = context.cartItems.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = context.cartItems.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + quantity,
              image: product.image
            }
          : item
      );
    } else {
      updatedCart = [
        ...context.cartItems,
        {
          ...product,
          quantity: quantity
        }
      ];
    }

    context.setCartItems(updatedCart);

    alert("Product added to cart successfully!");

    context.setisOpenProductModal(false);
  };

  return (
    <Dialog
      open={true}
      className="productModal"
      onClose={() => context.setisOpenProductModal(false)}
      maxWidth="md"
      fullWidth
    >
      {/* Close Button */}
      <Button
        className="close_"
        onClick={() => context.setisOpenProductModal(false)}
      >
        <IoClose />
      </Button>

      {/* Product Name */}
      <h4 className="mb-1 font-weight-bold">
        {product.name}
      </h4>

      {/* Brand and Rating */}
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center mr-4">
          <span>Brands:</span>

          <span className="ml-2">
            <b>{product.brand}</b>
          </span>
        </div>

        <Rating
          value={5}
          size="small"
          precision={0.5}
          readOnly
        />
      </div>

      <hr />

      <div className="row mt-2 productDetaileModal">

        {/* Product Images */}
        <div className="col-md-5">
          <ProductZoom />
        </div>

        {/* Product Information */}
        <div className="col-md-7">

          {/* Price */}
          <div className="d-flex info align-items-center mb-3">
            <span className="oldPrice lg ml-2">
              ₹{product.oldPrice}
            </span>

            <span className="netPrice text-danger lg ml-2">
              ₹{product.price}
            </span>
          </div>

          {/* Stock */}
          <span className="badge bg-success">
            IN STOCK
          </span>

          {/* Description */}
          <p className="mt-3">
            Packed in an integrated nuts & dried fruits unit
            and may contain occasional traces of other nuts
            & dried fruits.
          </p>

          {/* Quantity and Add to Cart */}
          <div className="d-flex align-items-center">

            <QuantityBox
              onChange={(value) => setQuantity(value)}
            />

            <Button
              className="btn-blue btn-lg btn-big btn-round ml-3"
              onClick={addToCart}
            >
              <FaShoppingCart />
              Add to Cart
            </Button>

          </div>

          {/* Wishlist and Compare */}
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
    </Dialog>
  );
};

export default ProductModal;