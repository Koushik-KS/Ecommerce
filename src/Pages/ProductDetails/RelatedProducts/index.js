import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Button } from "bootstrap";
import ProductItem from "../../../Components/ProductItem";
;
const RelatedProducts =() =>{
    return(

        <>
        {/* BEST PRODUCT */}
              <div className="d-flex align-items-center">
                <div className="info w-75">
                  <h3 className="mb-0 hd">BEST PRODUCT</h3>
                  <p className="text-light text-sml mb-0">
                    Do not miss this offer in this month.
                  </p>
                </div>

                <Button className="viewAllBtn">
                  View All <IoIosArrowRoundForward />
                </Button>
              </div>

              {/* PRODUCT SLIDER */}
              <div className="product_row w-100 mt-2">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={10}
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide><ProductItem/></SwiperSlide>
                  <SwiperSlide><ProductItem /></SwiperSlide>
                  <SwiperSlide><ProductItem /></SwiperSlide>
                  <SwiperSlide><ProductItem /></SwiperSlide>
                  <SwiperSlide><ProductItem /></SwiperSlide>
                </Swiper>
              </div>
        
        </>
    )



}
export default RelatedProducts;