
import { BsThreeDotsVertical } from "react-icons/bs";
import Button from '@mui/material/Button';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
const DashboardBox = (props) => {

  const [anchorEl, setAnchorEl] = useState<null ;
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
   

    return(
      
        <Button className="dashboardBox" style={{
    backgroundImage:
     `linear-gradient(to right, ${props.color?.[0]} , ${props.color?.[1]})`
  }}>

    {
        props.grow === true ?
        <span className="chart"><TrendingUpIcon/> </span>
        :
        <span className="chart"><TrendingDownIcon/> </span>

    }

    <div className="d-flex w-100">
        <div className="col1">
        <h4 className="text-white mb-0">Total Users</h4>
        <span className="text-white">277</span>
        </div>
        <div className="ml-auto">
            {
                props.icon ? 
                  <span span className="icon">
                        {props.icon ? props.icon : ''}
                     
                         </span>
                         :
                         ''



                 }
               
               




          
        </div>
    </div>

    <div className="d-flex align-items-center w-100 bottomEle">
        <h6 className="text-white mb-0 mt-0">Last Month</h6>
        <Button className=" ml-auto toggleIcon">
            <BsThreeDotsVertical />
        </Button>
    </div>

                    
    </Button>
       
    )
}
export default DashboardBox;