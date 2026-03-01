import React, { useState } from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import {Navigation} from "swiper/modules";

const HomeCat = () => {

    const [itemBg,setItemBg]=useState([
        '#fffceb',
        '#ecffec',
        '#feefea',
        '#e8f9ff',
        '#f9e8ff',
        '#e8f9ff',
        '#f9e8ff',
        '#e8f9ff',
        '#f9e8ff',
        '#e8f9ff',
        '#f9e8ff',
        '#e8f9ff',




    ])
  return (
      <section className="homeCat">
        <div className="container">
            <Swiper 
            slidesPerView={10}
            spaceBetween={5}
            navigation={true}
            slidesPerGroup={1}
            modules={[Navigation]}
            className="mySwiper"
            >
                
                <SwiperSlide>
                    <div className="item text-center">
                  <img src="https://nest-frontend-v6.netlify.app/assets/imgs/shop/cat-9.png" 
                  alt="category"/>
                  <h6>Red Apple</h6>
                        </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="item text-center">
                  <img src="https://nest-frontend-v6.netlify.app/assets/imgs/shop/cat-9.png" 
                  alt="category"/>
                  <h6>Red Apple</h6>
                        </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="item text-center">
                  <img src="https://nest-frontend-v6.netlify.app/assets/imgs/shop/cat-9.png" 
                  alt="category"/>
                  <h6>Red Apple</h6>
                        </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="item text-center">
                  <img src="https://nest-frontend-v6.netlify.app/assets/imgs/shop/cat-9.png" 
                  alt="category"/>
                  <h6>Red Apple</h6>
                        </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="item text-center">
                  <img src="https://nest-frontend-v6.netlify.app/assets/imgs/shop/cat-9.png" 
                  alt="category"/>
                  <h6>Red Apple</h6>
                        </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="item text-center">
                  <img src="https://nest-frontend-v6.netlify.app/assets/imgs/shop/cat-9.png" 
                  alt="category"/>
                  <h6>Red Apple</h6>
                        </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="item text-center">
                  <img src="https://nest-frontend-v6.netlify.app/assets/imgs/shop/cat-9.png" 
                  alt="category"/>
                  <h6>Red Apple</h6>
                        </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="item text-center">
                  <img src="https://nest-frontend-v6.netlify.app/assets/imgs/shop/cat-9.png" 
                  alt="category"/>
                  <h6>Red Apple</h6>
                        </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="item text-center">
                  <img src="https://nest-frontend-v6.netlify.app/assets/imgs/shop/cat-9.png" 
                  alt="category"/>
                  <h6>Red Apple</h6>
                        </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="item text-center">
                  <img src="https://nest-frontend-v6.netlify.app/assets/imgs/shop/cat-9.png" 
                  alt="category"/>
                  <h6>Red Apple</h6>
                        </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="item text-center">
                  <img src="https://nest-frontend-v6.netlify.app/assets/imgs/shop/cat-9.png" 
                  alt="category"/>
                  <h6>Red Apple</h6>
                        </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="item text-center">
                  <img src="https://nest-frontend-v6.netlify.app/assets/imgs/shop/cat-9.png" 
                  alt="category"/>
                  <h6>Red Apple</h6>
                        </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="item text-center">
                  <img src="https://nest-frontend-v6.netlify.app/assets/imgs/shop/cat-9.png" 
                  alt="category"/>
                  <h6>Red Apple</h6>
                        </div>
                </SwiperSlide>
                

                </Swiper>
                
            </div>
      </section>



  )
  
    }

export default HomeCat;

