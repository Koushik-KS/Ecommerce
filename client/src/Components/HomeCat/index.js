
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import axios from "axios";

import "swiper/css";
import "swiper/css/navigation";

const HomeCat = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const itemBg = [
    "#fffceb",
    "#ecffec",
    "#feefea",
    "#e8f9ff",
    "#f9e8ff",
  ];

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/category"
        );

        setCategories(
          Array.isArray(response.data) ? response.data : []
        );
      } catch (error) {
        console.error("Error fetching featured categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="homeCat">
      <div className="container">
        <h3 className="mb-3 hd">Featured Categories</h3>

        {loading ? (
          <p className="text-muted">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-muted">
            No categories available.
          </p>
        ) : (
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
              const categoryId = category._id || category.id;

              const categoryImage =
                category.images && category.images.length > 0
                  ? category.images[0]
                  : "https://via.placeholder.com/150?text=Category";

              return (
                <SwiperSlide key={categoryId}>
                  <Link
                    to={`/cat/${categoryId}`}
                    className="text-decoration-none"
                  >
                    <div
                      className="item text-center cursor"
                      style={{
                        background:
                          itemBg[index % itemBg.length],
                      }}
                    >
                      <img
                        src={categoryImage}
                        alt={category.name}
                        loading="lazy"
                      />

                      <h6>{category.name}</h6>
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