import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";

import slide1 from "../../assets/images/slide1.jpg";
import slide2 from "../../assets/images/slide2.jpg";
import slide3 from "../../assets/images/slide3.jpg";
import slide4 from "../../assets/images/slide4.jpg";

const HomeBanner = () => {
  return (
    <div className="container mt-3">
      <div className="homeBannerSection">
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={1}
          spaceBetween={15}
          navigation={true}
          loop={false}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <div className="item">
              <img src={slide1} className="w-100" alt="slide1" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item">
              <img src={slide2} className="w-100" alt="slide2" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item">
              <img src={slide3} className="w-100" alt="slide3" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="item">
              <img src={slide4} className="w-100" alt="slide4" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeBanner;