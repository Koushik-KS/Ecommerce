import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { FaAngleDown } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";


const CountryDropdown = () => {
 

  return (
    <>
      <Button className="countryDrop" >
        <div className="info d-flex flex-column">
          <span className="label">Your Location</span>
          <span className="name">India</span>
        </div>
        <span className="ml-auto">
          <FaAngleDown />
        </span>
      </Button>

      <Dialog open={true} className="locationModal" >
        
          <h4>Choose your Delivery Location</h4>
        <p>Enter your address and we will specify the offer for your area.</p>
        <div className="headerSearch   w-100">
                        <input type='text' placeholder='Search  your area' />
                      <Button>  <FaSearch/></Button>
                        </div>

                        <ul className="countryList mt-3">
                          <li><Button>India</Button></li>
                           <li><Button>USA</Button></li>
                            <li><Button>Russia</Button></li>
                           <li><Button>Canada</Button></li>
                            <li><Button>Japan</Button></li>
                           <li><Button>south Africa</Button></li>
                            <li><Button>England</Button></li>
                           <li><Button>Australia</Button></li>
                            <li><Button>Sri Lank</Button></li>   
                             <li><Button>Iran</Button></li>
                           <li><Button>Isrel</Button></li>
                            <li><Button>Chaina</Button></li>
                           <li><Button>Tailland</Button></li>
                            <li><Button>Germany</Button></li>
                           <li><Button>Nepal</Button></li>
                            <li><Button>France</Button></li>
                           <li><Button>Spain</Button></li>   
                        </ul>

      </Dialog>

    </>
  );
};

export default CountryDropdown;
