
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Sidebar = ({ products = [], onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([100, 60000]);

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [selectedBrands, setSelectedBrands] = useState([]);

  const [inStock, setInStock] = useState(false);
  const [onSale, setOnSale] = useState(false);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/category"
        );

        setCategories(response.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Get unique brands from products
  const brands = [
    ...new Set(
      products
        .map((product) => product.brand)
        .filter((brand) => brand && String(brand).trim() !== "")
    ),
  ];

  // Send all filters to the Listing component
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        categories: selectedCategories,
        brands: selectedBrands,
        inStock,
        onSale,
      });
    }
  }, [
    priceRange,
    selectedCategories,
    selectedBrands,
    inStock,
    onSale,
    onFilterChange,
  ]);

  // Category checkbox handler
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((previous) => {
      if (previous.includes(categoryId)) {
        return previous.filter((id) => id !== categoryId);
      }

      return [...previous, categoryId];
    });
  };

  // Brand checkbox handler
  const handleBrandChange = (brand) => {
    setSelectedBrands((previous) => {
      if (previous.includes(brand)) {
        return previous.filter((item) => item !== brand);
      }

      return [...previous, brand];
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setPriceRange([100, 60000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setInStock(false);
    setOnSale(false);
  };

  return (
    <>
      <div className="sidebar">
        {/* PRODUCT CATEGORIES */}
        <div className="filterBox">
          <h6>PRODUCT CATEGORIES</h6>

          <div className="scroll">
            <ul>
              {categories.length > 0 ? (
                categories.map((category) => {
                  const categoryId = String(
                    category._id || category.id || ""
                  );

                  return (
                    <li key={categoryId}>
                      <FormControlLabel
                        className="w-100"
                        control={
                          <Checkbox
                            checked={selectedCategories.includes(categoryId)}
                            onChange={() =>
                              handleCategoryChange(categoryId)
                            }
                          />
                        }
                        label={category.name}
                      />
                    </li>
                  );
                })
              ) : (
                <li>No categories available</li>
              )}
            </ul>
          </div>
        </div>

        {/* FILTER BY PRICE */}
        <div className="filterBox">
          <h6>FILTER BY PRICE</h6>

          <RangeSlider
            value={priceRange}
            onInput={setPriceRange}
            min={100}
            max={60000}
            step={5}
          />

          <div className="d-flex pt-2 pb-2 priceRange">
            <span>
              From:{" "}
              <strong className="text-dark">
                Rs: {priceRange[0]}
              </strong>
            </span>

            <span className="ml-auto">
              To:{" "}
              <strong className="text-dark">
                Rs: {priceRange[1]}
              </strong>
            </span>
          </div>
        </div>

        {/* PRODUCT STATUS */}
        <div className="filterBox">
          <h6>PRODUCT STATUS</h6>

          <div className="scroll">
            <ul>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={
                    <Checkbox
                      checked={inStock}
                      onChange={(event) =>
                        setInStock(event.target.checked)
                      }
                    />
                  }
                  label="In Stock"
                />
              </li>

              <li>
                <FormControlLabel
                  className="w-100"
                  control={
                    <Checkbox
                      checked={onSale}
                      onChange={(event) =>
                        setOnSale(event.target.checked)
                      }
                    />
                  }
                  label="On Sale"
                />
              </li>
            </ul>
          </div>
        </div>

        {/* BRANDS */}
        <div className="filterBox">
          <h6>BRANDS</h6>

          <div className="scroll">
            <ul>
              {brands.length > 0 ? (
                brands.map((brand) => (
                  <li key={brand}>
                    <FormControlLabel
                      className="w-100"
                      control={
                        <Checkbox
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandChange(brand)}
                        />
                      }
                      label={brand}
                    />
                  </li>
                ))
              ) : (
                <li>No brands available</li>
              )}
            </ul>
          </div>
        </div>

        {/* RESET FILTERS */}
        <button
          type="button"
          className="btn btn-dark w-100 mb-3"
          onClick={resetFilters}
        >
          Reset Filters
        </button>

        {/* SIDEBAR IMAGE */}
        <Link to="#">
          <img
            src="https://i.pinimg.com/736x/f6/19/29/f61929f31c464cca506c96260495dfbc.jpg"
            className="w-100"
            alt="Shopping promotion"
          />
        </Link>
      </div>
    </>
  );
};

export default Sidebar;