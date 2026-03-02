import React from "react";
import HomeBanner from "../../Components/HomeBanner";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import Button from "@mui/material/Button";
import { IoIosArrowRoundForward } from "react-icons/io";
import ProductItem from "../../Components/ProductItem";
import HomeCat from "../../Components/HomeCat";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";

const Home = () => {
  return (
    <>
      <HomeBanner />

      <HomeCat />

      <section className="homeProducts">
        <div className="container">
          <div className="row">

            
            <div className="col-md-3">
              <div className="banner">
                <img
                  src={banner1}
                  alt="Fashion banner"
                  className="cursor w-100"
                />
              </div>
              <div className="banner mt-4">
                <img
                  src={banner2}
                  alt="Fashion banner"
                  className="cursor w-100"
                />
              </div>
            </div>

          
            <div className="col-md-9 productRow">

              {/* BEST SELLER */}
              <div className="d-flex align-items-center ">
             
                <div className="info w-75">
                  <h3 className="mb-0 hd">BEST SELLER</h3>
                  <p className="text-light text-sml mb-0">
                    Do not miss the current offers until the end of the month.
                  </p>
                </div>

                <Button className="viewAllBtn">
                  View All <IoIosArrowRoundForward />
                </Button>
              </div>
              <div className="product_row w-100 ">
                 <Swiper 
            slidesPerView={4}
            spaceBetween={0}
            navigation={true}
            slidesPerGroup={3}
            modules={[Navigation]}
            className="mySwiper">
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


            

             
              <div className="d-flex align-items-center ">
                <div className="info">
                  <h3 className="mb-0 hd">NEW PRODUCTS</h3>
                  <p className="text-light text-sml mb-0">
                    New product with updated stocks.
                  </p>
                </div>

                <Button className="viewAllBtn">
                  View All <IoIosArrowRoundForward />
                </Button>
              </div>

              <div className="product_row w-100 ">
                 <Swiper 
            slidesPerView={4}
            spaceBetween={0}
            navigation={true}
            slidesPerGroup={3}
            modules={[Navigation]}
            className="mySwiper">
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
</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;