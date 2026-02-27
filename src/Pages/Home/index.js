
import HomeBanner from "../../Components/HomeBanner";
import banner1 from "../../assets/images/banner1.png";
import Button from "@mui/material/Button";
import { IoIosArrowRoundForward } from "react-icons/io";
import React from "react";
import Slider from "react-slick";


const Home = () => {

   var productSliderOptions = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
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

            <div className="col-md-9 productRow ">
              <div className="d-flex align-items-center">
                <div className="info w-75">
                  <h3 className="mb-0 hd">BEST SELLER</h3>
                  <p className="text-light text-sml mb-0">Do not miss the current offers until the end of the month.</p>
                </div>
                <Button className="viewAllBtn ml-auto">View All <IoIosArrowRoundForward /></Button>
              </div>
              
              <div className="product_row w-100">

              <Slider {...productSliderOptions}>
                <div className="item productItem">
                  <div className="imgWrapper">
                    <img src={banner1} alt="product" className="w-100" />
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