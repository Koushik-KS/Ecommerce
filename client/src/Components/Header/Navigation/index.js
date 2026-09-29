import Button from "@mui/material/Button";
import { IoMdMenu } from "react-icons/io";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

// =====================================================
// API BASE URL
// =====================================================

const API_BASE_URL =
  "https://ecommerce-hsm4.onrender.com/api";

const Navigation = () => {
  const [isopenSidebarVal, setisopenSidebarVal] =
    useState(false);

  // Categories from Admin Dashboard
  const [categories, setCategories] = useState([]);

  const [loadingCategories, setLoadingCategories] =
    useState(true);

  // =====================================================
  // GET CATEGORIES
  // =====================================================

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoadingCategories(true);

        const url =
          `${API_BASE_URL}/category`;

        console.log(
          "Navigation category API:",
          url
        );

        const response = await axios.get(url);

        console.log(
          "Navigation category response:",
          response.data
        );

        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else if (
          Array.isArray(
            response.data?.categories
          )
        ) {
          setCategories(
            response.data.categories
          );
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error(
          "Error fetching categories:",
          error
        );

        console.error(
          "Category API URL:",
          `${API_BASE_URL}/category`
        );

        if (error.response) {
          console.error(
            "Server status:",
            error.response.status
          );

          console.error(
            "Server response:",
            error.response.data
          );
        }

        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    getCategories();
  }, []);

  // =====================================================
  // FORMAT CATEGORY NAME
  // =====================================================

  const formatCategoryName = (name) => {
    if (!name) {
      return "";
    }

    const categoryName = String(name);

    return (
      categoryName.charAt(0).toUpperCase() +
      categoryName.slice(1)
    );
  };

  // =====================================================
  // CLOSE SIDEBAR
  // =====================================================

  const closeSidebar = () => {
    setisopenSidebarVal(false);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <nav>
      <div className="container">
        <div className="row">

          {/* =================================================
              ALL CATEGORIES
          ================================================= */}

          <div className="col-sm-2 navPart1">
            <div className="catWapper">

              {/* ALL CATEGORIES BUTTON */}

              <Button
                className="allcatTab align-items-center"
                onClick={() =>
                  setisopenSidebarVal(
                    (previousValue) =>
                      !previousValue
                  )
                }
              >
                <span className="icon1">
                  <IoMdMenu />
                </span>

                <span className="text">
                  ALL CATEGORIES
                </span>

                <span className="icon2">
                  <FaAngleDown />
                </span>

                <span className="ml-auto"></span>
              </Button>

              {/* =================================================
                  SIDEBAR CATEGORY MENU
              ================================================= */}

              <div
                className={`sidebarNav ${
                  isopenSidebarVal
                    ? "open"
                    : ""
                }`}
              >
                <ul>

                  {/* LOADING */}

                  {loadingCategories ? (
                    <li>
                      <Button disabled>
                        Loading categories...
                      </Button>
                    </li>
                  ) : categories.length === 0 ? (

                    /* NO CATEGORIES */

                    <li>
                      <Button disabled>
                        No categories available
                      </Button>
                    </li>

                  ) : (

                    /* CATEGORY LIST */

                    categories.map(
                      (category) => (
                        <li
                          key={
                            category._id ||
                            category.id
                          }
                        >
                          <Link
                            to={`/cat/${
                              category._id ||
                              category.id
                            }`}
                            onClick={
                              closeSidebar
                            }
                          >
                            <Button>
                              {formatCategoryName(
                                category.name
                              )}

                              <FaAngleRight className="ml-auto" />
                            </Button>
                          </Link>
                        </li>
                      )
                    )
                  )}

                </ul>
              </div>
            </div>
          </div>

          {/* =================================================
              MAIN NAVIGATION
          ================================================= */}

          <div className="col-sm-10 navPart2 d-flex align-items-center">

            <ul className="list list-inline m-auto">

              {/* =================================================
                  HOME
              ================================================= */}

              <li className="list-inline-item">
                <Link to="/">
                  <Button>
                    HOME
                  </Button>
                </Link>
              </li>

              {/* =================================================
                  DYNAMIC CATEGORIES
              ================================================= */}

              {!loadingCategories &&
                categories.map(
                  (category) => (
                    <li
                      className="list-inline-item"
                      key={
                        category._id ||
                        category.id
                      }
                    >
                      <Link
                        to={`/cat/${
                          category._id ||
                          category.id
                        }`}
                      >
                        <Button>
                          {formatCategoryName(
                            category.name
                          )}
                        </Button>
                      </Link>
                    </li>
                  )
                )}

              {/* =================================================
                  CONTACT
              ================================================= */}

              <li className="list-inline-item">
                <Link to="/contact">
                  <Button>
                    CONTACT
                  </Button>
                </Link>
              </li>

            </ul>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navigation;