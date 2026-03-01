import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import {Navigation} from "swiper/modules";

const HomeCat = () => {
  return (
      <section className="homeCat">
        <div className="container">
            <Swiper 
            slidesPerView={10}
            spaceBetween={0}
            navigation={true}
            slidesPerGroup={1}
            modules={[Navigation]}
            className="mySwiper"
            >
                <SwiperSlide>
                    <div className="item">
                                                <img
                                                    src="https://nest-frontend-v6.netlify.app/assets/imgs/shop/cat-9.png"
                                                    alt="category"
                                                />
                        </div>
                </SwiperSlide>
                </Swiper>
            </div>
      </section>



  )
  
    }

export default HomeCat;

