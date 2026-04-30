import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';

import React from "react";
import Slider from "react-slick";
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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
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
        <div className='col-md-4'>
          <Slider {...productSliderOptions}>

          </Slider>

        </div>

        <div className='col-md-8'>
          
        </div>
      </div>
     
    </div>



    </div>

   

    
    </>

    
  );
};

export default ProductDetails;