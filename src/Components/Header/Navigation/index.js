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
                            <li className="list-inline-item"><Link to="/"><Button> Home</Button></Link></li>
                            
                            <li className="list-inline-item"><Link to="/"><Button>Fashion</Button></Link></li>
                            <li className="list-inline-item"><Link to="/"><Button>Electronic</Button></Link></li>
                            <li className="list-inline-item"><Link to="/"><Button>Bakery</Button></Link></li>

                            <li className="list-inline-item"><Link to="/"><Button>Grocery</Button></Link></li>

                             <li className="list-inline-item"><Link to="/"><Button>mobiles</Button></Link></li>
                              <li className="list-inline-item"><Link to="/"><Button>mobiles</Button></Link></li>

                            <li className="list-inline-item"><Link to="/"><Button>Blog</Button></Link></li>
                             <li className="list-inline-item"><Link to="/"><Button>Contact Us</Button></Link></li>
                        </ul>

                    </div>

                </div>
                </div>


        </nav>
    )
}
export default Navigation;