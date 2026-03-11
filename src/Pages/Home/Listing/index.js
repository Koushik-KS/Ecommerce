import Sidebar from "../../../Components/Sidebar";
import Button from "@mui/material/Button";
import { IoMdMenu } from "react-icons/io";
import { BiGridSmall } from "react-icons/bi";
import { CgMenuGridR } from "react-icons/cg";
import { IoGridOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import ProductItem from "../../../Components/ProductItem";
import Pagination from '@mui/material/Pagination';



const Listing = () => {

     const [anchorEl, setAnchorEl] = useState(null);
     const [productView, setProductView]=useState('four');
  const openDropdown = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };





  return (
    <>
      <section className="product_Listing_Page">
        <div className="container">
          <div className="productListing d-flex">
            
           
            <Sidebar />

            
            <div className="content_right">

           
              <img
                src="https://i.pinimg.com/1200x/01/0e/24/010e248c281d83e130d9315d31d21377.jpg"
                alt="banner"
                className="w-itemView={productView}00"
                style={{ borderRadius: "8px" }}
              />

         
              <div className="showBy mt-3 mb-3 d-flex align-items-center">
                <div className="d-flex btnWrapper">

                  <Button className={productView==='one' && 'act'} onClick={()=>setProductView('one')}>
                    <IoMdMenu />
                  </Button>

                  <Button className={productView==='three' && 'act'} onClick={()=>setProductView('three')}>
                    <CgMenuGridR />
                  </Button>

                  

                  <Button className={productView==='four' && 'act'} onClick={()=>setProductView('four')}>
                    <IoGridOutline />
                  </Button>

                </div>
                <div className="ml-auto showByFilter">
                    <Button onClick={handleClick}>Show 9<FaAngleDown /></Button>
                     <Menu
                     className="w-itemView={productView}00 showPerPageDropdown"
        id="basic-menu"
        anchorEl={anchorEl}
        open={openDropdown}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem onClick={handleClose}>itemView={productView}0</MenuItem>
        <MenuItem onClick={handleClose}>20</MenuItem>
        <MenuItem onClick={handleClose}>30</MenuItem>
        <MenuItem onClick={handleClose}>40</MenuItem>
        <MenuItem onClick={handleClose}>50</MenuItem>
        <MenuItem onClick={handleClose}>60</MenuItem>
        
      </Menu>
                </div>
              </div>

              <div className="productListing">
                <ProductItem itemView={productView}/>
                 <ProductItem itemView={productView}/>
               <ProductItem itemView={productView}/>
                 <ProductItem itemView={productView}/>
                <ProductItem itemView={productView}/>
                 <ProductItem itemView={productView} />
                  <ProductItem itemView={productView}/>
                 <ProductItem itemView={productView}/>
                
                 <ProductItem itemView={productView}/>
                 <ProductItem itemView={productView}/>
               <ProductItem itemView={productView}/>
                 <ProductItem itemView={productView}/>
                <ProductItem itemView={productView}/>
                 <ProductItem itemView={productView} />
                  <ProductItem itemView={productView}/>
                 <ProductItem itemView={productView}/>
                
                 <ProductItem itemView={productView}/>
                 <ProductItem itemView={productView}/>
               <ProductItem itemView={productView}/>
                 <ProductItem itemView={productView}/>
                <ProductItem itemView={productView}/>
                 <ProductItem itemView={productView} />
                  <ProductItem itemView={productView}/>
                 <ProductItem itemView={productView}/>
                
                 <ProductItem itemView={productView}/>
                 <ProductItem itemView={productView}/>
               <ProductItem itemView={productView}/>
                 <ProductItem itemView={productView}/>
                <ProductItem itemView={productView}/>
                 <ProductItem itemView={productView} />
                  <ProductItem itemView={productView}/>
                 <ProductItem itemView={productView}/>
                
              </div>




              <div className="d-flex align-items-center justify-content-center mt-5">
                  <Pagination count={10} color="primary" size="large"/>
              </div>



















            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Listing;