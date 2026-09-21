
import { TiMinus } from "react-icons/ti";
import { FaPlus } from "react-icons/fa";
import Button from "@mui/material/Button";
import { useState } from "react";

const QuantityBox = ({ onChange }) => {
  const [inputVal, setInputVal] = useState(1);

  const minus = () => {
    if (inputVal > 1) {
      const newValue = inputVal - 1;

      setInputVal(newValue);

      if (onChange) {
        onChange(newValue);
      }
    }
  };

  const plus = () => {
    const newValue = inputVal + 1;

    setInputVal(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="quantityDrop d-flex align-items-center">
      <Button onClick={minus}>
        <TiMinus />
      </Button>

      <input
        type="text"
        value={inputVal}
        readOnly
      />

      <Button onClick={plus}>
        <FaPlus />
      </Button>
    </div>
  );
};

export default QuantityBox;