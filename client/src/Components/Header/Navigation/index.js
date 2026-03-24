import Button from "@mui/material/Button";
import { IoMdMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
const Navigation  =()=>{

    const [isopenSidebarVal,setisopenSidebarVal] = useState(false);

    return(

         <nav>
            <div className="container">
                <div className='row'>
                    <div className='col-sm-2 navPart1'>

                        <div className="catWapper">   

                        <Button className='allcatTab align-items-center ' onClick={()=>setisopenSidebarVal(!isopenSidebarVal)}>
                            <span className="icon1"><IoMdMenu/></span>

                        <span className='text'>ALL CATEGORIES</span>
                         <span className="icon2">  <FaAngleDown /></span>

                        <span className="ml-auto">
      
      </span>
                        </Button>
                        <div className={`sidebarNav ${isopenSidebarVal===true ? 'open' : ''}`}>
                            <ul>
                                <li><Link to="/"><Button>men <FaAngleRight className="ml-auto"/></Button></Link>

                                <div className="submenu">
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>footwear</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                </div></li>



                              <li><Link to="/"><Button>women <FaAngleRight className="ml-auto"/></Button></Link>
                              <div className="submenu">
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>footwear</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                </div>
                              </li>  
                              <li><Link to="/"><Button>beauty</Button></Link></li>  
                              <li><Link to="/"><Button>watches</Button></Link></li>  
                              <li><Link to="/"><Button>kids</Button></Link></li>  
                              <li>  <Link to="/"><Button>gifts</Button></Link></li>
                              <li><Link to="/"><Button>men</Button></Link></li>
                              <li><Link to="/"><Button>women</Button></Link></li>  
                              <li><Link to="/"><Button>beauty</Button></Link></li>  
                              <li><Link to="/"><Button>watches</Button></Link></li>  
                              <li><Link to="/"><Button>kids</Button></Link></li>  
                              <li>  <Link to="/"><Button>gifts</Button></Link></li>
                            </ul>
                            
                        </div>

</div>
                    </div>
                    <div className='col-sm-10 navPart2 d-flex align-items-center-center '>
                        <ul className="list list-inline m-auto">
                           
                            <li className="list-inline-item"><Link to="/"><Button> HOME</Button></Link></li>
                              
                            
                            <li className="list-inline-item"><Link to="/"><Button>MEN</Button></Link>
                            <div className="submenu shadow">
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>footwear</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                
                                
                                </div>
                            
                            </li>

                            <li className="list-inline-item"><Link to="/"><Button>WOMEN</Button></Link>
                              <div className="submenu shadow">
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>footwear</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                
                                
                                </div>
                            
                            </li>
                            <li className="list-inline-item"><Link to="/"><Button>BEAUTY</Button></Link>
                              <div className="submenu shadow">
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>footwear</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                
                                
                                </div></li>

                            <li className="list-inline-item"><Link to="/"><Button>WATCHES</Button></Link>  <div className="submenu shadow">
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>footwear</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                
                                
                                </div></li>

                             <li className="list-inline-item"><Link to="/"><Button>KIDS</Button></Link>
                               <div className="submenu shadow">
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>footwear</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                
                                
                                </div></li>
                              <li className="list-inline-item"><Link to="/"><Button>GIFT</Button></Link> 
                               <div className="submenu shadow">
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>footwear</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                
                                
                                </div></li>

                            <li className="list-inline-item"><Link to="/"><Button>BLOG</Button></Link>
                              <div className="submenu shadow">
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>footwear</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                
                                
                                </div></li>
                             <li className="list-inline-item"><Link to="/"><Button>CONTACT</Button></Link>
                               <div className="submenu shadow">
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>footwear</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                <Link to="/"><Button>clothing</Button></Link>
                                
                                
                                </div></li>
                        </ul>

                    </div>

                </div>
                </div>


        </nav>
    )
}
export default Navigation;