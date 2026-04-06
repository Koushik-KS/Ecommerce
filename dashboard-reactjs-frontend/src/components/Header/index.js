import React, { useState } from 'react';
import { Link } from "react-router-dom";

import logo from '../../assets/images/logo.jpg';
import Button from '@mui/material/Button';
import { MdMenuOpen } from "react-icons/md";
import SearchBox from "../SearchBox";
import { CiLight } from "react-icons/ci";
import { IoIosCart } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';

import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const Header = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="d-flex align-items-center">
      <div className="container-fluid w-100">
        <div className="row d-flex align-items-center w-100">

          {/* Logo */}
          <div className="col-sm-2 part1">
            <Link to="/" className="d-flex align-items-center logo">
              <img src={logo} alt="Store Logo" />
              <span style={{ marginLeft: "8px" }}>STORE</span>
            </Link>
          </div>

          {/* Menu + Search */}
          <div className="col-sm-4 d-flex align-items-center part2" style={{ gap: "8px" }}>
            <Button className="rounded-circle">
              <MdMenuOpen />
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

            <Button className="rounded-circle">
              <FaRegBell />
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Avatar /> My account
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>

            {/* User Info */}
            <div className="myWrapper">
              <Button className="myAcc d-flex align-items-center">
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
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;