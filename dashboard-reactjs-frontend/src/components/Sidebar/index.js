

import Button from '@mui/material/Button';
import { RiDashboardFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { FaProductHunt } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";

const Sidebar =()=>{
    return(
        <>
        <div className="sidebar">
            <ul>
                <li><Button className='w-100'>
                    <span className='icon'><RiDashboardFill /></span>Dashboard 
                    <span className='arrow'><IoIosArrowForward /></span>
                    </Button>
                    </li>

                    <li><Button className='w-100'>
                    <span className='icon'><FaProductHunt /></span>Products 
                    <span className='arrow'><IoIosArrowForward /></span>
                    </Button>
                    </li>

                      <li><Button className='w-100'>
                    <span className='icon'><IoCartOutline /></span>Orders
                    <span className='arrow'><IoIosArrowForward /></span>
                    </Button>
                    </li>
            </ul>
            </div>
        
        </>
    )

}
export default Sidebar;