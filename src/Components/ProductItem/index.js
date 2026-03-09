import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { TfiFullscreen } from "react-icons/tfi";
import { CiHeart } from "react-icons/ci";
import { Navigation } from "swiper/modules";

import { MyContext } from "../../App";

const ProductItem = () => {

  const context = useContext(MyContext);

  const viewProductDetails = () => {
    context.setisOpenProductModal(true);
  };

  return (
    <div className="item productItem">

      <div className="imgWrapper">

        <Swiper
          slidesPerView={1}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >

          <SwiperSlide>
            <img
              src="https://m.media-amazon.com/images/I/81xoauWxgjL._SL1500_.jpg"
              alt="product"
              className="w-100"
            />
          </SwiperSlide>

        </Swiper>

        <span className="badge badge-primary">28%</span>

        <div className="actions">

          <Button onClick={viewProductDetails}>
            <TfiFullscreen />
          </Button>

          <Button>
            <CiHeart />
          </Button>

        </div>

      </div>

      <h4>
        Vedaka Whole Almonds | 1 Kg | Dried California Almonds
      </h4>

      <span className="text-success d-block">In Stock</span>

      <Rating value={5} readOnly size="small" precision={0.5} />

      <div className="d-flex info">
        <span className="oldPrice">₹1729</span>
        <span className="netPrice text-danger ml-3">₹1529</span>
      </div>

    </div>
  );
};

export default ProductItem;