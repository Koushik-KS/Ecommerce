import { IoShirtOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { RiDiscountPercentLine } from "react-icons/ri";
import { LuBadgeIndianRupee } from "react-icons/lu";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";

const Footer =()=>{
    return(
        <footer>
            <div className="container">
                <div className="topInfo row">
                    <div className="col d-flex align-item-center">
                        <span><IoShirtOutline /></span>
                        <span className="ml-2">Every fresh products</span>

                    </div>

                     <div className="col d-flex align-item-center">
                        <span><TbTruckDelivery /></span>
                        <span className="ml-2">Free delivery for order over ₹50</span>

                    </div>

                     <div className="col d-flex align-item-center">
                        <span><RiDiscountPercentLine /></span>
                        <span className="ml-2">Daily Mega Discounts</span>

                    </div>

                     <div className="col d-flex align-item-center">
                        <span><LuBadgeIndianRupee /></span>
                        <span className="ml-2">Best price on the market</span>

                    </div>
                </div>


                <div className="row mt-5 linkssWrap">
                    <div className="col">
                        <h5>FRUIT & VEGETABLES</h5>
                       <ul>
                        <li><Link to="#">Fresh Vegetables</Link></li>
                        <li><Link to="#">Herbs & Seasonings</Link></li>
                        <li><Link to="#">Fresh Fruits</Link></li>
                        <li><Link to="#">Cuts & Sprouts</Link></li>
                        <li><Link to="#">Exotic Fruits & veggies</Link></li>
                        <li><Link to="#">Packaged Produce</Link></li>
                         <li><Link to="#">Party Trays</Link></li>
                       </ul>
                    </div>

                     <div className="col">
                        <h5>BREAKFAST & DAIRY</h5>
                       <ul>
                        <li><Link to="#">Fresh Vegetables</Link></li>
                        <li><Link to="#">Herbs & Seasonings</Link></li>
                        <li><Link to="#">Fresh Fruits</Link></li>
                        <li><Link to="#">Cuts & Sprouts</Link></li>
                        <li><Link to="#">Exotic Fruits & veggies</Link></li>
                        <li><Link to="#">Packaged Produce</Link></li>
                         <li><Link to="#">Party Trays</Link></li>
                       </ul>
                    </div>

                     <div className="col">
                        <h5>MEAT & SEAFOOD</h5>
                       <ul>
                        <li><Link to="#">Fresh Vegetables</Link></li>
                        <li><Link to="#">Herbs & Seasonings</Link></li>
                        <li><Link to="#">Fresh Fruits</Link></li>
                        <li><Link to="#">Cuts & Sprouts</Link></li>
                        <li><Link to="#">Exotic Fruits & veggies</Link></li>
                        <li><Link to="#">Packaged Produce</Link></li>
                         <li><Link to="#">Party Trays</Link></li>
                       </ul>
                    </div>

                     <div className="col">
                        <h5>BREAD & BAKERY</h5>
                       <ul>
                        <li><Link to="#">Fresh Vegetables</Link></li>
                        <li><Link to="#">Herbs & Seasonings</Link></li>
                        <li><Link to="#">Fresh Fruits</Link></li>
                        <li><Link to="#">Cuts & Sprouts</Link></li>
                        <li><Link to="#">Exotic Fruits & veggies</Link></li>
                        <li><Link to="#">Packaged Produce</Link></li>
                         <li><Link to="#">Party Trays</Link></li>
                       </ul>
                    </div>

                     <div className="col">
                        <h5>FRUIT & VEGETABLES</h5>
                       <ul>
                        <li><Link to="#">Fresh Vegetables</Link></li>
                        <li><Link to="#">Herbs & Seasonings</Link></li>
                        <li><Link to="#">Fresh Fruits</Link></li>
                        <li><Link to="#">Cuts & Sprouts</Link></li>
                        <li><Link to="#">Exotic Fruits & veggies</Link></li>
                        <li><Link to="#">Packaged Produce</Link></li>
                         <li><Link to="#">Party Trays</Link></li>
                       </ul>
                    </div>
                </div>

                <div className="copyright mt-3 pt-3 pb-3 d-flex">
                    <p className="mb-0">Copyright 2026. All rights reserved. </p>
                    <ul className="list list-inline ml-auto mb-0 socials">
                        <li className="list-inline-item">
                            <Link to="#"><FaFacebookF /></Link>
                        </li>

                        <li className="list-inline-item">
                            <Link to="#"><RiTwitterXFill /></Link>
                        </li>

                        <li className="list-inline-item">
                            <Link to="#"><FaInstagram /></Link>
                        </li>

                    </ul>

                </div>





          
          
            </div>
        </footer>


    )


}
export default Footer;