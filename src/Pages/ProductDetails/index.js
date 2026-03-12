import ProductZoom from "../../Components/ProductZoom";
import Rating from '@mui/material/Rating';
import QuantityBox from "../../Components/QuantityBox";
import Button from '@mui/material/Button';
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";

const ProductDetails =() =>{
    const [activeSize, setActiveSize]=useState(null);

    const isActive=(index)=>{
        setActiveSize(index);
    }
return(
    <>

   <section className="productDetails section">
    <div className="container">
       <div className="row">
        <div className="col-md-4 pl-5">
            <ProductZoom/>
        </div>
        <div className="col-md-7 pl-5 pr-5">
             <h2 className="hd text-capitalize">Purely Natural Badam Crunchy & Nutty</h2>
        <ul className="list list-inline d-flex align-items-center">
            <li className="list-inline-item">
             <div className="d-flex align-items-center">
                   <span className="text-light mr-2">Brands:</span>
                <span>Vedaka</span>
             </div>
            </li>
            <li className="list-inline-item">
                
                <div className="d-flex align-items-center">
                      <Rating name="read-only" value={4.5} precision={0.5} readOnly
                       size="small"/>

                       <span className="text-light cursor ml-2">1 Review</span>
                </div>
            </li>
        </ul>
        <div class="d-flex info mb-3">
            <span class="oldPrice">₹1729</span>
            <span class="netPrice text-danger ml-3">₹1529</span>
            </div>

            <span className="badge badge-success">IN STOCK</span>

            <p className="mt-3">Packed in an integrated nuts & dried fruits unit and may contain occasional traces of other nuts & dried fruits

            </p>

            <div className="productSize d-flex align-items-center">
                <span>Sze/Weight: </span>
                 <ul className="list list-inline mb-0 pl-4">
    <li className="list-inline-item"><a className={`tag $
    {activeSize === 0 ? 'active' : ''}`} onClick={() => isActive(0)}>50g</a></li>

    <li className="list-inline-item"><a className={`tag $
    {activeSize === 1? 'active' : ''}`}  onClick={() => isActive(1)}>100g</a></li>

    <li className="list-inline-item"><a className={`tag $
    {activeSize === 2 ? 'active' : ''}`}  onClick={() => isActive(2)}>200g</a></li>

    <li className="list-inline-item"><a className={`tag $
    {activeSize === 3 ? 'active' : ''}`}  onClick={() => isActive(3)}>300g</a></li>

    <li className="list-inline-item"><a className={`tag $
    {activeSize === 4 ? 'active' : ''}`}  onClick={() => isActive(4)}>500g</a></li>
  </ul>
            </div>


            <div className="d-flex align-items-center mt-4">
                <QuantityBox/>
                <Button className="btn-blue btn-lg btn-big btn-round"><FaShoppingCart /> &nbsp; Add to Cart</Button>
            </div>


       

        </div>
       </div>

    </div>

   </section>
    </>
)


}
export default ProductDetails;