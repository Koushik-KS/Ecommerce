import { useState } from "react";
import DashboardBox from "./components/dashboardBox";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { GiStarsStack } from "react-icons/gi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { FaRegClock } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
const Dashboard = () => {
     const [anchorEl, setAnchorEl] = useState(null);
      const open = Boolean(anchorEl);
    
      const ITEM_HEIGHT = 48;
    
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    return(
        <>
        <div className="right-content w-100">
            <div className="row dashboardBoxWrapperRow">
                <div className="col-md-8">
                    <div className="dashboardBoxWrapper d-flex">
                
              <DashboardBox color={["#1da256","#48d483"]} icon={<FaRegUser />}  grow={true}/> 
                <DashboardBox color={["#c012e2","#eb64fe"]}  icon={<FaShoppingCart />}/>
                <DashboardBox color={["#2c78e5","#60aff5"]}  icon={<FaBagShopping />}/>
                <DashboardBox color={["#e1950e","#f3cd29"]}  icon={<GiStarsStack />}/>
                   
                </div>
                </div> 

                <div className="col-md-4 pl-0">
                    <div className="box graphBox">
                       <div className="d-flex align-items-center w-100 bottomEle">
        <h6 className="text-white mb-0 mt-0">Last Month</h6>

        <div className="ml-auto">
          <Button className="toggleIcon" onClick={handleClick}>
            <BsThreeDotsVertical />
          </Button>

          <Menu
          className="dropdown_menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              },
            }}
          >
            <MenuItem onClick={handleClose}><FaRegClock />Last Day</MenuItem>
            <MenuItem onClick={handleClose}><FaRegClock />Last Week</MenuItem>
                <MenuItem onClick={handleClose}><FaRegClock />Last Month</MenuItem>
            <MenuItem onClick={handleClose}><FaRegClock />Last Year</MenuItem>
          </Menu>
        </div>
      </div>
                    </div>
                </div>



            </div>
        
        </div>
      
        </>
    )



}
export default Dashboard;