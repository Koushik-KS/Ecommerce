

import Button from '@mui/material/Button';
import { RiDashboardFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { FaProductHunt } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { Link } from 'react-router-dom';
const Sidebar =()=>{
    return(
        <>
        <div className="sidebar">
            <ul>
                <li>
                    <Link to="/">
                    
                    <Button className='w-100'>
                    <span className='icon'><RiDashboardFill /></span>Dashboard 
                    <span className='arrow'><IoIosArrowForward /></span>
                    </Button>
                    </Link>
                    </li>

                    <li>
                        
                        <Button className='w-100'>
                    <span className='icon'><FaProductHunt /></span>Products 
                    <span className='arrow'><IoIosArrowForward /></span>
                    </Button>
                    <ul>
                        <li><Link to="#">Product List</Link></li>
                        <li><Link to="#">Product View</Link></li>
                        <li><Link to="#">Product Upload</Link></li>
                    </ul>
                   
                    </li>

                      <li>
                         <Link to="/">
                        
                        <Button className='w-100'>
                    <span className='icon'><IoCartOutline /></span>Orders
                    <span className='arrow'><IoIosArrowForward /></span>
                    </Button>
                    </Link>
                    </li>

                     <li>
                         <Link to="/">
                        <Button className='w-100'>
                    <span className='icon'><MdMessage /></span>Messages
                    <span className='arrow'><IoIosArrowForward /></span>
                    </Button>
                    </Link>
                    </li>

                    <li>
                         <Link to="/">
                        <Button className='w-100'>
                    <span className='icon'><FaBell /></span>Notifications
                    <span className='arrow'><IoIosArrowForward /></span>
                    </Button>
                    </Link>
                    </li>

                    <li>
                       <Link to="/">
                        <Button className='w-100'>
                    <span className='icon'><IoSettings /></span>Settings
                    <span className='arrow'><IoIosArrowForward /></span>
                    </Button>
                    </Link>
                    </li>

                     <li>
                        <Link to="/">
                        <Button className='w-100'>
                    <span className='icon'><RiDashboardFill /></span>Dashboard 
                    <span className='arrow'><IoIosArrowForward /></span>
                    </Button>
                    </Link>
                    </li>

                    <li>
                        <Link to="/">
                        <Button className='w-100'>
                    <span className='icon'><FaProductHunt /></span>Products 
                    <span className='arrow'><IoIosArrowForward /></span>
                    </Button>
                    </Link>
                    </li>

                      <li>
                         <Link to="/">
                        <Button className='w-100'>
                    <span className='icon'><IoCartOutline /></span>Orders
                    <span className='arrow'><IoIosArrowForward /></span>
                    </Button>
                    </Link>
                    </li>

                     <li>
                         <Link to="/">
                        <Button className='w-100'>
                    <span className='icon'><MdMessage /></span>Messages
                    <span className='arrow'><IoIosArrowForward /></span>
                    </Button>
                    </Link>
                    </li>

                    <li>
                         <Link to="/">
                        <Button className='w-100'>
                    <span className='icon'><FaBell /></span>Notifications
                    <span className='arrow'><IoIosArrowForward /></span>
                    </Button>
                    </Link>
                    </li>

                    <li>
                        <Link to="/">
                        <Button className='w-100'>
                    <span className='icon'><IoSettings /></span>Settings
                    <span className='arrow'><IoIosArrowForward /></span>
                    </Button>
                    </Link>
                    </li>
            </ul>
            </div>
        
        </>
    )

}
export default Sidebar;