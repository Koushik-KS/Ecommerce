
import { TiMinus } from "react-icons/ti";
import { FaPlus } from "react-icons/fa";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

const QuantityBox = ({
  onChange,
  initialValue = 1,
  maxQuantity = Infinity,
}) => {
  const getValidQuantity = (value) => {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return 1;
    }

    return Math.min(
      Math.max(Math.floor(numericValue), 1),
      maxQuantity
    );
  };

  const [inputVal, setInputVal] = useState(
    getValidQuantity(initialValue)
  );

  // Update quantity if the initial value or maximum changes
  useEffect(() => {
    setInputVal((previousValue) => {
      const updatedValue = Math.min(
        Math.max(previousValue, 1),
        maxQuantity
      );

      if (updatedValue !== previousValue && onChange) {
        onChange(updatedValue);
      }

      return updatedValue;
    });
  }, [maxQuantity, onChange]);

  // =====================================================
  // DECREASE QUANTITY
  // =====================================================

  const minus = () => {
    setInputVal((previousValue) => {
      const newValue = Math.max(
        previousValue - 1,
        1
      );

      if (newValue !== previousValue && onChange) {
        onChange(newValue);
      }

      return newValue;
    });
  };

  // =====================================================
  // INCREASE QUANTITY
  // =====================================================

  const plus = () => {
    setInputVal((previousValue) => {
      const newValue = Math.min(
        previousValue + 1,
        maxQuantity
      );

      if (newValue !== previousValue && onChange) {
        onChange(newValue);
      }

      return newValue;
    });
  };

  return (
    <div className="quantityDrop d-flex align-items-center">
      <Button
        type="button"
        onClick={minus}
        disabled={inputVal <= 1}
        aria-label="Decrease quantity"
      >
        <TiMinus />
      </Button>

      <input
        type="text"
        value={inputVal}
        readOnly
        aria-label="Product quantity"
      />

      <Button
        type="button"
        onClick={plus}
        disabled={inputVal >= maxQuantity}
        aria-label="Increase quantity"
      >
        <FaPlus />
      </Button>
    </div>
  );
};

export default QuantityBox;