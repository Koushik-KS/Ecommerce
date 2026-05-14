import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';

import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import { MdBrandingWatermark } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import UserAvatarImgComponent from '../../components/userAvatarImg';
import Rating from '@mui/material/Rating';

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
       <div className='card productDetailsSEction'>
    
       <div className='row'>
        <div className='col-md-5 '>
          <div className='SliderWrapper pt-3 pb-3 ps-4 pe-4'>
            <h6 className='mb-4'>Product Gallery</h6>
            <Slider {...productSliderOptions} className='sliderBig mb-2'>
            <div className="item">
              <img src='https://www.zapdress.com/cdn/shop/files/O1CN01u1Rsh41psa8mdZ8Lq__2928235416-0-cib.jpg?v=1774589444&width=900'
              className='w-100'/>
              
            </div>
            

          </Slider>
         

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
        </div>

        <div className='col-md-7'>
  <div className="pt-3 pb-3 ps-4 pe-4">
    <h6 className='mb-4'>Product Details</h6>
    <h4> Formal suits for men wedding slim fit 3 piece dress business party jacket</h4>
    
    <div className='productInfo mt-3'>
      <div className='row mb-2'>
        <div className='col-sm-3 d-flex align-items-center'>
          <span className='icon'><MdBrandingWatermark /></span>
          <span className='name'>Brand</span>
        
      </div>

      <div className='col-sm-9'>
     :  <span>Zara</span>
      </div>
      </div>

      <div className='row mb-2'>
        <div className='col-sm-3 d-flex align-items-center'>
          <span className='icon'><MdBrandingWatermark /></span>
          <span className='name'>Category</span>
        
      </div>

      <div className='col-sm-9'>
     :  <span>Men's</span>
      </div>
      </div>

       <div className='row mb-2'>
        <div className='col-sm-3 d-flex align-items-center'>
          <span className='icon'><BiSolidCategory /></span>
          <span className='name'>Category</span>
        
      </div>

      <div className='col-sm-9'>
       : <span>
        <ul className='list list-inline tags sml'>
          <li className='list-inline-item'>
            <span>SUIT</span>
          </li>

           <li className='list-inline-item'>
            <span>PARTY</span>
          </li>

           <li className='list-inline-item'>
            <span>PARTY</span>
          </li>

           <li className='list-inline-item'>
            <span>DRESS</span>
          </li>

           <li className='list-inline-item'>
            <span>SMARTT</span>
          </li>

           <li className='list-inline-item'>
            <span>MAN</span>
          </li>
        </ul>
       </span>
      </div>
      </div>

      <div className='row mb-2'>
        <div className='col-sm-3 d-flex align-items-center'>
          <span className='icon'><BiSolidCategory /></span>
          <span className='name'>Tags</span>
        
      </div>

      <div className='col-sm-9'>
       : <span>
         <ul className='list list-inline tags sml'>
          <li className='list-inline-item'>
            <span>RED</span>
          </li>

           <li className='list-inline-item'>
            <span>BLUE</span>
          </li>

           <li className='list-inline-item'>
            <span>WHITE</span>
          </li>

          
        </ul>
       </span>
      </div>
      </div>

      <div className='row mb-2'>
        <div className='col-sm-3 d-flex align-items-center'>
          <span className='icon'><BiSolidCategory /></span>
          <span className='name'>Color</span>
        
      </div>

      <div className='col-sm-9'>
       : <span>Men's</span>
      </div>
      </div>

      <div className='row mb-2'>
        <div className='col-sm-3 d-flex align-items-center'>
          <span className='icon'><BiSolidCategory /></span>
          <span className='name'>Size</span>
        
      </div>

      <div className='col-sm-9'>
       : <span>(68) Piece</span>
      </div>
      </div>

      <div className='row mb-2'>
        <div className='col-sm-3 d-flex align-items-center'>
          <span className='icon'><BiSolidCategory /></span>
          <span className='name'>Price</span>
        
      </div>

      <div className='col-sm-9'>
       : <span>Men's</span>
      </div>
      </div>

      <div className='row mb-2'>
        <div className='col-sm-3 d-flex align-items-center'>
          <span className='icon'><BiSolidCategory /></span>
          <span className='name'>Stock</span>
        
      </div>

      <div className='col-sm-9'>
       : <span>Men's</span>
      </div>
      </div>

      <div className='row mb-2'>
        <div className='col-sm-3 d-flex align-items-center'>
          <span className='icon'><BiSolidCategory /></span>
          <span className='name'>Review</span>
        
      </div>

      <div className='col-sm-9'>
       : <span>Men's</span>
      </div>
      </div>

        <div className='row mb-2'>
        <div className='col-sm-3 d-flex align-items-center'>
          <span className='icon'><BiSolidCategory /></span>
          <span className='name'>Published</span>
        
      </div>

      <div className='col-sm-9'>
       : <span>Men's</span>
      </div>
      </div>

      

      

   

    </div>
  
  
  </div>
</div>
      </div>

    <div className='p-4'>
        <h6 className='mt-4 mb-3'>Product Description</h6>
      <p>Upgrade your style with this premium formal suit designed for a modern and classy look. 
Made with high-quality fabric, this suit offers excellent comfort, durability, and a perfect fit 
for weddings, parties, office meetings, and special occasions. 
The stylish design, smooth texture, and elegant finish make it an ideal choice for men who want 
confidence and sophistication in every step.

This suit is carefully tailored to provide a sharp and attractive appearance while ensuring maximum comfort throughout the day. 
Its breathable material helps you stay relaxed even during long hours of wear. 
The modern fit enhances your personality and gives a professional as well as fashionable touch. 
Perfectly matching with formal shoes, watches, and accessories, this suit adds elegance to your complete outfit. 
The premium stitching and detailed finishing increase durability and maintain the rich look for a long time. 
Whether you are attending a business event, engagement, reception, or festive celebration, this suit helps you stand out with confidence and style. 
Easy to maintain and suitable for all seasons, it is a must-have addition to every gentleman’s wardrobe.
</p>
<br/>

<h6 className='mt-4 mb-3'>Rating Analytics</h6>
<div className='ratingSection'>
  <div className='ratingrow d-flex align-items-center '>
    <span className='col1'>5 star</span>

    <div className='col2'>
       <div className="progress">
  <div className="progress-bar" style={{ width: '70%' }}></div>
</div>
    </div>

     <span className='col3'>(22)</span>
  </div>

    <div className='ratingrow d-flex align-items-center '>
    <span className='col1'>4 star</span>

    <div className='col2'>
       <div className="progress">
  <div className="progress-bar" style={{ width: '50%' }}></div>
</div>
    </div>

     <span className='col3'>(22)</span>
  </div>

  <div className='ratingrow d-flex align-items-center '>
    <span className='col1'>3 star</span>

    <div className='col2'>
       <div className="progress">
  <div className="progress-bar" style={{ width: '50%' }}></div>
</div>
    </div>

     <span className='col3'>(2)</span>
  </div>

    <div className='ratingrow d-flex align-items-center '>
    <span className='col1'>2 star</span>

    <div className='col2'>
       <div className="progress">
  <div className="progress-bar" style={{ width: '20%' }}></div>
</div>
    </div>

     <span className='col3'>(2)</span>
  </div>


    <div className='ratingrow d-flex align-items-center '>
    <span className='col1'>1 star</span>

    <div className='col2'>
       <div className="progress">
  <div className="progress-bar" style={{ width: '50%' }}></div>
</div>
    </div>

     <span className='col3'>(2)</span>
  </div>







</div>

<br/>

<h6 className='mt-4 mb-4'>Customer Reviews</h6>
<div className='reviewSecrion'>
  <div className='reviewsRow'>
    <div className='row'>
      <div className='col-sm-7'>
        <div className='userInfo d-flex align-items-center mb-3'>
          <UserAvatarImgComponent img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTx3SRpQ8G8mKf3SUHnnn5mzgz7jx2WnePnA&s" lg={true}/>
 <div className='info pl-3'>
          <h6>Koushik Shetty</h6>
          <span>25 minutes ago!</span>
        </div>
        </div>
        <Rating name="read-only" value={4.5}  precision={0.5}  readOnly />
      </div>

    </div>

  </div>
</div>
    </div>
     
    </div>



    </div>

   

    
    </>

    
  );
};

export default ProductDetails;