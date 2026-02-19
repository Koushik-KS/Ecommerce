import Button from "@mui/material/Button";
import { IoMdMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Navigation  =()=>{

    return(

         <nav>
            <div className="container">
                <div className='row'>
                    <div className='col-sm-2 navPart1'>

                        <Button className='allcatTab align-items-center '>
                            <span className="icon1"><IoMdMenu/></span>

                        <span className='text'>ALL CATEGORIES</span>
                         <span className="icon2">  <FaAngleDown /></span>

                        <span className="ml-auto">
      
      </span>
                        </Button>


                    </div>
                    <div className='col-sm-10 navPart2 d-flex align-items-center-center '>
                        <ul className="list list-inline m-auto">
                            <li className="list-inline-item"><Link to="/"></Link></li>
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

                            <li className="list-inline-item"><Link to="/"><Button>WOMEN</Button></Link></li>
                            <li className="list-inline-item"><Link to="/"><Button>BEAUTY</Button></Link></li>

                            <li className="list-inline-item"><Link to="/"><Button>WATCHES</Button></Link></li>

                             <li className="list-inline-item"><Link to="/"><Button>KIDS</Button></Link></li>
                              <li className="list-inline-item"><Link to="/"><Button>GIFT</Button></Link></li>

                            <li className="list-inline-item"><Link to="/"><Button>BLOG</Button></Link></li>
                             <li className="list-inline-item"><Link to="/"><Button>CONTACT</Button></Link></li>
                        </ul>

                    </div>

                </div>
                </div>


        </nav>
    )
}
export default Navigation;