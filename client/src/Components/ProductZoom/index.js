
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";

const ProductZoom = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // Get images from the selected product
  const productImages = Array.isArray(product?.images)
    ? product.images.filter((image) => image)
    : [];

  // Fallback image
  const images =
    productImages.length > 0
      ? productImages
      : [
          "https://via.placeholder.com/500x500?text=No+Image",
        ];

  return (
    <div className="productZoom position-relative">
      {/* Discount Badge */}
      {product?.regularPrice > product?.price && (
        <div className="badge badge-primary">
          {Math.round(
            ((product.regularPrice - product.price) /
              product.regularPrice) *
              100
          )}
          %
        </div>
      )}

      {/* BIG IMAGE SLIDER */}
      <Swiper
        style={{
          "--swiper-navigation-color": "#2874f0",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper:
            thumbsSwiper && !thumbsSwiper.destroyed
              ? thumbsSwiper
              : null,
        }}
        modules={[Navigation, Thumbs]}
        className="zoomSliderBig"
      >
        {images.map((image, index) => (
          <SwiperSlide key={`${image}-${index}`}>
            <InnerImageZoom
              zoomType="hover"
              zoomScale={1.5}
              src={image}
              alt={`${product?.name || "Product"} ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* THUMBNAIL IMAGE SLIDER */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        navigation={true}
        modules={[Navigation, Thumbs]}
        className="zoomSlider mt-3"
      >
        {images.map((image, index) => (
          <SwiperSlide key={`${image}-thumbnail-${index}`}>
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-100"
              style={{
                height: "80px",
                objectFit: "contain",
                cursor: "pointer",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductZoom;