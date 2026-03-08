import React, { useRef } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { IoClose } from "react-icons/io5";
import Rating from "@mui/material/Rating";
import Slider from "react-slick";
import InnerImageZoom from "react-inner-image-zoom";

import "react-inner-image-zoom/lib/styles.min.css";

import QuantityBox from "../QuantityBox";

const ProductModal = (props) => {

  const zoomSliderBig = useRef();
  const zoomSlider = useRef();

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    fade: false,
    arrows:true
  };

  var settings2 = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: false,
  };

 const goto = (index) => {
  zoomSlider.current.slickGoTo(index);
  zoomSliderBig.current.slickGoTo(index);
};

  return (
    <>
      <Dialog open={true} className="productModal" onClose={() => props.closeProductModal()}>

        <Button className="close_" onClick={() => props.closeProductModal()}>
          <IoClose />
        </Button>

        <h4 className="mb-1 font-weight-bold">
          Purely Natural Badam Crunchy & Nutty | 
        </h4>

        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center mr-4">
            <span>Brands:</span>
            <span className="ml-2"><b>Vedaka</b></span>
          </div>

          <Rating name="read-only" value={5} size="small" precision={0.5} readOnly />
        </div>

        <hr />

        <div className="row mt-2 productDetaileModal">
          <div className="col-md-5">
            <div className="productZoom">

              <Slider {...settings2} className="zoomSliderBig" ref={zoomSliderBig}>
                <div className="item">
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src="https://m.media-amazon.com/images/I/818LBp+THNL._SX679_.jpg"
                  />
                </div>

                 <div className="item">
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src="https://m.media-amazon.com/images/I/71gWT+vYaqL._SL1500_.jpg"
                  />
                </div>

                 <div className="item">
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src="https://m.media-amazon.com/images/I/71q1-LfcioL._SL1500_.jpg"
                  />
                </div>

                 <div className="item">
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src="https://m.media-amazon.com/images/I/718Q5UqorUL._SL1500_.jpg"
                  />
                </div>

                 
              </Slider>

            </div>


        <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
        <div className="item" >
        <img src="https://m.media-amazon.com/images/I/818LBp+THNL._SX679_.jpg" 
        className="w-100" onClick={()=>goto(0)}/>
        </div>
    
  <div className="item" >
        <img src="https://m.media-amazon.com/images/I/71gWT+vYaqL._SL1500_.jpg" 
        className="w-100"onClick={()=>goto(1)} />
        </div>
       

        <div className="item" >
        <img src="https://m.media-amazon.com/images/I/71q1-LfcioL._SL1500_.jpg"
         className="w-100" onClick={()=>goto(2)} />
        </div>
   
     <div className="item" >
        <img src="https://m.media-amazon.com/images/I/718Q5UqorUL._SL1500_.jpg" 
        className="w-100" onClick={()=>goto(3)}/>
        </div>
       
      
       </Slider>
       


</div>

          <div className="col-md-7">
            <div className="d-flex info align-items-center mb-3">
               <span className="oldPrice lg ml-2">₹1729</span>
          <span className="netPrice text-danger lg ml-2">₹1529</span>

            </div>
            <span className="badge bg-success">IN STOCK</span>
            <p className="mt-3">Packed in an integrated nuts & dried fruits unit
               and may contain occasional traces of other nuts &
                dried fruits</p>



                <div className="d-flex align-items-center">
                 <QuantityBox/>
                  <Button className="btn-blue btn-lg btn-big btn-round ml-3">Add to Cart</Button>
                </div>






                 

          </div>
        </div>

        <br /><br /><br />

      </Dialog>
    </>
  );
};

export default ProductModal;