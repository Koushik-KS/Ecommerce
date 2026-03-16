import React, { useContext, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { IoClose } from "react-icons/io5";
import Rating from "@mui/material/Rating";


import QuantityBox from "../QuantityBox";
import { IoMdHeart } from "react-icons/io";
import { MdCompareArrows } from "react-icons/md";
import { MyContext } from "../../App";



import ProductZoom from "../ProductZoom";
import { FaShoppingCart } from "react-icons/fa";
const ProductModal = () => {

  const context = useContext(MyContext);
 

 

  return (

    <Dialog
      open={true}
      className="productModal"
      onClose={() => context.setisOpenProductModal(false)}
      maxWidth="md"
      fullWidth
    >

      <Button
        className="close_"
        onClick={() => context.setisOpenProductModal(false)}
      >
        <IoClose />
      </Button>

      <h4 className="mb-1 font-weight-bold">
        Purely Natural Badam Crunchy & Nutty
      </h4>

      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center mr-4">
          <span>Brands:</span>
          <span className="ml-2"><b>Vedaka</b></span>
        </div>

        <Rating value={5} size="small" precision={0.5} readOnly />
      </div>

      <hr />

      <div className="row mt-2 productDetaileModal">

   

        <div className="col-md-5">

       <ProductZoom/>

        </div>


    

        <div className="col-md-7">

          <div className="d-flex info align-items-center mb-3">
            <span className="oldPrice lg ml-2">₹1729</span>
            <span className="netPrice text-danger lg ml-2">₹1529</span>
          </div>

          <span className="badge bg-success">IN STOCK</span>

          <p className="mt-3">
            Packed in an integrated nuts & dried fruits unit and may contain occasional traces of other nuts & dried fruits
          </p>

          <div className="d-flex align-items-center">

            <QuantityBox />

            <Button className="btn-blue btn-lg btn-big btn-round ml-3"><FaShoppingCart />
              Add to Cart
            </Button>

          </div>

          <div className="d-flex align-items-center mt-5 actions">

            <Button className="btn-round btn-sml" variant="outlined">
              <IoMdHeart /> &nbsp; ADD TO WISHLIST
            </Button>

            <Button className="btn-round btn-sml ml-3" variant="outlined">
              <MdCompareArrows /> &nbsp; Compare
            </Button>

          </div>

        </div>

      </div>

    </Dialog>
  );
};

export default ProductModal;