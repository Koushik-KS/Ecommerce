import React, { useState } from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import {Navigation} from "swiper/modules";

const HomeCat = () => {

    const [itemBg]=useState([
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
          <h3 className="mb-3 hd">Featured Categories</h3>
            <Swiper 
            slidesPerView={10}
            spaceBetween={8}
            navigation={true}
            slidesPerGroup={3}
            modules={[Navigation]}
            className="mySwiper"
            >
              {
                itemBg?.map((item,index)=>{

                  return(
                    <SwiperSlide>
                    <div className="item text-center cursor"style={{background:item}}>
                  <img src="https://nest-frontend-v6.netlify.app/assets/imgs/shop/cat-9.png" 
                  alt="category"/>
                  <h6>Red Apple</h6>
                        </div>
                </SwiperSlide>
                
                  )
                    

                  
                })
              }
                
                

                </Swiper>
                
            </div>
      </section>



  )
  
    }

export default HomeCat;

