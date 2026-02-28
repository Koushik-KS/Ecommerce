import React from "react";
import HomeBanner from "../../Components/HomeBanner";
import banner1 from "../../assets/images/banner1.jpg";
import Button from "@mui/material/Button";
import { IoIosArrowRoundForward } from "react-icons/io";
import Slider from "react-slick";
import Rating from '@mui/material/Rating';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductItem from "../../Components/ProductItem";

/* Custom Previous Arrow */
const PrevArrow = ({ onClick }) => {
  return (
    <div className="customArrow prevArrow" onClick={onClick}>
      &#10094;
    </div>
  );
};

/* Custom Next Arrow */
const NextArrow = ({ onClick }) => {
  return (
    <div className="customArrow nextArrow" onClick={onClick}>
      &#10095;
    </div>
  );
};

const Home = () => {

  const productSliderOptions = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  };

  return (
    <>
      <HomeBanner />

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
            </div>

            <div className="col-md-9 productRow">

              <div className="d-flex align-items-center justify-content-between mb-2 w-100">
                <div className="info">
                  <h3 className="mb-0 hd">BEST SELLER</h3>
                  <p className="text-light text-sml mb-0">
                    Do not miss the current offers until the end of the month.
                  </p>
                </div>

                <Button className="viewAllBtn">
                  View All <IoIosArrowRoundForward />
                </Button>
              </div>

              <div className="product_row w-100">
                <ProductItem />
              </div>


              <div className="d-flex align-items-center justify-content-between mb-2 w-100">
                <div className="info">
                  <h3 className="mb-0 hd">NEW PRODUCTS</h3>
                  <p className="text-light text-sml mb-0">New product with updated  stocks.
                    
                  </p>
                </div>

                <Button className="viewAllBtn">
                  View All <IoIosArrowRoundForward />
                </Button>
              </div>

              <div className="product_row w-100">
                <ProductItem />
              </div>



            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;