import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";

import logo from '../../assets/images/logo.jpg';
import Button from '@mui/material/Button';
import { MdMenuOpen } from "react-icons/md";
import SearchBox from "../SearchBox";
import { CiLight } from "react-icons/ci";
import { IoIosCart } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import PersonAdd from '@mui/icons-material/PersonAdd';

import Logout from '@mui/icons-material/Logout';
import { BsShieldFillExclamation } from "react-icons/bs";
import Divider from '@mui/material/Divider';
import { MyContext } from '../../App';


const Header = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenNotificationDrop, setIsOpenNotificationDrop] = useState(false);
  const openMyAcc= Boolean(anchorEl);
   const openNotifications= Boolean(isOpenNotificationDrop);

   const context=useContext(MyContext)

  const handleOpenMyAccDrop = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMyAccDrop = () => {
    setAnchorEl(null);
  };

  const handleOpenNotificationsDrop = () => {
    setIsOpenNotificationDrop(true)
  };

  const handleClosenotificationsDrop = () => {
    setIsOpenNotificationDrop(false)
  };

  return (
    <header className="d-flex align-items-center">
      <div className="container-fluid w-100">
        <div className="row d-flex align-items-center w-100">

          {/* Logo */}
          <div className="col-sm-2 part1">
            <Link to="/" className="d-flex align-items-center logo">
          <img src={logo} alt="Store Logo" style={{ width: "60px", height: "60px" }} />
              <span style={{ marginLeft: "4px" }}>STORE</span>
            </Link>
          </div>

          {/* Menu + Search */}
          <div className="col-sm-4 d-flex align-items-center part2" style={{ gap: "8px" }}>
            <Button className="rounded-circle" onClick={()=>context.
              setIsToggleSidebar(!context.isToggleSidebar)}>
              {
                context.isToggleSidebar===false ? <MdMenuOpen /> :
                <IoMenu />

              }
              
               </Button>
            <SearchBox />
          </div>

          {/* Right Section */}
          <div className="col-sm-6 d-flex align-items-center justify-content-end part3" style={{ gap: "8px" }}>
            
            <Button className="rounded-circle">
              <CiLight />
            </Button>

            <Button className="rounded-circle">
              <IoIosCart />
            </Button>

            

            <Button className="rounded-circle">
              <MdOutlineMailOutline />
            </Button>

          

         <div className='dropdownWrapper position-relative'>
          <Button className="rounded-circle" onClick={handleOpenNotificationsDrop}>
              <FaRegBell />
            </Button>
               <Menu
        anchorEl={isOpenNotificationDrop}
         className="notifications dropdown_list"
        id="notifications"
        open={ openNotifications}
        onClose={handleClosenotificationsDrop}
        onClick={handleClosenotificationsDrop}
        
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>

          <div className='head pl-3 pb-0'>
            <h4>Order(12)</h4>
          </div>
        <Divider className='mb-1'/>
        
      <div className='scroll'>
        
        <MenuItem onClick={handleCloseMyAccDrop}>
        <div className='d-flex '>
     <div>
           <div className="userImg">
                  <span className="rounded-circle">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTx3SRpQ8G8mKf3SUHnnn5mzgz7jx2WnePnA&s" alt="user" />
                  </span>
                </div>
     </div>

                <div className='dropdownInfo'>
                  <h4>
                    <span>
                    
                    <b>koushik shetty </b> added to this favorite list
                    <b> leather belt steve madden</b>
                    </span>
                    </h4>
                    <p className='text-sky'>few  seconds ago</p>
                </div>
          
        </div>
   
        </MenuItem>

         <MenuItem onClick={handleCloseMyAccDrop}>
        <div className='d-flex '>
     <div>
           <div className="userImg">
                  <span className="rounded-circle">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTx3SRpQ8G8mKf3SUHnnn5mzgz7jx2WnePnA&s" alt="user" />
                  </span>
                </div>
     </div>

                <div className='dropdownInfo'>
                  <h4>
                    <span>
                    
                    <b>koushik shetty </b> added to this favorite list
                    <b> leather belt steve madden</b>
                    </span>
                    </h4>
                    <p className='text-sky'>few  seconds ago</p>
                </div>
          
        </div>
   
        </MenuItem>

         <MenuItem onClick={handleCloseMyAccDrop}>
        <div className='d-flex '>
     <div>
           <div className="userImg">
                  <span className="rounded-circle">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTx3SRpQ8G8mKf3SUHnnn5mzgz7jx2WnePnA&s" alt="user" />
                  </span>
                </div>
     </div>

                <div className='dropdownInfo'>
                  <h4>
                    <span>
                    
                    <b>koushik shetty </b> added to this favorite list
                    <b> leather belt steve madden</b>
                    </span>
                    </h4>
                    <p className='text-sky'>few  seconds ago</p>
                </div>
          
        </div>
   
        </MenuItem>

           <MenuItem onClick={handleCloseMyAccDrop}>
        <div className='d-flex '>
     <div>
           <div className="userImg">
                  <span className="rounded-circle">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTx3SRpQ8G8mKf3SUHnnn5mzgz7jx2WnePnA&s" alt="user" />
                  </span>
                </div>
     </div>

                <div className='dropdownInfo'>
                  <h4>
                    <span>
                    
                    <b>koushik shetty </b> added to this favorite list
                    <b> leather belt steve madden</b>
                    </span>
                    </h4>
                    <p className='text-sky'>few  seconds ago</p>
                </div>
          
        </div>
   
        </MenuItem>

           <MenuItem onClick={handleCloseMyAccDrop}>
        <div className='d-flex '>
     <div>
           <div className="userImg">
                  <span className="rounded-circle">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTx3SRpQ8G8mKf3SUHnnn5mzgz7jx2WnePnA&s" alt="user" />
                  </span>
                </div>
     </div>

                <div className='dropdownInfo'>
                  <h4>
                    <span>
                    
                    <b>koushik shetty </b> added to this favorite list
                    <b> leather belt steve madden</b>
                    </span>
                    </h4>
                    <p className='text-sky'>few  seconds ago</p>
                </div>
          
        </div>
   
        </MenuItem>

          <MenuItem onClick={handleCloseMyAccDrop}>
          
        <div className='d-flex '>
     <div>
           <div className="userImg">
                  <span className="rounded-circle">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTx3SRpQ8G8mKf3SUHnnn5mzgz7jx2WnePnA&s" alt="user" />
                  </span>
                </div>
     </div>

                <div className='dropdownInfo'>
                  <h4>
                    <span>
                    
                    <b>koushik shetty </b> added to this favorite list
                    <b> leather belt steve madden</b>
                    </span>
                    </h4>
                    <p className='text-sky'>few  seconds ago</p>
                </div>
          
        </div>
   
        </MenuItem>

          <MenuItem onClick={handleCloseMyAccDrop}>
        <div className='d-flex '>
     <div>
           <div className="userImg">
                  <span className="rounded-circle">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTx3SRpQ8G8mKf3SUHnnn5mzgz7jx2WnePnA&s" alt="user" />
                  </span>
                </div>
     </div>

                <div className='dropdownInfo'>
                  <h4>
                    <span>
                    
                    <b>koushik shetty </b> added to this favorite list
                    <b> leather belt steve madden</b>
                    </span>
                    </h4>
                    <p className='text-sky'>few  seconds ago</p>
                </div>
          
        </div>
       
   
       
     
        </MenuItem>

      </div>

   <div className='pl-3 pr-3 w-100 pt-2 pb-3'>
       <Button className='btn-blue w-100'>View All Notifications</Button>
   </div>

         

        
      </Menu>

        


         </div>

            

            {/* User Info */}
            <div className="myWrapper">
              <Button className="myAcc d-flex align-items-center" 
               onClick={handleOpenMyAccDrop}>
                <div className="userImg">
                  <span className="rounded-circle">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTx3SRpQ8G8mKf3SUHnnn5mzgz7jx2WnePnA&s" alt="user" />
                  </span>
                </div>

                <div className="userInfo">
                  <h4>Koushik Shetty</h4>
                  <p className="mb-0">@koushikshetty</p>
                </div>
                </Button>


                <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMyAcc}
        onClose={handleCloseMyAccDrop}
        onClick={handleCloseMyAccDrop}
        
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        
      
        <MenuItem onClick={handleCloseMyAccDrop}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
         My  Account
        </MenuItem>

        <MenuItem onClick={handleCloseMyAccDrop}>
          <ListItemIcon>
            <BsShieldFillExclamation  />
          </ListItemIcon>
         Reset Password
        </MenuItem>
       
        <MenuItem onClick={handleCloseMyAccDrop }>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

            </div>

          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;