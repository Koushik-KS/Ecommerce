import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

import ProductItem from "../../../Components/ProductItem";

const RelatedProducts = (props) => {
  return (
    <>
      {/* TITLE */}
      <div className="d-flex align-items-center mt-3">
        <div className="info w-75">
          <h3 className="mb-0 hd">{props.title}</h3>
        </div>
      </div>

      {/* PRODUCT SLIDER */}
      <div className="product_row w-100 mt-3">
        <Swiper
          slidesPerView={5}
          spaceBetween={0}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
         
        >
          <SwiperSlide>
            <ProductItem />
          </SwiperSlide>

          <SwiperSlide>
            <ProductItem />
          </SwiperSlide>

          <SwiperSlide>
            <ProductItem />
          </SwiperSlide>

          <SwiperSlide>
            <ProductItem />
          </SwiperSlide>

          <SwiperSlide>
            <ProductItem />
          </SwiperSlide>

          <SwiperSlide>
            <ProductItem />
          </SwiperSlide>
        </Swiper>
      </div>
      
    </>
  );
};

export default RelatedProducts;