import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { FaAngleDown } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MyContext } from "../../App";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CountryDropdown = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);
  const [countryList, setCountryList] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    if (context.countryList) {
      setCountryList(context.countryList);
    }
  }, [context.countryList]);

  const selectCountryHandler = (index, country) => {
    setSelectedTab(index);
    context.setSelectCountry(country);
    setIsOpenModal(false);
  };

  const filterList = (e) => {
    const keyword = e.target.value.toLowerCase();

    if (keyword === "") {
      setCountryList(context.countryList);
      return;
    }

    const list = context.countryList.filter((item) =>
      item.country.toLowerCase().includes(keyword)
    );

    setCountryList(list);
  };

  const displayCountry =
    context.selectCountry !== ""
      ? context.selectCountry.length > 10
        ? context.selectCountry.substring(0, 10) + "..."
        : context.selectCountry
      : "Select Location";

  return (
    <>
      <Button className="countryDrop" onClick={() => setIsOpenModal(true)}>
        <div className="info d-flex flex-column">
          <span className="label">Your Location</span>
          <span className="name">{displayCountry}</span>
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
          <input
            type="text"
            placeholder="Search your area"
            onChange={filterList}
          />
          <Button>
            <FaSearch />
          </Button>
        </div>

        <ul className="countryList mt-3">
          {countryList.length !== 0 &&
            countryList.map((item, index) => (
              <li key={index}>
                <Button
                  onClick={() =>
                    selectCountryHandler(index, item.country)
                  }
                  className={selectedTab === index ? "active" : ""}
                >
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
