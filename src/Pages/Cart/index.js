import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';

const Cart =() =>{

    return(
        <>
        <section className="sectio cartPage">
            <div className="container">

                <div className="row">
                    <div className="col-md-8">
                        <h2 className="hd mb-0">Your Cart</h2>
                        <p>There are <b>3</b> products in your cart</p>

                        <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                            <th>Product</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                             <th>Remove</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
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
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>

                    </table>
                </div>


                        </div>
                        <div className="col-md-4">

                        </div>
                        </div>                

            </div>
        </section>
        </>
    )


}
export default Cart;