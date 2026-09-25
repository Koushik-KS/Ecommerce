import Button from "@mui/material/Button";
import { IoMdMenu } from "react-icons/io";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Navigation = () => {
  const [isopenSidebarVal, setisopenSidebarVal] = useState(false);

  // Categories from Admin Dashboard
  const [categories, setCategories] = useState([]);

  const [loadingCategories, setLoadingCategories] = useState(true);

  // =========================
  // GET CATEGORIES
  // =========================

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoadingCategories(true);

        const response = await axios.get(
          "http://localhost:4000/api/category"
        );

        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error(
          "Error fetching categories:",
          error
        );

        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    getCategories();
  }, []);

  // =========================
  // FORMAT CATEGORY NAME
  // =========================

  const formatCategoryName = (name) => {
    if (!name) {
      return "";
    }

    return String(name)
      .charAt(0)
      .toUpperCase() + String(name).slice(1);
  };

  return (
    <nav>
      <div className="container">
        <div className="row">

          {/* =========================
              ALL CATEGORIES
          ========================= */}

          <div className="col-sm-2 navPart1">
            <div className="catWapper">

              <Button
                className="allcatTab align-items-center"
                onClick={() =>
                  setisopenSidebarVal(
                    !isopenSidebarVal
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

              {/* SIDEBAR CATEGORY MENU */}
              <div
                className={`sidebarNav ${
                  isopenSidebarVal
                    ? "open"
                    : ""
                }`}
              >
                <ul>

                  {loadingCategories ? (
                    <li>
                      <Button>
                        Loading categories...
                      </Button>
                    </li>
                  ) : categories.length === 0 ? (
                    <li>
                      <Button>
                        No categories available
                      </Button>
                    </li>
                  ) : (
                    categories.map((category) => (
                      <li key={category._id}>

                        <Link
                          to={`/cat/${category._id}`}
                          onClick={() =>
                            setisopenSidebarVal(false)
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
                    ))
                  )}

                </ul>
              </div>
            </div>
          </div>

          {/* =========================
              MAIN NAVIGATION
          ========================= */}

          <div className="col-sm-10 navPart2 d-flex align-items-center-center">

            <ul className="list list-inline m-auto">

              {/* HOME */}
              <li className="list-inline-item">
                <Link to="/">
                  <Button>
                    HOME
                  </Button>
                </Link>
              </li>

              {/* DYNAMIC CATEGORIES */}
              {!loadingCategories &&
                categories.map((category) => (
                  <li
                    className="list-inline-item"
                    key={category._id}
                  >
                    <Link
                      to={`/cat/${category._id}`}
                    >
                      <Button>
                        {formatCategoryName(
                          category.name
                        )}
                      </Button>
                    </Link>
                  </li>
                ))}

              {/* BLOG */}
              <li className="list-inline-item">
                <Link to="/">
                  <Button>
                    BLOG
                  </Button>
                </Link>
              </li>

              {/* CONTACT */}
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