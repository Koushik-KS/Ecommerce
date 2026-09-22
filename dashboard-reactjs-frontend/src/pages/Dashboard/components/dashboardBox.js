
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa6";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const DashboardBox = ({
  title,
  value,
  subtitle = "All Time",
  color = ["#1da256", "#48d483"],
  icon,
  grow = true,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className="dashboardBox"
      style={{
        backgroundImage: `linear-gradient(to right, ${color[0]}, ${color[1]})`,
      }}
    >
      <span className="chart">
        {grow ? <TrendingUpIcon /> : <TrendingDownIcon />}
      </span>

      <div className="d-flex w-100">
        <div className="col1">
          <h4 className="text-white mb-0">{title}</h4>

          <span className="text-white">
            {value}
          </span>
        </div>

        <div className="ml-auto">
          {icon && <span className="icon">{icon}</span>}
        </div>
      </div>

      <div className="d-flex align-items-center w-100 bottomEle">
        <h6 className="text-white mb-0 mt-0">
          {subtitle}
        </h6>

        <div className="ml-auto">
          <Button
            className="toggleIcon"
            onClick={handleClick}
          >
            <BsThreeDotsVertical />
          </Button>

          <Menu
            className="dropdown_menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <FaRegClock /> Last Day
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <FaRegClock /> Last Week
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <FaRegClock /> Last Month
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <FaRegClock /> Last Year
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default DashboardBox;