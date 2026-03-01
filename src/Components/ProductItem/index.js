
import Slider from "react-slick";
import Rating from '@mui/material/Rating';
import Button from "@mui/material/Button";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TfiFullscreen } from "react-icons/tfi";
import { CiHeart } from "react-icons/ci";


const ProductItem = () => {

  // ✅ ADDED THIS (Error Fix)
  const productSliderOptions = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true
  };

  return (

    <Slider {...productSliderOptions}>

      <div className="item productItem">
        <div className="imgWrapper">
          <img 
            src="https://m.media-amazon.com/images/I/71386F6rF+L._AC_UY327_FMwebp_QL65_.jpg" 
            alt="product1"
            className="w-100"/>
          <span className="badge badge-primary">28%</span>
          <div className="actions">
            <Button><TfiFullscreen /></Button>
             <Button><CiHeart style={{fontSize:'20px'}}/></Button>
            
          </div>
        </div>

        <h4>Vedaka Whole Cashews | 200 Gram | Grade W320 Kaju | Firm Texture, Rich Taste | Healthy Snack</h4>
        <span className="text-success d-block">In Stock</span>
        <Rating className="mt-2 mb-2" value={5} readOnly size="small" precision={0.5}/>
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
            className="w-100"/>
            <span className="badge badge-primary">28%</span>
          <div className="actions">
            <Button><TfiFullscreen /></Button>
             <Button><CiHeart style={{fontSize:'20px'}}/></Button>
            
          </div>
        </div>
        <h4>Vedaka Whole Cashews | 200 Gram | Grade W320 Kaju | Firm Texture, Rich Taste | Healthy Snack</h4>
        <span className="text-success d-block">In Stock</span>
        <Rating className="mt-2 mb-2" value={5} readOnly size="small" precision={0.5}/>
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
            className="w-100"/>
            <span className="badge badge-primary">28%</span>
          <div className="actions">
            <Button><TfiFullscreen /></Button>
             <Button><CiHeart style={{fontSize:'20px'}}/></Button>
            
          </div>
        </div>
        <h4>Vedaka Whole Cashews | 200 Gram | Grade W320 Kaju | Firm Texture, Rich Taste | Healthy Snack</h4>
        <span className="text-success d-block">In Stock</span>
        <Rating className="mt-2 mb-2" value={5} readOnly size="small" precision={0.5}/>
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
            className="w-100"/>
            <span className="badge badge-primary">28%</span>
          <div className="actions">
            <Button><TfiFullscreen /></Button>
             <Button><CiHeart style={{fontSize:'20px'}}/></Button>
            
          </div>
        </div>
        <h4>Vedaka Whole Cashews | 200 Gram | Grade W320 Kaju | Firm Texture, Rich Taste | Healthy Snack</h4>
        <span className="text-success d-block">In Stock</span>
        <Rating className="mt-2 mb-2" value={5} readOnly size="small" precision={0.5}/>
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
          <span className="badge badge-primary">28%</span>
          <div className="actions">
            <Button><TfiFullscreen /></Button>
             <Button><CiHeart style={{fontSize:'20px'}}/></Button>
            
          </div>
        </div>
        <h4>Vedaka Whole Cashews | 200 Gram | Grade W320 Kaju | Firm Texture, Rich Taste | Healthy Snack</h4>
        <span className="text-success d-block">In Stock</span>
        <Rating className="mt-2 mb-2" value={5} readOnly size="small" precision={0.5}/>
        <div className="d-flex">
          <span className="oldPrice">₹350</span>
          <span className="netPrice text-danger ml-3">₹299</span>
        </div>
      </div>

    </Slider>
  );
};

export default ProductItem;