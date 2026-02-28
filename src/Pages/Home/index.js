import React from "react";
import HomeBanner from "../../Components/HomeBanner";
import banner1 from "../../assets/images/banner1.jpg";
import Button from "@mui/material/Button";
import { IoIosArrowRoundForward } from "react-icons/io";
import Slider from "react-slick";
import Rating from '@mui/material/Rating';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
                <Slider {...productSliderOptions}>

                  <div className="item productItem">
                    <div className="imgWrapper">
                      <img 
                        src="https://m.media-amazon.com/images/I/71386F6rF+L._AC_UY327_FMwebp_QL65_.jpg" 
                        alt="product1"
                        className="w-100"/>
                    </div>
                    <h4>Vedaka Whole Cashews | 200 Gram | Grade W320 Kaju | Firm Texture, Rich Taste | Healthy Snack</h4>
                   <span className="text-success d-block">In Stock</span>
                    <Rating className="mt-2 mb-2" name="read-only" value={5} readOnly size="small"precision={0.5}/>
                      <div className="d-flex">
                        <span className="oldPrice">₹350</span>
                         <span className="netPrice text-danger ml-3">₹299</span>
                      </div>
                 
                  </div>
 

                  <div className="item productItem">
                    <div className="imgWrapper">
                      <img 
                        src="https://m.media-amazon.com/images/I/71sXG9x1bSL._AC_UY327_FMwebp_QL65_.jpg" 
                        alt="product2"
                        className="w-100"
                      />
                    </div>
                     <h4>Vedaka Whole Cashews | 200 Gram | Grade W320 Kaju | Firm Texture, Rich Taste | Healthy Snack</h4>
                   <span className="text-success d-block">In Stock</span>
                    <Rating className="mt-2 mb-2" name="read-only" value={5} readOnly size="small"precision={0.5}/>
                      <div className="d-flex">
                        <span className="oldPrice">₹350</span>
                         <span className="netPrice text-danger ml-3">₹299</span>
                      </div>
                  </div>

                  <div className="item productItem">
                    <div className="imgWrapper">
                      <img 
                        src="https://m.media-amazon.com/images/I/81u0Uo4nQdL._AC_UY327_FMwebp_QL65_.jpg" 
                        alt="product3"
                        className="w-100"
                      />
                    </div>
                     <h4>Vedaka Whole Cashews | 200 Gram | Grade W320 Kaju | Firm Texture, Rich Taste | Healthy Snack</h4>
                   <span className="text-success d-block">In Stock</span>
                    <Rating className="mt-2 mb-2" name="read-only" value={5} readOnly size="small"precision={0.5}/>
                      <div className="d-flex">
                        <span className="oldPrice">₹350</span>
                         <span className="netPrice text-danger ml-3">₹299</span>
                      </div>
                  </div>

                  <div className="item productItem">
                    <div className="imgWrapper">
                      <img 
                        src="https://m.media-amazon.com/images/I/71AHZUc7CFL._AC_UY327_FMwebp_QL65_.jpg" 
                        alt="product4"
                        className="w-100"
                      />
                    </div>
                     <h4>Vedaka Whole Cashews | 200 Gram | Grade W320 Kaju | Firm Texture, Rich Taste | Healthy Snack</h4>
                   <span className="text-success d-block">In Stock</span>
                    <Rating className="mt-2 mb-2" name="read-only" value={5} readOnly size="small"precision={0.5}/>
                      <div className="d-flex">
                        <span className="oldPrice">₹350</span>
                         <span className="netPrice text-danger ml-3">₹299</span>
                      </div>
                  </div>

                  <div className="item productItem">
                    <div className="imgWrapper">
                      <img 
                        src="https://m.media-amazon.com/images/I/71D96ykEFNL._AC_UY327_FMwebp_QL65_.jpg" 
                        alt="product5"
                        className="w-100"
                      />
                    </div>
                     <h4>Vedaka Whole Cashews | 200 Gram | Grade W320 Kaju | Firm Texture, Rich Taste | Healthy Snack</h4>
                   <span className="text-success d-block">In Stock</span>
                    <Rating className="mt-2 mb-2" name="read-only" value={5} readOnly size="small"precision={0.5}/>
                      <div className="d-flex">
                        <span className="oldPrice">₹350</span>
                         <span className="netPrice text-danger ml-3">₹299</span>
                      </div>
                  </div>
 
                </Slider>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;