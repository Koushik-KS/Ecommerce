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
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import banner3 from "../../assets/images/banner3.jpg";
import banner4 from "../../assets/images/banner4.png";
import newsLetterImg from "../../assets/images/coupon.png";
import { height } from "@mui/system";
import { MdOutlineMail } from "react-icons/md";
import Footer from "../../Components/Footer";

const Home = () => {
    var productSliderOptions={
      dots:true,
      infinite:false,
      speed:500,
      slidesToShow:4,
      slidesToScroll:1,
      
    };
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
                  className="cursor w-100"/>
              </div>

              </div>

            <div className="col-md-9 productRow">

              <div className="d-flex align-items-center ">
             
                <div className="info w-75">
                  <h3 className="mb-0 hd">best PRODUCT</h3>
                  <p className="text-light text-sml mb-0">
                    Do not miss this offer in this month.
                  </p>
                </div>

                <Button className="viewAllBtn">
                  View All <IoIosArrowRoundForward />
                </Button>
              </div>

              <div className="product_row w-100 mt-4 ">
                 <Swiper 
            slidesPerView={3}
            spaceBetween={0}
            navigation={true}
            slidesPerGroup={1}
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
             
                <div className="info w-75">
                  <h3 className="mb-0 hd">NEW PRODUCT</h3>
                  <p className="text-light text-sml mb-0">
                    New product with updated stocks.
                  </p>
                </div>

                <Button className="viewAllBtn">
                  View All <IoIosArrowRoundForward />
                </Button>
              </div>

              <div className="product_row productRow2 w-75 mt-4 d-flex"> 
                  <ProductItem />
                   <ProductItem />
                    <ProductItem />
                     <ProductItem />
                      <ProductItem />
                       <ProductItem />
</div>
                <div className="d-flex mt-4 mb-5 bannerSec">
                  <div className="banner ">
                <img
                  src={banner3}
                  alt="Fashion banner"
                  className="cursor w-100"/>
              </div>
              <div className="banner ">
                <img
                  src={banner4}
                  alt="Fashion banner"
                  className="cursor w-100 "/>
              </div>
              </div>
 </div>
</div>
        </div>
        
      </section>

      <section className="newsLetterSection mt-0 mb-1 d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="text-white mb-1">20% discount for your first order
                  
              </p>
              <h3 className="text-white">Join our newsletter and get....</h3>
             <p className="text-light">Join  our email subscription now to get updates on <br/> promotions and coupons.</p>
             

             <form>
              <MdOutlineMail />
              <input type="text "placeholder="Your Email Address"/>
              <Button>Subscribe</Button>
             </form>
             
              </div>
           <div className="col-md-6  d-flex justify-content-end align-items-end">
  <img 
    src={newsLetterImg} 
    alt="newsletter"
    className="img-fluid"
    style={{ maxWidth: "180px", height: "180px" }}
  />
</div>
            </div>
          </div>
   

      </section>

      

    </>
  );
};

export default Home;