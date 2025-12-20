import { Link } from 'react-router-dom';
import Logo from '../../assets/images/eshop.png';
import Button from "@mui/material/Button";
import CountryDropdown  from '../CountryDropdown';
import { FaSearch } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";

const Header=()=>{
    return(
        
       <div className="headerWrapper">
        <div className="top-strip bg-blue ">
            <div className="container">
                <p className="mb-0 mt-0" >Due to  the <b> ONTIME </b> Delivery</p>
            </div>
        </div>
        < header className="header">
            <div className="container">
                <div className="row">
                <div className="logoWrapper d-flex align-items-center col-sm-2">
                   
                    <Link to={"/"}><img src={Logo} alt="Logo"/></Link>
                    </div>
                    <div className='col-sm-10   d-flex align-items-center part2'>

                        <CountryDropdown/>

                    {/* Header search starts here */}
                    <div className="headerSearch   ml-3 mr-3">
                        <input type='text' placeholder='Search  for Products... '/>
                      <Button>  <FaSearch/></Button>
                        </div>


                    {/* header seach end */}

                    

                    <div className='part3   d-flex align-items-center ml-auto '> 
                        <Button className='circle'><FaRegCircleUser /> </Button>

                        
                        
                        </div>




                    </div>


                    
                </div>
            </div>  
        
        </header>
        </div>
    )
            
}
export default Header;