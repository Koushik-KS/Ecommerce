import Button from "@mui/material/Button";
import { FaAngleDown } from "react-icons/fa6";

const CountryDropdown = () => {
  return (
    <Button className="CountryDrop">
      <div className="info d-flex flex-column">
        <span>Your Location</span>
        <span>India</span>
      </div>
      <span className="ml-auto">
        <FaAngleDown />
      </span>
    </Button>
  );
};

export default CountryDropdown;
