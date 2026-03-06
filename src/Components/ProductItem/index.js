import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { TfiFullscreen } from "react-icons/tfi";
import { CiHeart } from "react-icons/ci";
import { Navigation } from "swiper/modules";
import ProductModal from "../ProductModal";

const ProductItem = () => {
  return (
    <>
    <div className="item productItem">
      
      <div className="imgWrapper">

        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          navigation={true}
          modules={[Navigation]}
           slidesPerGroup={1}
          className="mySwiper"
        >
          
          <SwiperSlide>
            <img
              src="https://m.media-amazon.com/images/I/71386F6rF+L._AC_UY327_FMwebp_QL65_.jpg"
              alt="product1"
              className="w-100"
            />
          </SwiperSlide>

         

          

       </Swiper>
       

        <span className="badge badge-primary">28%</span>

        <div className="actions">
          <Button><TfiFullscreen /></Button>
          <Button><CiHeart /></Button>
        </div>

      </div>

      <h4>Vedaka Whole Cashews | 200 Gram | Grade W320 Kaju</h4>

      <span className="text-success d-block">In Stock</span>

      <Rating value={5} readOnly size="small"   precision={0.5}/>
    

      <div className="d-flex">
        <span className="oldPrice">₹350</span>
        <span className="netPrice text-danger ml-3">₹299</span>
     
      
</div>
</div>
  
    </>
  );
};

export default ProductItem;