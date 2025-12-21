import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { FaAngleDown } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MyContext } from "../../App";   // ✅ correct path

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CountryDropdown = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const context = useContext(MyContext);

  return (
    <>
      <Button className="countryDrop" onClick={() => setIsOpenModal(true)}>
        <div className="info d-flex flex-column">
          <span className="label">Your Location</span>
          <span className="name">India</span>
        </div>
        <span className="ml-auto">
          <FaAngleDown />
        </span>
      </Button>

      <Dialog
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        className="locationModal"
        TransitionComponent={Transition}
      >
        <h4 className="mb-0">Choose your Delivery Location</h4>
        <p>Enter your address and we will specify the offer for your area.</p>

        <Button className="close_" onClick={() => setIsOpenModal(false)}>
          <IoClose />
        </Button>

        <div className="headerSearch w-100">
          <input type="text" placeholder="Search your area" />
          <Button>
            <FaSearch />
          </Button>
        </div>

        <ul className="countryList mt-3">
          {context.countryList?.length !== 0 &&
            context.countryList.map((item, index) => (
              <li key={index}>
                <Button onClick={() => setIsOpenModal(false)}>
                  {item.country}
                </Button>
              </li>
            ))}
        </ul>
      </Dialog>
    </>
  );
};

export default CountryDropdown;
