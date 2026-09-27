import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import axios from "axios";

import "swiper/css";
import "swiper/css/navigation";

// =====================================================
// API BASE URL
// =====================================================

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api`;

const HomeCat = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // CATEGORY BACKGROUND COLORS
  // =====================================================

  const itemBg = [
    "#fffceb",
    "#ecffec",
    "#feefea",
    "#e8f9ff",
    "#f9e8ff",
  ];

  // =====================================================
  // FETCH CATEGORIES
  // =====================================================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${API_BASE_URL}/category`
        );

        // Support both:
        // 1. Direct array response
        // 2. { categories: [] } response

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

        <h3 className="mb-3 hd">
          Featured Categories
        </h3>

        {/* LOADING */}
        {loading ? (
          <p className="text-muted">
            Loading categories...
          </p>
        ) : categories.length === 0 ? (

          /* NO CATEGORIES */
          <p className="text-muted">
            No categories available.
          </p>

        ) : (

          /* CATEGORY SLIDER */
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

              const categoryId =
                category._id || category.id;

              const categoryImage =
                Array.isArray(category.images) &&
                category.images.length > 0
                  ? category.images[0]
                  : "https://via.placeholder.com/150?text=Category";

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
                        alt={
                          category.name ||
                          "Category"
                        }
                        loading="lazy"
                      />

                      <h6>
                        {category.name}
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