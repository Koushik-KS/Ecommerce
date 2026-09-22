
import React, { useEffect, useState } from "react";

import HomeBanner from "../../Components/HomeBanner";

import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import banner3 from "../../assets/images/banner3.jpg";
import banner4 from "../../assets/images/banner4.png";
import newsLetterImg from "../../assets/images/coupon.png";

import Button from "@mui/material/Button";

import { IoIosArrowRoundForward } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";

import ProductItem from "../../Components/ProductItem";
import HomeCat from "../../Components/HomeCat";


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

const API_URL = "http://localhost:4000/api";

const Home = () => {
  // =========================
  // STATES
  // =========================
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =========================
  // FETCH PRODUCTS
  // =========================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/products`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }

        const data = await response.json();

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Product fetch error:", error);

        setError(
          "Unable to load products. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // =========================
  // PRODUCT SLIDE COMPONENT
  // =========================
  const renderProductSlides = (items) => {
    if (loading) {
      return (
        <div className="text-center py-4">
          <p>Loading products...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="alert alert-danger">
          {error}
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div className="text-center py-4">
          <p>No products available.</p>
        </div>
      );
    }

    return (
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {items.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductItem product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  return (
    <>
      {/* =========================
          HOME BANNER
      ========================= */}
      <HomeBanner />

      {/* =========================
          HOME CATEGORIES
      ========================= */}
      <HomeCat />

      {/* =========================
          HOME PRODUCTS
      ========================= */}
      <section className="homeProducts">
        <div className="container">
          <div className="row">

            {/* =========================
                LEFT BANNERS
            ========================= */}
            <div className="col-md-3">

              <div className="banner">
                <img
                  src={banner1}
                  alt="Banner"
                  className="cursor w-100"
                />
              </div>

              <div className="banner mt-4">
                <img
                  src={banner2}
                  alt="Banner"
                  className="cursor w-100"
                />
              </div>

            </div>

            {/* =========================
                PRODUCT SECTION
            ========================= */}
            <div className="col-md-9 productRow">

              {/* =========================
                  BEST PRODUCTS
              ========================= */}
              <div className="d-flex align-items-center">

                <div className="info w-75">
                  <h3 className="mb-0 hd">
                    BEST PRODUCT
                  </h3>

                  <p className="text-light text-sml mb-0">
                    Do not miss this offer in this month.
                  </p>
                </div>

                <Button className="viewAllBtn">
                  View All
                  <IoIosArrowRoundForward />
                </Button>

              </div>

              {/* BEST PRODUCT SLIDER */}
              <div className="product_row w-100 mt-2">
                {renderProductSlides(products)}
              </div>

              {/* =========================
                  NEW PRODUCTS
              ========================= */}
              <div className="d-flex align-items-center mt-4">

                <div className="info w-75">
                  <h3 className="mb-0 hd">
                    NEW PRODUCTS
                  </h3>

                  <p className="text-light text-sml mb-0">
                    New products with updated stocks.
                  </p>
                </div>

                <Button className="viewAllBtn">
                  View All
                  <IoIosArrowRoundForward />
                </Button>

              </div>

              {/* NEW PRODUCT SLIDER */}
              <div className="product_row w-100 mt-3">
                {renderProductSlides(products)}
              </div>

              {/* =========================
                  BANNERS
              ========================= */}
              <div className="d-flex mt-4 mb-5 bannerSec">

                <div className="banner mr-3">
                  <img
                    src={banner3}
                    alt="Banner"
                    className="cursor w-100"
                  />
                </div>

                <div className="banner">
                  <img
                    src={banner4}
                    alt="Banner"
                    className="cursor w-100"
                  />
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================
          NEWSLETTER
      ========================= */}
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
                Join our email subscription now to get updates on
                <br />
                promotions and coupons.
              </p>

              <form
                className="newsletterForm"
                onSubmit={(event) => event.preventDefault()}
              >

                <MdOutlineMail />

                <input
                  type="email"
                  placeholder="Your Email Address"
                />

                <Button type="submit">
                  Subscribe
                </Button>

              </form>

            </div>

            <div className="col-md-6 d-flex justify-content-end align-items-end">

              <img
                src={newsLetterImg}
                alt="Newsletter"
                className="img-fluid"
                style={{
                  maxWidth: "180px",
                  height: "180px",
                }}
              />

            </div>

          </div>
        </div>

      </section>

    

    </>
  );
};

export default Home;