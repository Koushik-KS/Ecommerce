 import React from "react";
 import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { FaAngleDown } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CountryDropdown = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
 

  return (
    <>
      <Button className="countryDrop" onClick={()=>setIsOpenModal(true)}>
        <div className="info d-flex flex-column">
          <span className="label">Your Location</span>
          <span className="name">India</span>
        </div>
        <span className="ml-auto">
          <FaAngleDown />
        </span>
      </Button>

      <Dialog open={isOpenModal} onClick={()=>setIsOpenModal(false)} className="locationModal " TransitionComponent={Transition}>
        
          <h4 className=" mb-0">Choose your Delivery Location</h4>
        <p>Enter your address and we will specify the offer for your area.</p>
       <Button className="close_" onClick={()=>setIsOpenModal(false)}><IoClose /></Button> 

        <div className="headerSearch   w-100">
                        <input type='text' placeholder='Search  your area' />
                      <Button>  <FaSearch/></Button>
                        </div>

                        <ul className="countryList mt-3">
                          <li><Button  onClick={()=>setIsOpenModal(false)}>India</Button></li>
                           <li><Button  onClick={()=>setIsOpenModal(false)}>USA</Button></li>
                            <li><Button  onClick={()=>setIsOpenModal(false)}>Russia</Button></li>
                           <li><Button  onClick={()=>setIsOpenModal(false)}>Canada</Button></li>
                            <li><Button  onClick={()=>setIsOpenModal(false)}>Japan</Button></li>
                           <li><Button  onClick={()=>setIsOpenModal(false)}>south Africa</Button></li>
                            <li><Button  onClick={()=>setIsOpenModal(false)}>England</Button></li>
                           <li><Button  onClick={()=>setIsOpenModal(false)}>Australia</Button></li>
                            <li><Button  onClick={()=>setIsOpenModal(false)}>Sri Lank</Button></li>   
                             <li><Button  onClick={()=>setIsOpenModal(false)}>Iran</Button></li>
                           <li><Button  onClick={()=>setIsOpenModal(false)}>Isrel</Button></li>
                            <li><Button  onClick={()=>setIsOpenModal(false)}>Chaina</Button></li>
                           <li><Button  onClick={()=>setIsOpenModal(false)}>Tailland</Button></li>
                            <li><Button  onClick={()=>setIsOpenModal(false)}>Germany</Button></li>
                           <li><Button  onClick={()=>setIsOpenModal(false)}>Nepal</Button></li>
                            <li><Button  onClick={()=>setIsOpenModal(false)}>France</Button></li>
                           <li><Button  onClick={()=>setIsOpenModal(false)}>Spain</Button></li>  

                           <li><Button  onClick={()=>setIsOpenModal(false)}>France</Button></li>
                           <li><Button  onClick={()=>setIsOpenModal(false)}>Spain</Button></li>
                            <li><Button  onClick={()=>setIsOpenModal(false)}>Singapore</Button></li>
                           <li><Button  onClick={()=>setIsOpenModal(false)}>Mexico</Button></li>
                            <li><Button  onClick={()=>setIsOpenModal(false)}>Saudi Arabia</Button></li>
                           
                        </ul>

      </Dialog>

    </>
  );
};

export default CountryDropdown;
