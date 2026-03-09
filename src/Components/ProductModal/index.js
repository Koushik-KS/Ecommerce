import React, { useContext, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { IoClose } from "react-icons/io5";
import Rating from "@mui/material/Rating";
import InnerImageZoom from "react-inner-image-zoom";

import "react-inner-image-zoom/lib/styles.min.css";

import QuantityBox from "../QuantityBox";
import { IoMdHeart } from "react-icons/io";
import { MdCompareArrows } from "react-icons/md";
import { MyContext } from "../../App";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const ProductModal = () => {

  const context = useContext(MyContext);
  const [bigSwiper, setBigSwiper] = useState(null);

  const goto = (index) => {
    if (bigSwiper) {
      bigSwiper.slideTo(index);
    }
  };

  return (

    <Dialog
      open={true}
      className="productModal"
      onClose={() => context.setisOpenProductModal(false)}
      maxWidth="md"
      fullWidth
    >

      <Button
        className="close_"
        onClick={() => context.setisOpenProductModal(false)}
      >
        <IoClose />
      </Button>

      <h4 className="mb-1 font-weight-bold">
        Purely Natural Badam Crunchy & Nutty
      </h4>

      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center mr-4">
          <span>Brands:</span>
          <span className="ml-2"><b>Vedaka</b></span>
        </div>

        <Rating value={5} size="small" precision={0.5} readOnly />
      </div>

      <hr />

      <div className="row mt-2 productDetaileModal">

        {/* LEFT IMAGE SECTION */}

        <div className="col-md-5">

          <div className="productZoom position-relative">

            <div className="badge badge-primary">28%</div>

            {/* BIG IMAGE SWIPER */}

            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              navigation={true}
              modules={[Navigation]}
              onSwiper={setBigSwiper}
              className="zoomSliderBig"
            >

              <SwiperSlide>
                <InnerImageZoom
                  zoomType="hover"
                  zoomScale={1.5}
                  src="https://m.media-amazon.com/images/I/818LBp+THNL._SX679_.jpg"
                />
              </SwiperSlide>

              <SwiperSlide>
                <InnerImageZoom
                  zoomType="hover"
                  zoomScale={1.5}
                  src="https://m.media-amazon.com/images/I/71gWT+vYaqL._SL1500_.jpg"
                />
              </SwiperSlide>

              <SwiperSlide>
                <InnerImageZoom
                  zoomType="hover"
                  zoomScale={1.5}
                  src="https://m.media-amazon.com/images/I/71q1-LfcioL._SL1500_.jpg"
                />
              </SwiperSlide>

              <SwiperSlide>
                <InnerImageZoom
                  zoomType="hover"
                  zoomScale={1.5}
                  src="https://m.media-amazon.com/images/I/718Q5UqorUL._SL1500_.jpg"
                />
              </SwiperSlide>

            </Swiper>

          </div>


          {/* THUMBNAIL SWIPER */}

          <Swiper
            slidesPerView={4}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation]}
            className="zoomSlider mt-3"
          >

            <SwiperSlide>
              <img
                src="https://m.media-amazon.com/images/I/818LBp+THNL._SX679_.jpg"
                className="w-100"
                onClick={() => goto(0)}
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="https://m.media-amazon.com/images/I/71gWT+vYaqL._SL1500_.jpg"
                className="w-100"
                onClick={() => goto(1)}
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="https://m.media-amazon.com/images/I/71q1-LfcioL._SL1500_.jpg"
                className="w-100"
                onClick={() => goto(2)}
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="https://m.media-amazon.com/images/I/718Q5UqorUL._SL1500_.jpg"
                className="w-100"
                onClick={() => goto(3)}
              />
            </SwiperSlide>

          </Swiper>

        </div>


        {/* RIGHT SIDE DETAILS */}

        <div className="col-md-7">

          <div className="d-flex info align-items-center mb-3">
            <span className="oldPrice lg ml-2">₹1729</span>
            <span className="netPrice text-danger lg ml-2">₹1529</span>
          </div>

          <span className="badge bg-success">IN STOCK</span>

          <p className="mt-3">
            Packed in an integrated nuts & dried fruits unit and may contain occasional traces of other nuts & dried fruits
          </p>

          <div className="d-flex align-items-center">

            <QuantityBox />

            <Button className="btn-blue btn-lg btn-big btn-round ml-3">
              Add to Cart
            </Button>

          </div>

          <div className="d-flex align-items-center mt-5 actions">

            <Button className="btn-round btn-sml" variant="outlined">
              <IoMdHeart /> &nbsp; ADD TO WISHLIST
            </Button>

            <Button className="btn-round btn-sml ml-3" variant="outlined">
              <MdCompareArrows /> &nbsp; Compare
            </Button>

          </div>

        </div>

      </div>

    </Dialog>
  );
};

export default ProductModal;