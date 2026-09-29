import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

// =====================================================
// BACKEND API BASE URL
// =====================================================

const API_BASE_URL = "https://ecommerce-hsm4.onrender.com/api";

// =====================================================
// HOME CATEGORY COMPONENT
// =====================================================

const HomeCat = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // CATEGORY BACKGROUND COLORS
  // =====================================================

  const itemBg = [
    "#f5f5f5",
    "#eef7ff",
    "#fff4e6",
    "#f3f0ff",
    "#eafaf1",
    "#fff0f5",
    "#f0f8ff",
    "#fafafa",
  ];

  // =====================================================
  // FETCH CATEGORIES
  // =====================================================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const apiUrl = `${API_BASE_URL}/category`;

        console.log("Fetching categories from:", apiUrl);

        const response = await axios.get(apiUrl);

        console.log(
          "Category API response:",
          response.data
        );

        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else if (
          Array.isArray(response.data?.categories)
        ) {
          setCategories(response.data.categories);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error(
          "Error fetching featured categories:",
          error
        );

        if (error.response) {
          console.error(
            "Server response:",
            error.response.data
          );

          console.error(
            "Status:",
            error.response.status
          );
        } else if (error.request) {
          console.error(
            "No response received from server:",
            error.request
          );
        } else {
          console.error(
            "Request error:",
            error.message
          );
        }

        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section className="homeCat">
      <div className="container">

        {/* =================================================
            TITLE
        ================================================= */}

        <h3 className="mb-3 hd">
          Featured Categories
        </h3>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (
          <p className="text-muted">
            Loading categories...
          </p>
        ) : categories.length === 0 ? (

          /* =================================================
             NO CATEGORIES
          ================================================= */

          <p className="text-muted">
            No categories available.
          </p>

        ) : (

          /* =================================================
             CATEGORY SLIDER
          ================================================= */

          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            slidesPerGroup={1}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"

            breakpoints={{
              576: {
                slidesPerView: 3,
                spaceBetween: 10,
              },

              768: {
                slidesPerView: 5,
                spaceBetween: 10,
              },

              992: {
                slidesPerView: 7,
                spaceBetween: 10,
              },

              1200: {
                slidesPerView: 8,
                spaceBetween: 10,
              },
            }}
          >

            {categories.map((category, index) => {

              // =================================================
              // CATEGORY ID
              // =================================================

              const categoryId =
                category._id || category.id;

              // =================================================
              // CATEGORY IMAGE
              // =================================================

              const categoryImage =
                Array.isArray(category.images) &&
                category.images.length > 0
                  ? category.images[0]
                  : "https://via.placeholder.com/150?text=Category";

              // =================================================
              // CATEGORY NAME
              // =================================================

              const categoryName =
                category.name || "Category";

              return (
                <SwiperSlide
                  key={categoryId}
                >

                  <Link
                    to={`/cat/${categoryId}`}
                    className="text-decoration-none"
                  >

                    <div
                      className="item text-center cursor"
                      style={{
                        background:
                          itemBg[
                            index % itemBg.length
                          ],
                      }}
                    >

                      <img
                        src={categoryImage}
                        alt={categoryName}
                        loading="lazy"
                      />

                      <h6>
                        {categoryName}
                      </h6>

                    </div>

                  </Link>

                </SwiperSlide>
              );
            })}

          </Swiper>
        )}

      </div>
    </section>
  );
};

export default HomeCat;