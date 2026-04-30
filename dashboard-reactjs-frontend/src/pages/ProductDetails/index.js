import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';

import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// breadcrumb style
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];

  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,

    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },

    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const ProductDetails = () => {

  var productSliderOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };

    var productSliderSmlOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
      arrows:false
  };
  return (
    <>
    <div className="right-content">
      

      <div className="card header-row">
        
        {/* LEFT SIDE */}
        <h5 className="title">Product View</h5>

        {/* RIGHT SIDE */}
        <div className="breadcrumb-wrapper">
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />

            <StyledBreadcrumb
              label="Products"
              component="a"
              href="#"
            />

            <StyledBreadcrumb label="Product View" />
          </Breadcrumbs>
        </div>

      </div>
       <div className='card'>
    
       <div className='row'>
        <div className='col-md-5 '>
          <div className='SliderWrapper pt-3 pb-3 pl-4 pr-4'>
            <h6 className='mb-3'>Product Gallery</h6>
            <Slider {...productSliderOptions} className='sliderBig mb-2'>
            <div className="item">
              <img src='https://www.zapdress.com/cdn/shop/files/O1CN01u1Rsh41psa8mdZ8Lq__2928235416-0-cib.jpg?v=1774589444&width=900'
              className='w-100'/>
              
            </div>
            

          </Slider>
          </div>

          <Slider {...productSliderSmlOptions} className='sliderSml'>
            <div className="item">
              <img src='https://www.zapdress.com/cdn/shop/files/O1CN01u1Rsh41psa8mdZ8Lq__2928235416-0-cib.jpg?v=1774589444&width=900'
              className='w-100'/>
          </div>

            <div className="item">
              <img src='https://www.zapdress.com/cdn/shop/files/960e37a66491045f142b56a32263a8a9.jpg?v=1774589444&width=900'
              className='w-100'/>
          </div>

            <div className="item">
              <img src='https://www.zapdress.com/cdn/shop/files/4dfae8ea5ff51f2c084baaea287505e6.jpg?v=1774589444&width=900'
              className='w-100'/>
          </div>

            <div className="item">
              <img src='https://www.zapdress.com/cdn/shop/files/960e37a66491045f142b56a32263a8a9.jpg?v=1774589444&width=900'
              className='w-100'/>
          </div>

            <div className="item">
              <img src='https://www.zapdress.com/cdn/shop/files/12803434665_843810280.jpg?v=1774589445&width=900'
              className='w-100'/>
          </div>

            <div className="item">
              <img src='https://www.zapdress.com/cdn/shop/files/O1CN01u1Rsh41psa8mdZ8Lq__2928235416-0-cib.jpg?v=1774589444&width=900'
              className='w-100'/>
          </div>

           
            
            

          </Slider>
          

        </div>

        <div className='col-md-7'>
   
        </div>
      </div>
     
    </div>



    </div>

   

    
    </>

    
  );
};

export default ProductDetails;