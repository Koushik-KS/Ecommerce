import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeBanner = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    pauseOnFocus: true
  };

  return (
    <div className="homeBannerSection">
      <Slider {...settings}>
        <div className="item ">
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/af_unrec_h1._CB786855017_.jpg" className="w-100" alt="banner" />
        </div>
        <div className="item">
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/2026/GW/PC/Unrec/Frame_2147205289._CB786510766_.jpg" className="w-100" alt="banner" />
        </div>
        <div className="item">
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/CookwareDining/tdhruvko/GW/BAU/Feb26/1_GW-Hero-Pc-HDFC-KOTAK-ONE-YES-Bank._CB787666247_.jpg" className="w-100" alt="banner" />
        </div>
        <div className="item">
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Unrec/TallHero_3000X1200_Unrec._CB593464763_.jpg" className="w-100" alt="banner" />
        </div>
      </Slider>
    </div>
  );
};

export default HomeBanner;