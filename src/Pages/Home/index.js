import React from "react";
import HomeBanner from "../../Components/HomeBanner";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import Button from "@mui/material/Button";
import { IoIosArrowRoundForward } from "react-icons/io";
import ProductItem from "../../Components/ProductItem";
import HomeCat from "../../Components/HomeCat";

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
                <img
                  src={banner1}
                  alt="Fashion banner"
                  className="cursor w-100"
                />
              </div>
              <div className="banner mt-3">
                <img
                  src={banner2}
                  alt="Fashion banner"
                  className="cursor w-100"
                />
              </div>
            </div>

            {/* RIGHT PRODUCTS */}
            <div className="col-md-9 productRow">

              {/* BEST SELLER */}
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

              {/* ProductItem is already a Swiper → DON'T WRAP */}
              <ProductItem />

              {/* NEW PRODUCTS */}
              <div className="d-flex align-items-center justify-content-between mb-2 w-100 mt-5">
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

              
              <ProductItem />
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Home;