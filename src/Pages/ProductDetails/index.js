import ProductZoom from "../../Components/ProductZoom";
import Rating from '@mui/material/Rating';

const ProductDetails =() =>{
return(
    <>

   <section className="productDetails section">
    <div className="container">
       <div className="row">
        <div className="col-md-4">
            <ProductZoom/>
        </div>
        <div className="col-md-7">
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
        <div class="d-flex info">
            <span class="oldPrice">₹1729</span>
            <span class="netPrice text-danger ml-3">₹1529</span>
            </div>
       

        </div>
       </div>

    </div>

   </section>
    </>
)


}
export default ProductDetails;