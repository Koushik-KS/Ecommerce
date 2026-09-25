
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    const searchValue = searchText.trim();

    if (!searchValue) {
      return;
    }

    navigate(`/search?query=${encodeURIComponent(searchValue)}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="headerSearch ml-3 mr-3">
      <input
        type="text"
        placeholder="Search for Products..."
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Button
        onClick={handleSearch}
        aria-label="Search products"
      >
        <FaSearch />
      </Button>
    </div>
  );
};

export default SearchBox;