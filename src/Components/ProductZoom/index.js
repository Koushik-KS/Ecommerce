
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import InnerImageZoom from "react-inner-image-zoom";

import "react-inner-image-zoom/lib/styles.min.css";
import { useContext, useState } from "react";
const ProductZoom=()=>{

    
    const [bigSwiper, setBigSwiper] = useState(null);
    
      const goto = (index) => {
        if (bigSwiper) {
          bigSwiper.slideTo(index);
        }
      };
    

    return(
        <>
        <div className="productZoom">
               <div className="productZoom position-relative">

            <div className="badge badge-primary">28%</div>

            {/* BIG IMAGE SWIPER */}

            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              navigation={true}
              modules={[Navigation]}
              onSwiper={setBigSwiper}
              className="zoomSliderBig"
            >

              <SwiperSlide>
                <InnerImageZoom
                  zoomType="hover"
                  zoomScale={1.5}
                  src="https://m.media-amazon.com/images/I/818LBp+THNL._SX679_.jpg"
                />
              </SwiperSlide>

              <SwiperSlide>
                <InnerImageZoom
                  zoomType="hover"
                  zoomScale={1.5}
                  src="https://m.media-amazon.com/images/I/71gWT+vYaqL._SL1500_.jpg"
                />
              </SwiperSlide>

              <SwiperSlide>
                <InnerImageZoom
                  zoomType="hover"
                  zoomScale={1.5}
                  src="https://m.media-amazon.com/images/I/71q1-LfcioL._SL1500_.jpg"
                />
              </SwiperSlide>

              <SwiperSlide>
                <InnerImageZoom
                  zoomType="hover"
                  zoomScale={1.5}
                  src="https://m.media-amazon.com/images/I/718Q5UqorUL._SL1500_.jpg"
                />
              </SwiperSlide>

            </Swiper>

          </div>


          

          <Swiper
            slidesPerView={4}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation]}
            className="zoomSlider mt-3"
          >

            <SwiperSlide>
              <img
                src="https://m.media-amazon.com/images/I/818LBp+THNL._SX679_.jpg"
                className="w-100"
                onClick={() => goto(0)}
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="https://m.media-amazon.com/images/I/71gWT+vYaqL._SL1500_.jpg"
                className="w-100"
                onClick={() => goto(1)}
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="https://m.media-amazon.com/images/I/71q1-LfcioL._SL1500_.jpg"
                className="w-100"
                onClick={() => goto(2)}
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="https://m.media-amazon.com/images/I/718Q5UqorUL._SL1500_.jpg"
                className="w-100"
                onClick={() => goto(3)}
              />
            </SwiperSlide>

          </Swiper>
        </div>


        </>
    )




}

export default ProductZoom;