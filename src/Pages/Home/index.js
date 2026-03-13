import React from "react";
import HomeBanner from "../../Components/HomeBanner";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import banner5 from "../../assets/images/banner5.jpg";
import banner3 from "../../assets/images/banner3.jpg";
import banner4 from "../../assets/images/banner4.png";
import newsLetterImg from "../../assets/images/coupon.png";

import Button from "@mui/material/Button";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";

import ProductItem from "../../Components/ProductItem";
import HomeCat from "../../Components/HomeCat";
import Footer from "../../Components/Footer";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Home = () => {
  return (
    <>
      <HomeBanner />

      <HomeCat />

      <section className="homeProducts">
        <div className="container">
          <div className="row">

            {/* LEFT BANNERS */}
            <div className="col-md-3">
              <div className="banner">
                <img src={banner1} alt="banner" className="cursor w-100" />
              </div>

              <div className="banner mt-4">
                <img src={banner2} alt="banner" className="cursor w-100" />
              </div>

              <div className="banner mt-4">
                <img src={banner5} alt="banner" className="cursor w-100" />
              </div>
            </div>

            {/* PRODUCT SECTION */}
            <div className="col-md-9 productRow">

              

              {/* NEW PRODUCT */}
              <div className="d-flex align-items-center mt-4">
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

              {/* PRODUCT GRID */}
              <div className="product_row productRow2 w-100 mt-4 d-flex flex-wrap">
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
              </div>

              {/* BANNERS */}
              <div className="d-flex mt-4 mb-5 bannerSec">
                <div className="banner mr-3">
                  <img src={banner3} alt="banner" className="cursor w-100" />
                </div>

                <div className="banner">
                  <img src={banner4} alt="banner" className="cursor w-100" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsLetterSection mt-0 mb-1 d-flex align-items-center">
        <div className="container">
          <div className="row">

            <div className="col-md-6">
              <p className="text-white mb-1">
                20% discount for your first order
              </p>

              <h3 className="text-white">
                Join our newsletter and get....
              </h3>

              <p className="text-light">
                Join our email subscription now to get updates on <br />
                promotions and coupons.
              </p>

              <form className="newsletterForm">
                <MdOutlineMail />

                <input
                  type="text"
                  placeholder="Your Email Address"
                />

                <Button>Subscribe</Button>
              </form>
            </div>

            <div className="col-md-6 d-flex justify-content-end align-items-end">
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

      {/* FOOTER */}
      <Footer />

    </>
  );
};

export default Home;