import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import QuantityBox from "../../Components/QuantityBox";

import { IoClose } from "react-icons/io5";

const Cart =() =>{

    return(
        <>
        <section className="section cartPage">
            <div className="container">
                 <h2 className="hd mb-0">Your Cart</h2>
                        <p>There are <b>3</b> products in your cart</p>


                <div className="row">
                    <div className="col-md-8">
                       
                        <div className="table-responsive">
                    <table className="table  ">
                        <thead>
                            <tr>
                            <th width="35%" >Product</th>
                            <th width="15%">Unit Price</th>
                            <th width="25%">Quantity</th>
                            <th width="15%">Subtotal</th>
                             <th width="10%">Remove</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td width="35%">
                                    <Link to="/product/1">
                                    <div className="d-flex align-items-center cartItemimgWrapper">
                                        <div className="imgWrapper">
                                            <img src="https://i.pinimg.com/736x/ef/1a/fb/ef1afbc7cd59bf7918e1c3d600f53986.jpg" className="w-100"/>
                                            
                                       </div>

                                       <div className="info px-3">
                                        <h6> Icecream</h6> <Rating name="read-only" value={4.5} readOnly precision={0.5} size="small"/>

                                       </div>
                                    </div>
                                    </Link>
                                </td>
                                <td width="15%">₹150</td>
                                <td width="25%"><QuantityBox/></td>
                                <td width="15%">₹150</td>
                                <td width="10%"><span className="remove"><IoClose /></span></td>
                            </tr>

                             <tr>
                                <td width="35%">
                                    <Link to="/product/1">
                                    <div className="d-flex align-items-center cartItemimgWrapper">
                                        <div className="imgWrapper">
                                            <img src="https://i.pinimg.com/736x/ef/1a/fb/ef1afbc7cd59bf7918e1c3d600f53986.jpg" className="w-100"/>
                                            
                                       </div>

                                       <div className="info px-3">
                                        <h6> Icecream</h6> <Rating name="read-only" value={4.5} readOnly precision={0.5} size="small"/>

                                       </div>
                                    </div>
                                    </Link>
                                </td>
                                <td width="15%">₹150</td>
                                <td width="25%"><QuantityBox/></td>
                                <td width="15%">₹150</td>
                                <td width="10%"><span className="remove"><IoClose /></span></td>
                            </tr>

                             <tr>
                                <td width="35%">
                                    <Link to="/product/1">
                                    <div className="d-flex align-items-center cartItemimgWrapper">
                                        <div className="imgWrapper">
                                            <img src="https://i.pinimg.com/736x/ef/1a/fb/ef1afbc7cd59bf7918e1c3d600f53986.jpg" className="w-100"/>
                                            
                                       </div>

                                       <div className="info px-3">
                                        <h6> Icecream</h6> <Rating name="read-only" value={4.5} readOnly precision={0.5} size="small"/>

                                       </div>
                                    </div>
                                    </Link>
                                </td>
                                <td width="15%">₹150</td>
                                <td width="25%"><QuantityBox/></td>
                                <td width="15%">₹150</td>
                                <td width="10%"><span className="remove"><IoClose /></span></td>
                            </tr>

                             <tr>
                                <td width="35%">
                                    <Link to="/product/1">
                                    <div className="d-flex align-items-center cartItemimgWrapper">
                                        <div className="imgWrapper">
                                            <img src="https://i.pinimg.com/736x/ef/1a/fb/ef1afbc7cd59bf7918e1c3d600f53986.jpg" className="w-100"/>
                                            
                                       </div>

                                       <div className="info px-3">
                                        <h6> Icecream</h6> <Rating name="read-only" value={4.5} readOnly precision={0.5} size="small"/>

                                       </div>
                                    </div>
                                    </Link>
                                </td>
                                <td width="15%">₹150</td>
                                <td width="25%"><QuantityBox/></td>
                                <td width="15%">₹150</td>
                                <td width="10%"><span className="remove"><IoClose /></span></td>
                            </tr>

                             <tr>
                                <td width="35%">
                                    <Link to="/product/1">
                                    <div className="d-flex align-items-center cartItemimgWrapper">
                                        <div className="imgWrapper">
                                            <img src="https://i.pinimg.com/736x/ef/1a/fb/ef1afbc7cd59bf7918e1c3d600f53986.jpg" className="w-100"/>
                                            
                                       </div>

                                       <div className="info px-3">
                                        <h6> Icecream</h6> <Rating name="read-only" value={4.5} readOnly precision={0.5} size="small"/>

                                       </div>
                                    </div>
                                    </Link>
                                </td>
                                <td width="15%">₹150</td>
                                <td width="25%"><QuantityBox/></td>
                                <td width="15%">₹150</td>
                                <td width="10%"><span className="remove"><IoClose /></span></td>
                            </tr>

                             <tr>
                                <td width="35%">
                                    <Link to="/product/1">
                                    <div className="d-flex align-items-center cartItemimgWrapper">
                                        <div className="imgWrapper">
                                            <img src="https://i.pinimg.com/736x/ef/1a/fb/ef1afbc7cd59bf7918e1c3d600f53986.jpg" className="w-100"/>
                                            
                                       </div>

                                       <div className="info px-3">
                                        <h6> Icecream</h6> <Rating name="read-only" value={4.5} readOnly precision={0.5} size="small"/>

                                       </div>
                                    </div>
                                    </Link>
                                </td>
                                <td width="15%">₹150</td>
                                <td width="25%"><QuantityBox/></td>
                                <td width="15%">₹150</td>
                                <td width="10%"><span className="remove"><IoClose /></span></td>
                            </tr>
                        </tbody>

                    </table>
                </div>


                        </div>
                        <div className="col-md-4">
                            <div className="card border p-3 cartDetails">
                                <h4>CART TOTALS</h4>

                                <div className="d-flex align-items-center mb-3">
                                    <span>Subtotal</span>
                                    <span className="ml-auto text-red">₹1200</span>
                                </div>

                                 <div className="d-flex align-items-center mb-3">
                                    <span>Shipping</span>
                                    <span className="ml-auto text-red">Free</span>
                                </div>

                                 <div className="d-flex align-items-center mb-3">
                                    <span>Estimate For</span>
                                    <span className="ml-auto text-red">India</span>
                                </div>

                                 <div className="d-flex align-items-center mb-3">
                                    <span>Total</span>
                                    <span className="ml-auto text-red">₹1200</span>
                                </div>

                            </div>

                        </div>
                        </div>                

            </div>
        </section>
        </>
    )


}
export default Cart;