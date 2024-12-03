import React, { useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper and SwiperSlide
import "swiper/css"; // Import Swiper styles
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Correct import for modules
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

// Images
import sliderimg1 from "../images/client-1.png";
import sliderimg2 from "../images/client-2.png";
import sliderimg3 from "../images/client-3.png";
import sliderimg4 from "../images/client-4-1.png";
import sliderimg5 from "../images/client-5.png";
import { Container } from "react-bootstrap";

const SwiperCarousal = () => {
  const images = [sliderimg1, sliderimg2, sliderimg3, sliderimg4, sliderimg5];

  const sliderRef = useRef(null);
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <Container style={{ marginTop: "100px", marginBottom:"100px" }}>
      <div style={{ position: "relative", width: "100%", height: "100px" }}>
        {/* Reduce container height */}
        <Swiper
          ref={sliderRef}
          modules={[Navigation, Pagination, Autoplay]} // Pass modules directly
          spaceBetween={10}
          slidesPerView={5} // Show 5 images at a time
          navigation={{ clickable: true }} // Enable Next/Prev buttons
          loop // Loop through the slides
          autoplay={{
            delay: 5000, // Delay between slides
            disableOnInteraction: false // Continue autoplay after user interaction
          }}
          breakpoints={{
            320: {
              slidesPerView: 1
            },

            375: {
              slidesPerView: 1
            },
            425: {
              slidesPerView: 2
            },
            768: {
              slidesPerView: 3 // Show 3 images on tablet screens
            },
            1024: {
              slidesPerView: 5 // Show 4 images on larger screens
            },
            1440: {
              slidesPerView: 5 // Show 4 images on larger screens
            }
          }}
        >
          {images.concat(images).map((img, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: "flex", // Make the slide a flex container
                justifyContent: "center", // Center horizontally
                alignItems: "center" // Center vertically
              }}
            >
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "40%", // Set the image width to 80% of the slide
                  height: "auto", // Adjust height to maintain aspect ratio
                  objectFit: "contain", // Ensure images are contained within the slide without distortion
                  display: "block" // Remove inline display issues
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="prev-arrow" onClick={handlePrev}>
          <BsChevronLeft />
        </div>
        <div className="next-arrow" onClick={handleNext}>
          <BsChevronRight />
        </div>
      </div>
    </Container>
  );
};

export default SwiperCarousal;
