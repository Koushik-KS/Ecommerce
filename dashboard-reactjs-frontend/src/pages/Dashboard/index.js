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
import { Chart } from "react-google-charts";

import InputLabel from '@mui/material/InputLabel';

import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const data=[
  ["Year","Sales","Expenses"],
  ["2013",1000,400],
  ["2014",1170,460],
  ["2015",660,1120],
  ["2016",1030,540]
];

export const options={
  'backgroundColor':'transparent',
};

const Dashboard=()=>{
  
 const [anchorEl, setAnchorEl] = useState(null);
 const [showBy, setshowBy] =useState('');
 const [showBysetCat, setCatBy] =useState('');
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

                <h3 className="text-white font-weight-bold">Rs 3,787,681</h3>
                <p >Rs 3,787,681 in last month</p>

                 <Chart
      chartType="PieChart"
     
      options={options}
      data={data}
      width={"100%"}
      height={"170px"}
    />
                    </div>
                </div>



            </div>



            <div className="card shadow border-0 p-3 mt-4">
              <h3 className="hd">Best Selling Products</h3>
              <div className="row cardFilters mt-3">
                <div className="col-md-3">
                <h4>SHOW BY</h4>
                 <FormControl  size="small" className="w-100">
                 <Select
          value={showBy}
          onChange={(e)=>setshowBy(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }} 
          labelId="demo-select-small-label"
          className="w-100"
        
          >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
         </FormControl>
                </div>

                <div className="col-md-3">
                <h4>CATEGORY BY</h4>
                 <FormControl  size="small" className="w-100">
                 <Select
          value={showBysetCat}
          onChange={(e)=>setCatBy(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }} 
          labelId="demo-select-small-label"
          className="w-100"
        
          >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
          </FormControl>
                </div>



              </div>
              
              <div className="table-responsive mt-3">
                <table className="table table-bordered">
                  <thead className="thead-dark ">
                    <tr>
                    <th>UID </th>
                   <th>PRODUCT</th>
                    <th>CATEGORY</th>
                      <th>BRAND</th>
                      <th>PRICE</th>
                   <th>STOCK</th>
                    <th>RATING</th>
                      <th>ORDER </th>
                       <th>SALES</th>
                      <th>ACTION</th>
                      </tr>

                  </thead>
                  <tbody>
                    <tr>
                      <td>#1</td>
                      <td>Tops and skirt set for Female</td>
                      <td>Womans</td>
                      <td>richman</td>
                      <td>₹299</td>
                      <td>30</td>
                      <td>4.9(16)</td>
                      <td>380</td>
                      <td>₹38k</td>
                      <td>
                        <div className="actions d-flex align-items-center">
                          <Button><FaEye /></Button>
                            <Button><FaPencilAlt /></Button>
                              <Button><MdDelete /></Button>
                        </div>
                      </td>



                    </tr>
                  </tbody>
                </table>
              </div>


              </div> 
             
        
        </div>
      
        </>
    )



}
export default Dashboard;